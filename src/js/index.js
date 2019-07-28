import "../sass/main.scss";
import {
    elements,
    setNumbersToElements,
    setTicketSelectorsToElements,
    renderNumber,
    getTicketInput,
    toggleButtons
} from "./views/base";
import * as ticketView from "./views/ticketView";
import * as playedTicketView from "./views/playedTicketView";
import Ticket from "./models/Ticket";


const state = {
    allNumbers: [],
    newTicket: {
        numbers: [],
        quota: 1,
        payment: 0,
        payout: 0
    },
    tickets: []
};


const addNumberToTicket = (element) => {
    const number = +element.target.dataset.number;
    const quota = +element.target.dataset.quota;
    const color = element.target.dataset.color;
    const elementClasses = element.srcElement.classList;

    if (state.newTicket && element.target.matches('.active')) {
        elementClasses.toggle('active');
        const freshTicket = state.newTicket.numbers.filter(num => num.number !== number);
        state.newTicket.numbers = freshTicket;
        state.newTicket.quota = (state.newTicket.quota / quota).toFixed(2);
    } else {
        if (state.newTicket.numbers.length < 5) {
            elementClasses.toggle('active');
            state.newTicket.numbers.push({
                number,
                color
            });
            state.newTicket.quota = (state.newTicket.quota * quota).toFixed(2);
        } else {
            alert("Maximalan broj izabranih brojeva je 5.");
        }
    }
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

const createAllNumbers = () => {
    for (let i = 1; i <= 30; i++) {
        const [color, quota] = generateQuotaAndColor();
        state.allNumbers.push({
            number: i,
            quota,
            color
        });
        renderNumber(i, quota, color);
    }
    setNumbersToElements();
    numbersEventListener();
}

window.addEventListener('load', createAllNumbers);



// NEW TICKET CONTROLLER //

const refreshState = () => {
    state.newTicket = {
        numbers: [],
        quota: 1,
        payment: 0,
        payout: 0
    }
}

const disableMakeNewTicket = () => {
    elements.numbers.forEach(num => num.addEventListener('click', e => {
        addNumberToTicket(e);
    }));
    toggleButtons();
}

const addTicket = () => {
    let ticket = state.newTicket;
    ticket = new Ticket(ticket.numbers, ticket.quota, ticket.payment, ticket.payout);
    state.tickets.push(ticket);

    ticketView.removeCheckedNumbers();
    playedTicketView.renderPlayedTicket(ticket);

    state.tickets.length === 5 ? disableMakeNewTicket() : '';

    ticketView.destroyTicket();
    refreshState();
}

const changeTicketPayout = () => {
    state.newTicket.payment = getTicketInput();
    state.newTicket.payout = (state.newTicket.payment * state.newTicket.quota).toFixed(2);
    ticketView.changePayout(state.newTicket.payout);
}

const ticketEventListeners = () => {
    elements.ticketInput.addEventListener('input', changeTicketPayout);
    elements.addTicketBtn.addEventListener('click', addTicket);
}

const makeTicket = () => {
    if (state.newTicket.numbers.length > 0) {
        ticketView.showTicket();
        ticketView.createTicket(state.newTicket.numbers, state.newTicket.quota);

        setTicketSelectorsToElements();
        ticketEventListeners();
    }
}

elements.makeTicketBtn.addEventListener('click', makeTicket);