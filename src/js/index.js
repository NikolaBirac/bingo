import "../sass/main.scss";
import {
    elements,
    createNumber
} from "./views/base";

const state = {
    allNumbers: [],
    newTicket: {
        numbers: [],
        quota: 1,
        payment: 0
    },
    tickets: []
};


const addNumberToTicket = (element) => {
    const number = +element.target.dataset.number;
    const quota = +element.target.dataset.quota;
    const elementClasses = element.srcElement.classList;

    if (state.newTicket.numbers.includes(number)) {
        elementClasses.toggle('active');
        const freshTicket = state.newTicket.numbers.filter(num => num !== number);
        state.newTicket.numbers = freshTicket;
        state.newTicket.quota = (state.newTicket.quota / quota).toFixed(2);
    } else {
        if (state.newTicket.numbers.length < 5) {
            elementClasses.toggle('active');
            state.newTicket.numbers.push(number);
            state.newTicket.quota = (state.newTicket.quota * quota).toFixed(2);
        } else {
            alert("Maximalan broj izabranih brojeva je 5.");
        }
    }
    // toElement.innerText
}

const numbersEventListener = () => {
    elements.numbers.forEach(num => num.addEventListener('click', e => {
        e.preventDefault();
        addNumberToTicket(e);
    }));
};

const generateQuotaAndColor = () => {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    const color = `rgb(${r},${g},${b})`;
    const quota = (Math.random() * (5 - 2) + 2).toFixed(2);
    return [color, quota];
}

window.addEventListener('load', () => {
    for (let i = 1; i <= 30; i++) {
        const [color, quota] = generateQuotaAndColor();

        state.allNumbers.push({
            number: i,
            quota,
            color
        })
        createNumber(i, quota, color);
    }
    elements.numbers = document.querySelectorAll('.numbers__item');
    numbersEventListener();
});


// funkcija koja dodaje tiket u state prtiskom na add btn
//funkcija koja vraca newTicket na [] kada se tiket doda