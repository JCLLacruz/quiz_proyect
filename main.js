const homeDiv = document.getElementById('home-div');
const questionsDiv = document.getElementById('questions-div');
const resultsDiv = document.getElementById('results-div');
const startButton = document.getElementById('start-button');
const inputUserName = document.getElementById('input-user-name');
const nextBtnForm = document.getElementById('next_btn_form');
const answersForm = document.getElementById('answers_form');
const singleQuestionTitle = document.getElementById('single_question_title');
const inputsAnswersHolder = document.getElementById('inputs_answers_form');
const error = document.getElementById('error_holder');
const restartBtn = document.getElementById('restart-btn');

let questions;
let currentQuestionIndex;

let correctAnswerKey;
let correctAnswersCounter = 0;

let URLAPI = 'https://quizapi.io/api/v1/questions?apiKey=MGitvh0Vb19uQfvuYcKNsFgkxgZi4GImf2jwImrl&limit=10';

const downloadData = async () => {
    try {
        const res = await axios.get(URLAPI);
        questions = res.data;
    } catch (error) {
        console.error(error);
    }
};
downloadData();

const appendAlert = (message, type, where) => {
    where.innerHTML = `<div id='appendedWraper' class="mt-2 alert alert-${type} alert-dismissible" role="alert">
                            <div>${message}</div>
                        </div>`;
    setTimeout(function () {
        where.innerHTML = '';
    }, 3000);
};

const capitalize = (text) => {
    const firstLetter = text.charAt(0);
    const rest = text.slice(1);
    return firstLetter.toUpperCase() + rest;
};

const displayNone = () => {
    homeDiv.classList.add('d-none');
    questionsDiv.classList.add('d-none');
    resultsDiv.classList.add('d-none');
};

//Validations
const nameValidation = () => {
    if (inputUserName.value === '') {
        appendAlert('Please fill out the name field.', 'danger', error)
        return false;
    } else {
        return true;
    }
};

const answersValidation = () => {
    const inputsAnswers = document.querySelectorAll('.answer');
    for (let i = 0; i < inputsAnswers.length; i++) {
        console.log('inputs separados',inputsAnswers[i]);
        if (inputsAnswers[i].checked) {
            return true;
        } 
    }
};

const saveUserOnStorage = (user) => {
    let usersArr = [];

    const keys = Object.keys(localStorage);

    if (localStorage.AllUsers === undefined) {
        usersArr.push(JSON.stringify(user));
        localStorage.AllUsers = `[${usersArr}]`;
    } else {
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === 'AllUsers') {
                usersArr = JSON.parse(localStorage.getItem("AllUsers"));
                usersArr.push(user);
                localStorage.setItem('AllUsers', JSON.stringify(usersArr));
            }
        }
    }
};

const generateQuestion = (question) => {
    inputsAnswersHolder.innerHTML = '';
    singleQuestionTitle.innerText = '';
    singleQuestionTitle.innerText = question.question;

    let answers = Object.entries(question.answers);
    let shuffledAnswers = answers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(([key, value]) => {
        if (value !== null) {
            value = capitalize(value);
            Object.entries(question.correct_answers).forEach(([key, value]) => {
                if (value === 'true') {
                    correctAnswerKey = key.replace('_correct', '');
                }
            })
            const div = document.createElement('div');
            div.setAttribute('class', 'container d-flex align-items-center gap-3 mb-3 justify-content-between');
            const label = document.createElement('label');
            label.setAttribute('for', key);
            div.setAttribute('class', 'form-check-label');
            label.innerText = value;
            div.appendChild(label);
            const input = document.createElement('input');
            input.setAttribute('id', key);
            input.setAttribute('type', 'radio');
            input.setAttribute('class', 'answer form-check-input');
            input.setAttribute('name', 'answer');
            div.appendChild(input);
            inputsAnswersHolder.appendChild(div);
        }
    });
};

const setNextQuestion = () => {
    generateQuestion(questions[currentQuestionIndex]);
};

const nextAnswer = (e) => {
    e.preventDefault();
    if (answersValidation()) {
    const statusAnswer = document.getElementById(`${correctAnswerKey}`).checked; ////------
    console.log('status answer', statusAnswer);
    if (statusAnswer) {
        correctAnswersCounter += 1;
    }
    currentQuestionIndex++;
    if (questions.length > currentQuestionIndex + 1) {
        setNextQuestion(currentQuestionIndex);
    } else {
        const user = {};
        user.name = inputUserName.value;
        user.points = correctAnswersCounter*10;
        saveUserOnStorage(user);
        displayNone();
        resultsDiv.classList.remove('d-none');
    }
} else {
    appendAlert('Please check one answer.', 'danger', error)
}
};

const startQuiz = (e) => {
    e.preventDefault();
    currentQuestionIndex = 0;
    if (nameValidation()) {
        displayNone();
        questionsDiv.classList.remove('d-none');
    
        setNextQuestion(questions, currentQuestionIndex);
    }
};

startButton.addEventListener('click', startQuiz);
nextBtnForm.addEventListener('click', nextAnswer);
restartBtn.addEventListener('click',()=>{
    displayNone();
    homeDiv.classList.remove('d-none');
});
