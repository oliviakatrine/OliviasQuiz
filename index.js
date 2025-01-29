let currentQuestion = 0;
let points = 0;
let questions = [];

async function fetchQuestions() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();
        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function showStartScreen() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>Olivia's Quiz ✨</h1>
        <button id="start-button">Start Quiz</button>
    `;

    document.getElementById('start-button').addEventListener('click', startQuiz);
}

async function startQuiz() {
    currentQuestion = 0;
    points = 0;
    questions = await fetchQuestions();

    renderQuestion(questions[currentQuestion], questions.length);
}

function renderQuestion(questionObj, totalQuestions) {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>Question ${currentQuestion + 1} of ${totalQuestions}</h1>
        <p>${questionObj.question}</p>
        <div class="options-container">
            ${questionObj.options.map(option => `<button class="option">${option}</button>`).join('')}
        </div>
        <p id="feedback"></p> 
    `;

    const buttons = document.querySelectorAll('.option');
    buttons.forEach(button => {
        button.addEventListener('click', () => handleAnswer(button.textContent, questionObj.answer, totalQuestions));
    });
}

function handleAnswer(selectedAnswer, correctAnswer, totalQuestions) {
    const feedback = document.getElementById('feedback');

    if (selectedAnswer == correctAnswer) {
        points++;
        feedback.textContent = "✅ Correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Wrong!";
        feedback.style.color = "red";
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
            renderQuestion(questions[currentQuestion], totalQuestions);
        } else {
            showResults();
        }
    }, 750);
}

function showResults() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>You got <strong>${points}</strong> out of <strong>${questions.length}</strong> correct! ✨</p>
        <button id="play-again">Play Again</button>
    `;

    document.getElementById('play-again').addEventListener('click', showStartScreen);
}

showStartScreen();
