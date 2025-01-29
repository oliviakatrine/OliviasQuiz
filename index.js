let currentQuestion = 0;
let points = 0; 


async function fetchQuestions() {
    try {
        const response = await fetch('questions.json'); 
        const questions = await response.json(); 
        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

async function startQuiz() {
    currentQuestion = 0; 
    points = 0; 
    const questions = await fetchQuestions(); 

    renderQuestion(questions[currentQuestion], questions.length);

    document.getElementById('root').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const selectedAnswer = e.target.textContent;
            const correctAnswer = questions[currentQuestion].answer;

            if (selectedAnswer == correctAnswer) {
                points++;
                alert('Correct!');
            } else {
                alert('False!');
            }

            currentQuestion++;
            if (currentQuestion < questions.length) {
                renderQuestion(questions[currentQuestion], questions.length);
            } else {
                showResults();
            }
        }
    });
}

function renderQuestion(questionObj, totalQuestions) {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>Question ${currentQuestion + 1} of ${totalQuestions}</h1>
        <p>${questionObj.question}</p>
        ${questionObj.options.map(option => `<button>${option}</button>`).join('')}
    `;
}

function showResults() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>You got ${points} out of ${currentQuestion} questions right! Congratulations!</p>
        <button onclick="startQuiz()">Would you like to play again?</button>
    `;
}

startQuiz();
