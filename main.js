(function() {

let addBtn = document.getElementById("add");
let dltBtn = document.getElementById("del");
let saveBtn = document.getElementById("save");
let closeBtn = document.getElementById("close");
let questionInput = document.getElementById("question");
let answerInput = document.getElementById("answer");



addBtn.addEventListener("click", () => {
    document.querySelector(".create_field").style.display = "block";
});

closeBtn.addEventListener("click", () => {
    document.querySelector(".create_field").style.display = "none";
});

dltBtn.addEventListener("click", () => {
    document.querySelectorAll('.card').forEach( n => n.remove() );
    localStorage.setItem('cards', JSON.stringify([]))
});

 initStore();
 initCards();

function initStore() {
    if (!localStorage.getItem('cards')) {
        localStorage.setItem('cards', JSON.stringify([]));
    }
};

function initCards() {
    JSON.parse(localStorage.getItem('cards')).forEach(card => {
        const divEl = createCardEl(card.question, card.answer, false);
        document.querySelector(".flashcards").appendChild(divEl);
    })
}

function createCardEl(question, answer, displayAnswer) {
    const questionEl = document.createElement("h2");
    const answerEl = document.createElement("h2");
    const divEl = document.createElement("div");
    const buttonEl = document.createElement("button");
    
    questionEl.className = 'usr_question';
    questionEl.innerText = question;
    answerEl.className = 'usr_answ';
    answerEl.innerText = answer;

    divEl.className = 'card';
    divEl.appendChild(buttonEl);
    divEl.appendChild(questionEl);
    divEl.appendChild(answerEl);
    divEl.addEventListener('click', () => toggleAnswer(answerEl));
    
    buttonEl.innerText = 'X'
    buttonEl.className = 'card_btn';
    buttonEl.addEventListener("click", () => removeCard(divEl, {question, answer}));
    return divEl;
};

function removeCard(divEl, card) {
    divEl.remove();
        const cardsArray = JSON.parse(localStorage.getItem('cards')).filter((item) => {
            return !(item.question === card.question && item.answer === card.answer);
        });
        localStorage.setItem('cards', JSON.stringify(cardsArray));
}

function toggleAnswer(answerEl) {
        answerEl.classList.toggle('visible');
}

function storeCard(card) {
    let cardsArray = JSON.parse(localStorage.getItem('cards'));
    cardsArray.push(card);
    localStorage.setItem('cards', JSON.stringify(cardsArray));
};

function createCard() {
    const card = {
        question: questionInput.value,
        answer: answerInput.value,
        displayAnswer: false
    }
    const div = createCardEl(card.question, card.answer, false);
    storeCard(card);
    div.className = 'flashcard';
    document.querySelector(".flashcards").appendChild(div);
    questionInput.value = '';
    answerInput.value = '';
}

saveBtn.addEventListener("click", createCard)
})()