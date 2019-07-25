import "../sass/main.scss";
import {
    elements,
    setNumbersToElements,
    setTicketSelectorsToElements,
    createNumber,
    getTicketInput
} from "./views/base";
import * as ticketView from "./views/ticketView";
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
    const elementClasses = element.srcElement.classList;

    if (state.newTicket && state.newTicket.numbers.includes(number)) {
        elementClasses.toggle('active');
        const freshTicket = state.newTicket.numbers.filter(num => num !== number);
        state.newTicket.numbers = freshTicket;
        state.newTicket.quota = (state.newTicket.quota / quota).toFixed(2);
    } else {
        if (state.newTicket.numbers.length < 5) {
            elementClasses.toggle('active');
            state.newTicket.numbers.push(number);
            state.newTicket.quota = (state.newTicket.quota * quota).toFixed(2);
            console.log(state.newTicket);
            
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
        createNumber(i, quota, color);
    }
    setNumbersToElements();
    numbersEventListener();
}

window.addEventListener('load', createAllNumbers);



// NEW TICKET CONTROLLER //

const addTicketToAllTickets = () => {
    // let ticket = state.newTicket;
    // ticket = new Ticket(ticket.numbers, ticket.quota, ticket.payment, ticket.payout);
    // state.tickets.push(ticket);

    state.tickets.push(state.newTicket);

    elements.numbers.forEach(num => num.classList.remove("active"));

    console.log(state.tickets);

    state.newTicket = {
        numbers: [],
        quota: 1,
        payment: 0,
        payout: 0
    }
    elements.ticket.style.display = "none";
}

const changeTicketPayout = () => {
    state.newTicket.payment = getTicketInput();
    
    state.newTicket.payout = (state.newTicket.payment * state.newTicket.quota).toFixed(2);
    ticketView.changePayout(state.newTicket.payout);
}

const ticketEventListeners = () => {
    elements.ticketInput.addEventListener('input', changeTicketPayout);
    elements.addTicket.addEventListener('click', addTicketToAllTickets);
}

const makeTicket = () => {
    if (state.newTicket.numbers.length > 0) {
        elements.ticket.style.display = "block";
        ticketView.createTicket(state.newTicket.numbers, state.newTicket.quota);

        setTicketSelectorsToElements();
        ticketEventListeners();
    }
}

elements.makeTicket.addEventListener('click', makeTicket);