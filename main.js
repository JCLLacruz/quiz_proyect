const homeDiv = document.getElementById('homeDiv');
const questionsDiv = document.getElementById('questionsDiv');
const resultsDiv = document.getElementById('resultsDiv');
const startButton = document.getElementById('startButton');

let questions = [];
axios.get('https://quizapi.io/api/v1/questions?apiKey=MGitvh0Vb19uQfvuYcKNsFgkxgZi4GImf2jwImrl&limit=10')
.then(res => questions = res.data)
.catch(error => console.log(error));

let currentQuestionIndex;

let correctAnswersCounter;

const startQuiz = (e) => {
    e.preventDefault();
    let currentQuestionIndex = 0;
    displayNone();
    
    questionsDiv.classList.remove('d-none');

    generateQuestion();
    console.log('Array de questions:', questions);
};

startButton.addEventListener('click',startQuiz);

const displayNone = () => {
    homeDiv.classList.add('d-none');
    questionsDiv.classList.add('d-none');
    resultsDiv.classList.add('d-none');
};

const generateQuestion = (question) => {
    const singleQuestion = document.createElement('div');
    singleQuestion.setAttribute('class', 'container shadow rounder p-3 bg-white');
    const h2Question = document.createElement('h2');
    h2Question.innerText = question.question;
    questionsDiv.appendChild(singleQuestion);
    const answersContainer = document.createElement('div');
    answersContainer.setAttribute('class', 'container shadow rounder p-3 bg-white');
    questionsDiv.appendChild(answersContainer);
    question.answers.forEach((answer) => {
        const answersKeys = Object.keys(question.answers);
        const buttonAnswer = document.createElement('button');
        buttonAnswer.innerText = answer;

    });
 

};