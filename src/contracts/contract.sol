// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title MathQuest
 * @dev Educational quiz game with token rewards on Celo blockchain
 * @notice Players earn tokens by completing math quizzes at different difficulty levels
 */
contract MathQuest is Ownable, ReentrancyGuard, Pausable {
    
    // ============ State Variables ============
    
    IERC20 public rewardToken; // cUSD or custom token on Celo
    
    struct Player {
        address walletAddress;
        uint256 totalScore;
        uint256 totalTokensEarned;
        uint256 level1Score;
        uint256 level2Score;
        uint256 level3Score;
        uint256 level4Score;
        uint256 quizzesCompleted;
        uint256 lastPlayedTimestamp;
        bool isRegistered;
    }
    
    struct QuizSession {
        address player;
        uint8 level;
        uint8 questionsCorrect;
        uint8 totalQuestions;
        uint256 tokensEarned;
        uint256 timestamp;
        bool rewardClaimed;
    }
    
    struct LevelConfig {
        uint256 tokensPerQuestion;
        uint256 bonusMultiplier; // In basis points (e.g., 150 = 1.5x)
        uint256 minimumPassScore; // Out of 100
        bool isActive;
    }
    
    // ============ Mappings ============
    
    mapping(address => Player) public players;
    mapping(uint256 => QuizSession) public quizSessions;
    mapping(uint8 => LevelConfig) public levelConfigs;
    mapping(address => uint256[]) public playerSessions;
    
    // ============ State Variables ============
    
    uint256 public nextSessionId;
    uint256 public totalPlayersRegistered;
    uint256 public totalRewardsDistributed;
    uint256 public contractBalance;
    
    address[] public leaderboard;
    
    // ============ Events ============
    
    event PlayerRegistered(address indexed player, uint256 timestamp);
    event QuizCompleted(
        uint256 indexed sessionId,
        address indexed player,
        uint8 level,
        uint8 score,
        uint256 tokensEarned,
        uint256 timestamp
    );
    event RewardClaimed(
        uint256 indexed sessionId,
        address indexed player,
        uint256 amount,
        uint256 timestamp
    );
    event LevelConfigUpdated(uint8 indexed level, uint256 tokensPerQuestion);
    event ContractFunded(address indexed funder, uint256 amount);
    event EmergencyWithdraw(address indexed owner, uint256 amount);
    
    // ============ Modifiers ============
    
    modifier onlyRegisteredPlayer() {
        require(players[msg.sender].isRegistered, "Player not registered");
        _;
    }
    
    modifier validLevel(uint8 _level) {
        require(_level >= 1 && _level <= 4, "Invalid level");
        require(levelConfigs[_level].isActive, "Level not active");
        _;
    }
    
    // ============ Constructor ============
    
    constructor(address _rewardToken) {
        rewardToken = IERC20(_rewardToken);
        nextSessionId = 1;
        
        // Initialize level configurations
        // Level 1: Beginner - 10 tokens per question
        levelConfigs[1] = LevelConfig({
            tokensPerQuestion: 10 * 10**18, // 10 tokens
            bonusMultiplier: 100, // 1x (no bonus)
            minimumPassScore: 60,
            isActive: true
        });
        
        // Level 2: Intermediate - 15 tokens per question
        levelConfigs[2] = LevelConfig({
            tokensPerQuestion: 15 * 10**18,
            bonusMultiplier: 110, // 1.1x bonus
            minimumPassScore: 70,
            isActive: true
        });
        
        // Level 3: Advanced - 20 tokens per question
        levelConfigs[3] = LevelConfig({
            tokensPerQuestion: 20 * 10**18,
            bonusMultiplier: 125, // 1.25x bonus
            minimumPassScore: 75,
            isActive: true
        });
        
        // Level 4: Expert - 25 tokens per question
        levelConfigs[4] = LevelConfig({
            tokensPerQuestion: 25 * 10**18,
            bonusMultiplier: 150, // 1.5x bonus
            minimumPassScore: 80,
            isActive: true
        });
    }
    
    // ============ Player Functions ============
    
    /**
     * @dev Register a new player
     */
    function registerPlayer() external whenNotPaused {
        require(!players[msg.sender].isRegistered, "Player already registered");
        
        players[msg.sender] = Player({
            walletAddress: msg.sender,
            totalScore: 0,
            totalTokensEarned: 0,
            level1Score: 0,
            level2Score: 0,
            level3Score: 0,
            level4Score: 0,
            quizzesCompleted: 0,
            lastPlayedTimestamp: block.timestamp,
            isRegistered: true
        });
        
        leaderboard.push(msg.sender);
        totalPlayersRegistered++;
        
        emit PlayerRegistered(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Submit quiz results and calculate rewards
     * @param _level Quiz difficulty level (1-4)
     * @param _questionsCorrect Number of correct answers
     * @param _totalQuestions Total questions in quiz
     */
    function submitQuizResults(
        uint8 _level,
        uint8 _questionsCorrect,
        uint8 _totalQuestions
    ) 
        external 
        whenNotPaused 
        onlyRegisteredPlayer 
        validLevel(_level) 
        nonReentrant 
        returns (uint256 sessionId, uint256 tokensEarned)
    {
        require(_questionsCorrect <= _totalQuestions, "Invalid score");
        require(_totalQuestions > 0, "Invalid total questions");
        
        // Calculate tokens earned
        tokensEarned = calculateReward(_level, _questionsCorrect, _totalQuestions);
        
        // Create quiz session
        sessionId = nextSessionId++;
        quizSessions[sessionId] = QuizSession({
            player: msg.sender,
            level: _level,
            questionsCorrect: _questionsCorrect,
            totalQuestions: _totalQuestions,
            tokensEarned: tokensEarned,
            timestamp: block.timestamp,
            rewardClaimed: false
        });
        
        // Update player stats
        Player storage player = players[msg.sender];
        player.totalScore += _questionsCorrect;
        player.quizzesCompleted++;
        player.lastPlayedTimestamp = block.timestamp;
        
        // Update level-specific scores
        if (_level == 1) player.level1Score += _questionsCorrect;
        else if (_level == 2) player.level2Score += _questionsCorrect;
        else if (_level == 3) player.level3Score += _questionsCorrect;
        else if (_level == 4) player.level4Score += _questionsCorrect;
        
        // Track player sessions
        playerSessions[msg.sender].push(sessionId);
        
        emit QuizCompleted(
            sessionId,
            msg.sender,
            _level,
            _questionsCorrect,
            tokensEarned,
            block.timestamp
        );
        
        return (sessionId, tokensEarned);
    }
    
    /**
     * @dev Claim rewards for a completed quiz session
     * @param _sessionId The session ID to claim rewards for
     */
    function claimReward(uint256 _sessionId) 
        external 
        whenNotPaused 
        nonReentrant 
    {
        QuizSession storage session = quizSessions[_sessionId];
        
        require(session.player == msg.sender, "Not your session");
        require(!session.rewardClaimed, "Reward already claimed");
        require(session.tokensEarned > 0, "No rewards to claim");
        
        uint256 contractTokenBalance = rewardToken.balanceOf(address(this));
        require(contractTokenBalance >= session.tokensEarned, "Insufficient contract balance");
        
        // Mark as claimed
        session.rewardClaimed = true;
        
        // Update player total
        players[msg.sender].totalTokensEarned += session.tokensEarned;
        
        // Update global stats
        totalRewardsDistributed += session.tokensEarned;
        
        // Transfer tokens
        require(
            rewardToken.transfer(msg.sender, session.tokensEarned),
            "Token transfer failed"
        );
        
        emit RewardClaimed(_sessionId, msg.sender, session.tokensEarned, block.timestamp);
    }
    
    /**
     * @dev Claim multiple rewards at once
     * @param _sessionIds Array of session IDs to claim
     */
    function claimMultipleRewards(uint256[] calldata _sessionIds) 
        external 
        whenNotPaused 
        nonReentrant 
    {
        uint256 totalToClaim = 0;
        
        for (uint256 i = 0; i < _sessionIds.length; i++) {
            QuizSession storage session = quizSessions[_sessionIds[i]];
            
            if (session.player == msg.sender && 
                !session.rewardClaimed && 
                session.tokensEarned > 0) 
            {
                session.rewardClaimed = true;
                totalToClaim += session.tokensEarned;
                
                emit RewardClaimed(_sessionIds[i], msg.sender, session.tokensEarned, block.timestamp);
            }
        }
        
        require(totalToClaim > 0, "No rewards to claim");
        
        uint256 contractTokenBalance = rewardToken.balanceOf(address(this));
        require(contractTokenBalance >= totalToClaim, "Insufficient contract balance");
        
        // Update player total
        players[msg.sender].totalTokensEarned += totalToClaim;
        
        // Update global stats
        totalRewardsDistributed += totalToClaim;
        
        // Transfer tokens
        require(
            rewardToken.transfer(msg.sender, totalToClaim),
            "Token transfer failed"
        );
    }
    
    // ============ View Functions ============
    
    /**
     * @dev Calculate reward for a quiz attempt
     */
    function calculateReward(
        uint8 _level,
        uint8 _questionsCorrect,
        uint8 _totalQuestions
    ) public view returns (uint256) {
        LevelConfig memory config = levelConfigs[_level];
        
        // Base reward: tokens per question * correct answers
        uint256 baseReward = config.tokensPerQuestion * _questionsCorrect;
        
        // Apply bonus multiplier for perfect score
        if (_questionsCorrect == _totalQuestions) {
            baseReward = (baseReward * config.bonusMultiplier) / 100;
        }
        
        return baseReward;
    }
    
    /**
     * @dev Get player information
     */
    function getPlayerInfo(address _player) 
        external 
        view 
        returns (
            uint256 totalScore,
            uint256 totalTokensEarned,
            uint256 quizzesCompleted,
            uint256 lastPlayed,
            uint256[4] memory levelScores
        ) 
    {
        Player memory player = players[_player];
        levelScores = [
            player.level1Score,
            player.level2Score,
            player.level3Score,
            player.level4Score
        ];
        
        return (
            player.totalScore,
            player.totalTokensEarned,
            player.quizzesCompleted,
            player.lastPlayedTimestamp,
            levelScores
        );
    }
    
    /**
     * @dev Get player's unclaimed rewards
     */
    function getUnclaimedRewards(address _player) 
        external 
        view 
        returns (uint256 totalUnclaimed, uint256[] memory sessionIds) 
    {
        uint256[] memory sessions = playerSessions[_player];
        uint256 count = 0;
        
        // First pass: count unclaimed sessions
        for (uint256 i = 0; i < sessions.length; i++) {
            if (!quizSessions[sessions[i]].rewardClaimed) {
                totalUnclaimed += quizSessions[sessions[i]].tokensEarned;
                count++;
            }
        }
        
        // Second pass: collect session IDs
        sessionIds = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < sessions.length; i++) {
            if (!quizSessions[sessions[i]].rewardClaimed) {
                sessionIds[index] = sessions[i];
                index++;
            }
        }
        
        return (totalUnclaimed, sessionIds);
    }
    
    /**
     * @dev Get top players for leaderboard
     */
    function getTopPlayers(uint256 _limit) 
        external 
        view 
        returns (
            address[] memory addresses,
            uint256[] memory scores,
            uint256[] memory tokensEarned
        ) 
    {
        uint256 limit = _limit > leaderboard.length ? leaderboard.length : _limit;
        
        addresses = new address[](limit);
        scores = new uint256[](limit);
        tokensEarned = new uint256[](limit);
        
        // Simple sorting - in production, use off-chain sorting
        for (uint256 i = 0; i < limit; i++) {
            uint256 maxScore = 0;
            uint256 maxIndex = 0;
            
            for (uint256 j = 0; j < leaderboard.length; j++) {
                if (players[leaderboard[j]].totalScore > maxScore) {
                    bool alreadyAdded = false;
                    for (uint256 k = 0; k < i; k++) {
                        if (addresses[k] == leaderboard[j]) {
                            alreadyAdded = true;
                            break;
                        }
                    }
                    
                    if (!alreadyAdded) {
                        maxScore = players[leaderboard[j]].totalScore;
                        maxIndex = j;
                    }
                }
            }
            
            addresses[i] = leaderboard[maxIndex];
            scores[i] = players[leaderboard[maxIndex]].totalScore;
            tokensEarned[i] = players[leaderboard[maxIndex]].totalTokensEarned;
        }
        
        return (addresses, scores, tokensEarned);
    }
    
    /**
     * @dev Get contract statistics
     */
    function getContractStats() 
        external 
        view 
        returns (
            uint256 totalPlayers,
            uint256 totalRewards,
            uint256 contractTokenBalance,
            uint256 totalSessions
        ) 
    {
        return (
            totalPlayersRegistered,
            totalRewardsDistributed,
            rewardToken.balanceOf(address(this)),
            nextSessionId - 1
        );
    }
    
    // ============ Admin Functions ============
    
    /**
     * @dev Update level configuration
     */
    function updateLevelConfig(
        uint8 _level,
        uint256 _tokensPerQuestion,
        uint256 _bonusMultiplier,
        uint256 _minimumPassScore,
        bool _isActive
    ) external onlyOwner {
        require(_level >= 1 && _level <= 4, "Invalid level");
        
        levelConfigs[_level] = LevelConfig({
            tokensPerQuestion: _tokensPerQuestion,
            bonusMultiplier: _bonusMultiplier,
            minimumPassScore: _minimumPassScore,
            isActive: _isActive
        });
        
        emit LevelConfigUpdated(_level, _tokensPerQuestion);
    }
    
    /**
     * @dev Fund the contract with reward tokens
     */
    function fundContract(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        
        require(
            rewardToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );
        
        contractBalance += _amount;
        
        emit ContractFunded(msg.sender, _amount);
    }
    
    /**
     * @dev Emergency withdraw (only owner)
     */
    function emergencyWithdraw(uint256 _amount) external onlyOwner {
        uint256 balance = rewardToken.balanceOf(address(this));
        require(_amount <= balance, "Insufficient balance");
        
        require(
            rewardToken.transfer(owner(), _amount),
            "Transfer failed"
        );
        
        emit EmergencyWithdraw(owner(), _amount);
    }
    
    /**
     * @dev Pause contract
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}