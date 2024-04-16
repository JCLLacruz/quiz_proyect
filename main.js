const homeDiv = document.getElementById('home-div');
const questionsDiv = document.getElementById('questions-div');
const resultsDiv = document.getElementById('results-div');
const contactDiv = document.getElementById('contact-div');
const startButton = document.getElementById('start-button');
const inputUserName = document.getElementById('input-user-name');
const nextBtnForm = document.getElementById('next_btn_form');
const answersForm = document.getElementById('answers_form');
const singleQuestionTitle = document.getElementById('single_question_title');
const inputsAnswersHolder = document.getElementById('inputs_answers_form');
const error = document.getElementById('error_holder');
const restartBtn = document.getElementById('restart-btn');
const yourScoreDiv = document.getElementById('your-score');
const titleQuizLink = document.getElementById('titleQuiz');
const navLinkStats = document.getElementById('nav-link-stats');
const navLinkContact = document.getElementById('nav-link-contact');
const progressBar = document.getElementById('progress-bar');
const canvasHolder = document.getElementById('canvas-holder');
const rankingUsersDiv = document.getElementById('ranking_users');

let questions;
let currentQuestionIndex;

let correctAnswerKey;
let correctAnswersCounter = 0;

let URLAPI = 'https://quizapi.io/api/v1/questions?apiKey=MGitvh0Vb19uQfvuYcKNsFgkxgZi4GImf2jwImrl&limit=10';

const goToLink = (url) => {
    window.location.href = url;
}

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
    contactDiv.classList.add('d-none');
    restartBtn.classList.add('d-none');
    canvasHolder.classList.add('d-none');
    yourScoreDiv.classList.add('d-none');
};

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
        if (inputsAnswers[i].checked) {
            return true;
        }
    }
};

const printYourScore = (user) => {
    const { name, points } = user;
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    const cardTitle = document.createElement('h1');
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.innerText = `${name}'s Score`;
    const score = document.createElement('h2');
    score.innerText = `${points}/100 points`;
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(score);
    yourScoreDiv.appendChild(card);
    yourScoreDiv.classList.remove('d-none');
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
    console.log('Question', question);

    shuffledAnswers.forEach(([key, value]) => {
        if (value !== null) {
            value = capitalize(value);
            Object.entries(question.correct_answers).forEach(([key, value]) => {
                if (value === 'true') {
                    correctAnswerKey = key.replace('_correct', '');
                }
            })
            const div = document.createElement('div');
            div.setAttribute('class', 'container d-flex align-items-center gap-3 mb-3');
            const label = document.createElement('label');
            label.setAttribute('for', key);
            div.setAttribute('class', 'form-check-label');
            label.innerText = value;
            div.appendChild(label);
            const input = document.createElement('input');
            input.setAttribute('id', key);
            input.setAttribute('type', 'radio');
            input.setAttribute('class', 'answer form-check-input ms-3');
            input.setAttribute('name', 'answer');
            div.appendChild(input);
            inputsAnswersHolder.appendChild(div);
        }
    });
};

const setNextQuestion = () => {
    progressBar.setAttribute("style", `width: ${(currentQuestionIndex) * 10}%`);
    progressBar.setAttribute("aria-valuenow", `${(currentQuestionIndex) * 10}`);
    generateQuestion(questions[currentQuestionIndex]);
};

const nextAnswer = (e) => {
    e.preventDefault();
    if (answersValidation()) {
        const statusAnswer = document.getElementById(`${correctAnswerKey}`).checked;
        if (statusAnswer) {
            correctAnswersCounter += 1;
        }
        currentQuestionIndex++;
        if (questions.length > currentQuestionIndex) {
            setNextQuestion(currentQuestionIndex);
        } else {
            const user = {};
            user.name = inputUserName.value;
            user.points = correctAnswersCounter * 10;
            saveUserOnStorage(user);
            displayNone();
            showChartAndRanking();
            printYourScore(user);
            printRanking();
            resultsDiv.classList.remove('d-none');
            restartBtn.classList.remove('d-none');
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

const myChart = (config) => new Chart('myChart', config);

const showChartAndRanking = () => {
    canvasHolder.innerHTML = '';
    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', 'myChart');
    canvasHolder.appendChild(newCanvas);

    printRanking();

    let usersArrChart = JSON.parse(localStorage.getItem("AllUsers")) || [];

    if (usersArrChart.length !== 0){
        let labels = usersArrChart.map(user => user.name);
        let scores = usersArrChart.map(user => user.points);
    
        const data = {
            labels: labels,
            datasets: [{
                label: 'Users Scores',
                backgroundColor: 'rgb(25, 25, 25)',
                borderColor: 'rgb(255, 99, 132)',
                data: scores,
            }]
        };
    
        const config = {
            type: 'bar',
            data: data,
            options: {}
        };
        myChart(config);
        canvasHolder.classList.remove('d-none');
    } else {
        displayNone();
        resultsDiv.classList.remove('d-none');

    }
};

const printRanking = () => {
    rankingUsersDiv.innerHTML = '';
    let usersArr = JSON.parse(localStorage.getItem("AllUsers")) || [];
    usersArr = usersArr.sort(((a, b) => a.points - b.points)).toReversed().slice(0, 3);

    if (usersArr.length === 0) {
        const h2Card = document.createElement('h1');
        h2Card.innerText = `Sorry!! Nobody has played`;
        rankingUsersDiv.appendChild(h2Card);
    } else {
        usersArr.forEach((user, index) => {
            const card = document.createElement('div');
            card.setAttribute('id', `div${user.name}`);
            card.setAttribute('class', 'card');
            const cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');
            const h2Card = document.createElement('h2');
            h2Card.innerText = `${index+1}. ${user.name} whit ${user.points} points.`;
            card.appendChild(cardBody);
            cardBody.appendChild(h2Card);
            rankingUsersDiv.appendChild(card);
        })
    }
};

startButton.addEventListener('click', startQuiz);
nextBtnForm.addEventListener('click', nextAnswer);
restartBtn.addEventListener('click', () => {
    displayNone();
    homeDiv.classList.remove('d-none');
});
navLinkStats.addEventListener('click', () => {
    showChartAndRanking();
    displayNone();
    resultsDiv.classList.remove('d-none');
    canvasHolder.classList.remove('d-none');
});
navLinkContact.addEventListener('click', () => {
    displayNone();
    contactDiv.classList.remove('d-none');
});
titleQuizLink.addEventListener('click', () => {
    displayNone();
    homeDiv.classList.remove('d-none');
});
