import "../sass/main.scss";

import {
    elements,
    setNumbersToElements,
    setTicketSelectorsToElements
} from "./views/base";
import * as numbersView from "./views/numbersView";
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
    tickets: [],
    payout: 0
};

const makeTicketBtnUsability = () => {
    if (state.newTicket.numbers.length === 0) {
        numbersView.disableMakeTicketBtn();
    } else {
        numbersView.enableMakeTicketBtn();
    }
}

const addNumberToTicket = (element) => {
    const number = +element.target.dataset.number;
    const quota = +element.target.dataset.quota;
    const color = element.target.dataset.color;
    const elementClasses = element.srcElement.classList;

    if (state.newTicket && element.target.matches('.active')) {
        numbersView.toggleActive(elementClasses)
        state.newTicket.numbers = state.newTicket.numbers.filter(num => num.number !== number);
        state.newTicket.quota = (state.newTicket.quota / quota).toFixed(2);
    } else {
        if (state.newTicket.numbers.length < 5) {
            numbersView.toggleActive(elementClasses)
            state.newTicket.numbers.push({
                number,
                color
            });
            state.newTicket.quota = (state.newTicket.quota * quota).toFixed(2);
        } else {
            ticketView.showTicket();
            numbersView.renderAlert();
        }
    }
    makeTicketBtnUsability();
}

const numbersEventListener = () => {
    elements.numbers.forEach(num => num.addEventListener('click', e => {
        addNumberToTicket(e);
    }));
};

const generateQuotaAndColor = () => {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    const color = `rgb(${r},${g},${b})`;
    const quota = (Math.random() * 3 + 2).toFixed(2);
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
        numbersView.renderNumbers(i, quota, color);
    }
    numbersView.toggleLoading();
    setNumbersToElements();
    numbersEventListener();
    numbersView.disableMakeTicketBtn();
}

window.addEventListener('load', createAllNumbers);
elements.popup.addEventListener('click', (e) => {
    e.target.matches('.popup') ? ticketView.destroyTicket() : '';
});

// NEW TICKET CONTROLLER //

const refreshState = () => {
    state.newTicket = {
        numbers: [],
        quota: 1,
        payment: 0,
        payout: 0
    }
}

const addTicket = () => {
    let ticket = state.newTicket;
    const id = (Math.random() * (29000 - 1) + 1).toFixed(0);
    ticket = new Ticket(id, ticket.numbers, ticket.quota, ticket.payment, ticket.payout);
    state.tickets.push(ticket);

    ticketView.removeCheckedNumbers();
    playedTicketView.renderPlayedTicket(ticket);

    state.tickets.length === 5 ? numbersView.toggleButtons() : '';

    refreshState();
    makeTicketBtnUsability();
    ticketView.destroyTicket();
}

const changeTicketPayout = (e) => {
    const regex = /[^0-9]/gi;
    e.target.value = e.target.value.replace(regex, '');

    if (e.target.value != '') {
        ticketView.enableAddTicketBtn();
        elements.addTicketBtn.addEventListener('click', addTicket);
        state.newTicket.payment = e.target.value;
        state.newTicket.payout = (state.newTicket.payment * state.newTicket.quota).toFixed(2);
        ticketView.changePayout(state.newTicket.payout);
    } else {
        ticketView.disableAddTicketBtn();
        elements.addTicketBtn.removeEventListener('click', addTicket);
    }
}

const ticketEventListeners = () => {
    elements.ticketInput.addEventListener('input', changeTicketPayout);
}

const makeTicket = () => {
    if (state.newTicket.numbers.length > 0) {
        ticketView.showTicket();
        ticketView.createTicket(state.newTicket.numbers, state.newTicket.quota);

        setTicketSelectorsToElements();
        elements.ticketInput.focus();
        ticketEventListeners();
    }
}

elements.makeTicketBtn.addEventListener('click', makeTicket);


// PLAY GAME CONTROLLER //

const ticketsSuccess = () => {
    const tickets = state.tickets;

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].count === tickets[i].numbers.length) {
            playedTicketView.winningTicket(tickets[i].id);
            state.payout += +tickets[i].payout;
        } else {
            playedTicketView.failTicket(tickets[i].id);
        }
    }
}

const countAffectedNumbers = (num) => {
    const tickets = state.tickets;

    for (let i = 0; i < tickets.length; i++) {
        for (let j = 0; j < tickets[i].numbers.length; j++) {
            if (tickets[i].numbers[j].number === num.number) {
                tickets[i].count++;
            }
        }
    }
}

const runGame = () => {
    const position = [];
    for (let i = 1; i <= 12; i++) {
        const random = (Math.random() * 29).toFixed(0);
        if (position.includes(random)) {
            i--;
        } else {
            position.push(random);

            setTimeout(() => {
                numbersView.renderGameNumber(state.allNumbers[random]);
                countAffectedNumbers(state.allNumbers[random]);
            }, i * 2000);
        }
    }

    setTimeout(() => {
        ticketsSuccess();
    }, 26000);

    setTimeout(() => {
        ticketView.showTicket();
        playedTicketView.renderPayout((state.payout));
    }, 29000);

    elements.playBtn.removeEventListener('click', runGame);
    numbersView.disablePlayBtn();
    elements.numbers.forEach(num => num.removeEventListener('click', addNumberToTicket));
}

elements.playBtn.addEventListener('click', runGame);