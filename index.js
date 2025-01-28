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
    const questions = await fetchQuestions();
    if (questions && questions.length > 0) {
        runQuiz(questions);
    } else {
        console.error("No more questions");
    }
 }