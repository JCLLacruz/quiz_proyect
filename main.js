const homeDiv = document.getElementById('homeDiv');
const questionsDiv = document.getElementById('questionsDiv');
const resultsDiv = document.getElementById('resultsDiv');
const startButton = document.getElementById('startButton');

let currentQuestionIndex = 0;

let correctAnswersCounter;

let questions = [];
axios.get('https://quizapi.io/api/v1/questions?apiKey=MGitvh0Vb19uQfvuYcKNsFgkxgZi4GImf2jwImrl&limit=10')
    .then(res => questions = res.data)
    .catch(error => console.log(error));


const startQuiz = (e) => {
    e.preventDefault();
    let currentQuestionIndex = 0;
    displayNone();

    questionsDiv.classList.remove('d-none');

    setNextQuestion(currentQuestionIndex);

    console.log('Array de questions:', questions);
};

startButton.addEventListener('click', startQuiz);

const displayNone = () => {
    homeDiv.classList.add('d-none');
    questionsDiv.classList.add('d-none');
    resultsDiv.classList.add('d-none');
};

const generateQuestion = (question) => {
    const singleQuestion = document.createElement('div');
    singleQuestion.setAttribute('class', 'container rounder p-3 bg-white');
    const h2Question = document.createElement('h2');
    h2Question.innerText = question.question;
    questionsDiv.appendChild(singleQuestion);
    singleQuestion.appendChild(h2Question);
    const answersContainer = document.createElement('div');
    answersContainer.setAttribute('class', 'container rounder p-3 bg-white');
    questionsDiv.appendChild(answersContainer);
    
    let answers = Object.entries(question.answers);
    console.log('Question',question);
    console.log('Answers', answers);
    answers.forEach(([key, value]) => {
        if (value !== null) {
            const buttonAnswer = document.createElement('button');
            buttonAnswer.innerText = value;
            buttonAnswer.setAttribute('class', 'btn btn-primary')
            answersContainer.appendChild(buttonAnswer);
            console.log('Respuesta', value);
            console.log('keys', key);
        }
        if (question.multiple_correct_answers === true ){
            const multipleAnswersP = document.createElement('p');
            multipleAnswersP.innerText = 'Multiple options are correct';
        } else {
            if (question.correct_answer === key){
                //buttonAnswer.addEventListener('click', selectAnswer);
            }
        }
    });
};

const setNextQuestion = (currentQuestionIndex) => {
    generateQuestion(questions[currentQuestionIndex]);
    console.log(questions[currentQuestionIndex]);
}
