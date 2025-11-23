# Celo Math-Quest Web App

Math-Quest is a relaxed, web-based mathematics quiz game built to help university and college students prepare for engineering math exams(and tests...). It offers leveled questions that go from high-school Math up to more advanced university topics (about up to third-year level, i guess?). Math is rendered clearly using KaTeX so formulas look good in the browser.

This project was created during a hackathon and includes a simple rewards idea: when a user answers questions correctly they earn virtual coins that can be moved to a virtual wallet.

Initially, the idea of this project was inspired by LeetCode, whereby Programmers can try industry grade interview questions and stretch their brain bone before getting to an interview, the similar concept would be great for University students, They can Log-In to Math-Quest, Do some Math, and stay away from Meth(Ha!). 

## Who this is for
Mostly students, Maybe younger me. Instead of relying on AIs, which require you to iteratively correct their obvious mistakes,You can get a platform that has expert contributors who constantly grow the pool of questions, and provide broken down reasoning behind how to solve specific questions, Students can excel better and maybe find it easier to understand Maths, Who Knows...

## Project Feature
- The Questions pool covers topics from probability, linear algebra, calculus, and analysis.
- Mathematical equations are rendered with KaTeX to ensure readable equations.

## How it works (high level)
- Questions are stored in `src/data/questions.js` grouped by level (level1, level2, ...).
- The `useQuiz` hook loads questions for the chosen level, shuffles options, tracks score, rewards, and history, and exposes actions to evaluate answers and advance.
- The UI components (like `components/Quiz.jsx`) read the hook state and render the question, shuffled options, and feedback.
- KaTeX is used to render inline and block math in questions and solutions.
