const level1Questions = [
  {
    id: "l1-q1",
    level: 1,
    difficulty: "beginner",
    category: "algebra",
    background:"Solve for x :",
    question: "\\(3x^2 - 7 = 14\\) ",
    answers: ["5  ", "7", "21", "3"],
    correctAnswer: "7",
    reward: 10,
    solution: [
      "Step 1: Add 7 to both sides: 3x = 21",
      "Step 2: Divide both sides by 3: x = 7"
    ],
    hint: "Isolate the variable x by performing inverse operations"
  },
  {
    id: "l1-q2",
    level: 1,
    difficulty: "beginner",
    category: "algebra",
    background: "Simplify the expression:",
    question: "\\frac{x^2 + 5x + 6}{x + 2}",
    answers: [
      "x + 3", 
      "x + 2", 
      "x^2 + 3", 
      "x + 6"
    ],
    correctAnswer: "x + 3",
    reward: 10,
    solution: [
      "Step 1: Factor the numerator: \\( (x + 2)(x + 3) \\)",
      "Step 2: Divide by the denominator: \\( \\frac{(x + 2)(x + 3)}{(x + 2)} \\)",
      "Step 3: Cancel the common term to get \\( x + 3 \\)"
    ],
    hint: "Try to turn the top part into two brackets: (x + ?)(x + ?)"
  },
  {
    id: "l1-q3",
    level: 1,
    difficulty: "beginner",
    category: "functions",
    background: "Given the following equation, evaluate: ",
    question: "\\(f(x) = 2x^2 - 3x + 1\\) \; f(2)",
    answers: [
      "3", 
      "7", 
      "5", 
      "1"
    ],
    correctAnswer: "3",
    reward: 10,
    solution: [
      "Step 1: Substitute \\( x = 2 \\) into the equation.",
      "Step 2: \\( 2(2)^2 - 3(2) + 1 \\)",
      "Step 3: \\( 2(4) - 6 + 1 = 8 - 6 + 1 = 3 \\)"
    ],
    hint: "Replace every 'x' in the equation with the number 2."
  },
  {
    id: "l1-q4",
    level: 1,
    difficulty: "beginner",
    category: "trigonometry",
    background: "Evaluate the exact value: ",
    question: "\\sin(30^\\circ)",
    answers: [
      "\\frac{1}{2}", 
      "\\frac{\\sqrt{3}}{2}", 
      "1", 
      "\\frac{\\sqrt{2}}{2}"
    ],
    correctAnswer: "\\( \\frac{1}{2} \\) ",
    reward: 10,
    solution: [
      "Step 1: Recall the special angles on the unit circle.",
      "Step 2: At \\( 30^\\circ \\), the y-coordinate is \\( \\frac{1}{2} \\)."
    ],
    hint: "Think of the special right triangle 30-60-90."
  },
  {
    id: "l1-q5",
    level: 1,
    difficulty: "beginner",
    category: "exponentials",
    background: "Simplify using exponent laws: ",
    question: "2^5 \\times 2^3",
    answers: [
      "2^8", 
      "2^{15}", 
      "4^8", 
      "2^2"
    ],
    correctAnswer: "2^8",
    reward: 10,
    solution: [
      "Step 1: The bases are the same (2), so we add the exponents.",
      "Step 2: Rule: \\( a^m \\times a^n = a^{m+n} \\)",
      "Step 3: \\( 2^{5+3} = 2^8 \\)"
    ],
    hint: "When you multiply same bases, you add their powers."
  }
];
// Level 2 - Intermediate (Calculus I & Linear Algebra)
const level2Questions = [
  {
    id: "l2-q1",
    level: 2,
    difficulty: "intermediate",
    category: "calculus",
    background: "Find the derivative (f'(x)) of:",
    // Fixed typo: changed 3x^2 to 3x^3 so it matches the answer 9x^2
    question: "f(x) = 3x^3 - 5x^2 + 2x - 7",
    answers: [
      "9x^2 - 10x + 2", 
      "3x^2 - 10x + 2", 
      "9x^2 - 5x + 2", 
      "6x^2 - 10x + 2"
    ],
    correctAnswer: "9x^2 - 10x + 2",
    reward: 15,
    solution: [
      "Step 1: Apply power rule: \\( \\frac{d}{dx}(x^n) = nx^{n-1} \\)",
      "Step 2: \\( \\frac{d}{dx}(3x^3) = 9x^2 \\), \\( \\frac{d}{dx}(-5x^2) = -10x \\)",
      "Step 3: The constant -7 becomes 0.",
      "Step 4: Combine: \\( 9x^2 - 10x + 2 \\)"
    ],
    hint: "Multiply the power by the coefficient, then subtract 1 from the power."
  },
  {
    id: "l2-q2",
    level: 2,
    difficulty: "intermediate",
    category: "calculus",
    background: "Evaluate the indefinite integral:",
    question: "\\int (6x^2 + 4x - 3) \\, dx",
    answers: [
      "2x^3 + 2x^2 - 3x + C", 
      "6x^3 + 4x^2 - 3x + C", 
      "2x^3 + 4x^2 - 3x + C", 
      "3x^3 + 2x^2 - 3x + C"
    ],
    correctAnswer: "2x^3 + 2x^2 - 3x + C",
    reward: 15,
    solution: [
      "Step 1: Power rule for integration: \\( \\int x^n \\, dx = \\frac{x^{n+1}}{n+1} \\)",
      "Step 2: \\( \\int 6x^2 \\, dx = \\frac{6x^3}{3} = 2x^3 \\)",
      "Step 3: \\( \\int 4x \\, dx = \\frac{4x^2}{2} = 2x^2 \\)",
      "Step 4: Combine and add \\( C \\)."
    ],
    hint: "Add 1 to the exponent, then divide by the new exponent."
  },
  {
    id: "l2-q3",
    level: 2,
    difficulty: "intermediate",
    category: "calculus",
    background: "Find the limit:",
    question: "\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}",
    answers: [
      "4", 
      "2", 
      "0", 
      "\\text{undefined}"
    ],
    correctAnswer: "4",
    reward: 15,
    solution: [
      "Step 1: Factor the numerator: \\( x^2 - 4 = (x + 2)(x - 2) \\)",
      "Step 2: Rewrite: \\( \\lim_{x \\to 2} \\frac{(x + 2)(x - 2)}{x - 2} \\)",
      "Step 3: Cancel terms and substitute: \\( 2 + 2 = 4 \\)"
    ],
    hint: "Direct substitution gives 0/0. Try factoring the top part first."
  },
  {
    id: "l2-q4",
    level: 2,
    difficulty: "intermediate",
    category: "linear_algebra",
    background: "Calculate the determinant:",
    question: "\\begin{vmatrix} 2 & 3 \\\\ 1 & 4 \\end{vmatrix}",
    answers: [
      "5", 
      "8", 
      "11", 
      "14"
    ],
    correctAnswer: "5",
    reward: 15,
    solution: [
      "Step 1: For matrix \\( \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} \\), determinant is \\( ad - bc \\).",
      "Step 2: Calculate: \\( (2)(4) - (3)(1) \\)",
      "Step 3: \\( 8 - 3 = 5 \\)"
    ],
    hint: "Multiply the main diagonal (top-left to bottom-right) and subtract the other diagonal."
  },
  {
    id: "l2-q5",
    level: 2,
    difficulty: "intermediate",
    category: "calculus",
    background: "Find the derivative of the function, if its defined as: ",
    question: "y = e^{2x} \\ln(x)",
    answers: [
      "2e^{2x}\\ln(x) + \\frac{e^{2x}}{x}", 
      "\\frac{e^{2x}}{x}", 
      "2e^{2x}\\ln(x)", 
      "e^{2x}\\ln(x) + \\frac{1}{x}"
    ],
    correctAnswer: "2e^{2x}\\ln(x) + \\frac{e^{2x}}{x}",
    reward: 15,
    solution: [
      "Step 1: Use Product Rule: \\( (uv)' = u'v + uv' \\)",
      "Step 2: Let \\( u = e^{2x} \\) (chain rule gives \\( u' = 2e^{2x} \\))",
      "Step 3: Let \\( v = \\ln(x) \\) (derivative is \\( v' = \\frac{1}{x} \\))",
      "Step 4: Combine: \\( 2e^{2x}\\ln(x) + e^{2x}\\cdot\\frac{1}{x} \\)"
    ],
    hint: "You need the Product Rule because two functions of x are multiplied."
  }
];
const level3Questions = [
  {
    id: "l3-q1",
    level: 3,
    difficulty: "advanced",
    category: "calculus",
    background: "Evaluate the integral using Integration by Parts:",
    question: "\\int x e^x \\, dx",
    answers: [
      "x e^x - e^x + C", 
      "e^x(x - 1) + C", 
      "x e^x + C", 
      "\\frac{x^2 e^x}{2} + C"
    ],
    correctAnswer: "e^x(x - 1) + C",
    reward: 20,
    solution: [
      "Step 1: Integration by parts formula: \\( \\int u \\, dv = uv - \\int v \\, du \\)",
      "Step 2: Let \\( u = x \\) and \\( dv = e^x \\, dx \\)",
      "Step 3: Differentiate/Integrate: \\( du = dx \\), \\( v = e^x \\)",
      "Step 4: Apply formula: \\( x e^x - \\int e^x \\, dx \\)",
      "Step 5: Simplify: \\( e^x(x - 1) + C \\)"
    ],
    hint: "Set u = x so that du becomes simpler."
  },
  {
    id: "l3-q2",
    level: 3,
    difficulty: "advanced",
    category: "multivariable_calculus",
    background: "Find the partial derivative with respect to x:",
    question: "f(x,y) = x^2 y^3 + 3xy - 2y",
    answers: [
      "2xy^3 + 3y", 
      "3x^2 y^2 + 3x", 
      "2xy^3 + 3x", 
      "x^2 y^3 + 3y"
    ],
    correctAnswer: "2xy^3 + 3y",
    reward: 20,
    solution: [
      "Step 1: Treat \\( y \\) as a constant constant number.",
      "Step 2: \\( \\frac{\\partial}{\\partial x}(x^2 y^3) = 2x \\cdot y^3 \\)",
      "Step 3: \\( \\frac{\\partial}{\\partial x}(3xy) = 3y \\)",
      "Step 4: \\( \\frac{\\partial}{\\partial x}(-2y) = 0 \\) (since it has no x)",
      "Step 5: Combine: \\( 2xy^3 + 3y \\)"
    ],
    hint: "Ignore all y terms that don't differeniate x, or treat them like coefficients."
  },
  {
    id: "l3-q3",
    level: 3,
    difficulty: "advanced",
    category: "series",
    background: "Determine convergence:",
    question: "\\sum_{n=1}^{\\infty} \\frac{1}{n^2}",
    answers: [
      "Converges", 
      "Diverges", 
      "Conditionally converges", 
      "Cannot be determined"
    ],
    correctAnswer: "Converges",
    reward: 20,
    solution: [
      "Step 1: Identify this as a p-series: \\( \\sum \\frac{1}{n^p} \\)",
      "Step 2: Here, \\( p = 2 \\)",
      "Step 3: p-series test: if \\( p > 1 \\), the series converges.",
      "Step 4: Since \\( 2 > 1 \\), it converges (to \\( \\frac{\\pi^2}{6} \\))."
    ],
    hint: "Check the exponent of n. Is it greater than 1?"
  },
  {
    id: "l3-q4",
    level: 3,
    difficulty: "advanced",
    category: "differential_equations",
    background: "Solve the initial value problem:",
    question: "\\frac{dy}{dx} = 2xy, \\quad y(0) = 1",
    answers: [
      "y = e^{x^2}", 
      "y = e^{2x}", 
      "y = 2e^x", 
      "y = x^2 + 1"
    ],
    correctAnswer: "y = e^{x^2}",
    reward: 20,
    solution: [
      "Step 1: Separate variables: \\( \\frac{dy}{y} = 2x \\, dx \\)",
      "Step 2: Integrate sides: \\( \\ln|y| = x^2 + C \\)",
      "Step 3: Solve for y: \\( y = e^{x^2 + C} = Ae^{x^2} \\)",
      "Step 4: Apply \\( y(0)=1 \\): \\( 1 = Ae^0 \\implies A=1 \\)",
      "Step 5: Solution: \\( y = e^{x^2} \\)"
    ],
    hint: "Get all y's on the left and all x's on the right."
  },
  {
    id: "l3-q5",
    level: 3,
    difficulty: "advanced",
    category: "vector_calculus",
    background: "Find the divergence \\( \\nabla \\cdot \\mathbf{F} \\) at \\( (1,1,1) \\):",
    question: "\\mathbf{F} = \\langle 3x^2y, \\; xz^2, \\; -2yz \\rangle",
    answers: [
      "6", 
      "4", 
      "5", 
      "8"
    ],
    // Corrected from 6 to 4 based on the math below
    correctAnswer: "4", 
    reward: 20,
    solution: [
      "Step 1: Divergence formula: \\( \\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z} \\)",
      "Step 2: \\( \\frac{\\partial}{\\partial x}(3x^2y) = 6xy \\)",
      "Step 3: \\( \\frac{\\partial}{\\partial y}(xz^2) = 0 \\)",
      "Step 4: \\( \\frac{\\partial}{\\partial z}(-2yz) = -2y \\)",
      "Step 5: Sum is \\( 6xy - 2y \\). At \\( (1,1,1) \\): \\( 6(1)(1) - 2(1) = 4 \\)"
    ],
    hint: "Take the partial derivative of the first component with respect to x, second to y, third to z, and add them."
  }
];
//
const level4Questions = [
  {
    id: "l4-q1",
    level: 4,
    difficulty: "expert",
    category: "probability",
    question: "If X ~ N(100, 15²), what is P(X > 115) approximately? (Use empirical rule)",
    answers: ["0.16", "0.32", "0.025", "0.05"],
    correctAnswer: "0.16",
    reward: 25,
    solution: [
      "Step 1: X follows Normal distribution with μ = 100, σ = 15",
      "Step 2: 115 = μ + σ = 100 + 15 (one standard deviation above mean)",
      "Step 3: By empirical rule, 68% of data is within 1σ of mean",
      "Step 4: So 32% is outside, split equally: 16% above, 16% below",
      "Step 5: P(X > 115) ≈ 0.16"
    ],
    hint: "Use the 68-95-99.7 rule (empirical rule)"
  },
  {
    id: "l4-q2",
    level: 4,
    difficulty: "expert",
    category: "linear_algebra",
    question: "What are the eigenvalues of matrix [[4, 1], [2, 3]]?",
    answers: ["λ = 5, 2", "λ = 4, 3", "λ = 6, 1", "λ = 3, 2"],
    correctAnswer: "λ = 5, 2",
    reward: 25,
    solution: [
      "Step 1: Find det(A - λI) = 0",
      "Step 2: det([[4-λ, 1], [2, 3-λ]]) = 0",
      "Step 3: (4-λ)(3-λ) - (1)(2) = 0",
      "Step 4: 12 - 7λ + λ² - 2 = 0",
      "Step 5: λ² - 7λ + 10 = 0",
      "Step 6: (λ - 5)(λ - 2) = 0",
      "Step 7: λ = 5 or λ = 2"
    ],
    hint: "Solve the characteristic equation det(A - λI) = 0"
  },
  {
    id: "l4-q3",
    level: 4,
    difficulty: "expert",
    category: "complex_analysis",
    question: "What is |e^(iπ) + 1|? (Euler's formula)",
    answers: ["0", "1", "2", "e"],
    correctAnswer: "0",
    reward: 25,
    solution: [
      "Step 1: Apply Euler's formula: e^(iθ) = cos(θ) + i·sin(θ)",
      "Step 2: e^(iπ) = cos(π) + i·sin(π)",
      "Step 3: e^(iπ) = -1 + 0i = -1",
      "Step 4: e^(iπ) + 1 = -1 + 1 = 0",
      "Step 5: |0| = 0 (This is Euler's identity)"
    ],
    hint: "Apply Euler's formula with θ = π"
  },
  {
    id: "l4-q4",
    level: 4,
    difficulty: "expert",
    category: "real_analysis",
    question: "Is the function f(x) = |x| differentiable at x = 0?",
    answers: ["No", "Yes", "Only from the right", "Only from the left"],
    correctAnswer: "No",
    reward: 25,
    solution: [
      "Step 1: Check left-hand derivative: lim(h→0⁻) [|0+h| - |0|]/h = lim(h→0⁻) |h|/h = -1",
      "Step 2: Check right-hand derivative: lim(h→0⁺) [|0+h| - |0|]/h = lim(h→0⁺) |h|/h = 1",
      "Step 3: Since left and right derivatives differ (-1 ≠ 1)",
      "Step 4: The function is not differentiable at x = 0",
      "Step 5: The graph has a sharp corner at the origin"
    ],
    hint: "Check if left and right derivatives are equal"
  },
  {
    id: "l4-q5",
    level: 4,
    difficulty: "expert",
    category: "optimization",
    question: "Find critical points of f(x,y) = x² + y² - 4x + 6y + 5",
    answers: ["(2, -3)", "(-2, 3)", "(2, 3)", "(-2, -3)"],
    correctAnswer: "(2, -3)",
    reward: 25,
    solution: [
      "Step 1: Find partial derivatives: ∂f/∂x = 2x - 4, ∂f/∂y = 2y + 6",
      "Step 2: Set ∂f/∂x = 0: 2x - 4 = 0 → x = 2",
      "Step 3: Set ∂f/∂y = 0: 2y + 6 = 0 → y = -3",
      "Step 4: Critical point is (2, -3)",
      "Step 5: This is a local minimum (verify with second derivative test)"
    ],
    hint: "Set both partial derivatives equal to zero"
  }
];

// Combines all questions
const allQuestions = {
  level1: level1Questions,
  level2: level2Questions,
  level3: level3Questions,
  level4: level4Questions
};

export { level1Questions, level2Questions, level3Questions, level4Questions };
export default allQuestions;