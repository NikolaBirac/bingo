import "../sass/main.scss";
import {
    elements,
    setNumbersToElements,
    setTicketSelectorsToElements,
    renderNumbers,
    toggleButtons,
    renderGameNumber,
    toggleLoading,
    toggleActive,
    disableMakeTicketBtn,
    enableMakeTicketBtn
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
    tickets: [],
    payout: 0
};

const makeTicketBtnUsability = () => {
    if (state.newTicket.numbers.length === 0) {
        disableMakeTicketBtn();
    } else {
        enableMakeTicketBtn();
    }
}

const addNumberToTicket = (element) => {
    const number = +element.target.dataset.number;
    const quota = +element.target.dataset.quota;
    const color = element.target.dataset.color;
    const elementClasses = element.srcElement.classList;

    if (state.newTicket && element.target.matches('.active')) {
        toggleActive(elementClasses)
        state.newTicket.numbers = state.newTicket.numbers.filter(num => num.number !== number);
        state.newTicket.quota = (state.newTicket.quota / quota).toFixed(2);
    } else {
        if (state.newTicket.numbers.length < 5) {
            toggleActive(elementClasses)
            state.newTicket.numbers.push({
                number,
                color
            });
            state.newTicket.quota = (state.newTicket.quota * quota).toFixed(2);
        } else {
            alert("Maximalan broj izabranih brojeva je 5.");
        }
    }
    makeTicketBtnUsability();
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
        renderNumbers(i, quota, color);
    }
    toggleLoading();
    setNumbersToElements();
    numbersEventListener();
    disableMakeTicketBtn();
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
        addNumberToTicket(e); //??
    }));
    toggleButtons();
}

const addTicket = () => {
    let ticket = state.newTicket;
    const id = (Math.random() * (29000 - 1) + 1).toFixed(0);
    ticket = new Ticket(id, ticket.numbers, ticket.quota, ticket.payment, ticket.payout);
    state.tickets.push(ticket);

    ticketView.removeCheckedNumbers();
    playedTicketView.renderPlayedTicket(ticket);

    state.tickets.length === 5 ? disableMakeNewTicket() : ''; //?

    ticketView.destroyTicket();
    refreshState();
    makeTicketBtnUsability();
}

const changeTicketPayout = (e) => {
    const regex = /[^0-9]/gi;
    e.target.value = e.target.value.replace(regex, '');

    if (e.target.value != '') {
        state.newTicket.payment = e.target.value;
        state.newTicket.payout = (state.newTicket.payment * state.newTicket.quota).toFixed(2);
        ticketView.changePayout(state.newTicket.payout);
    }
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
        elements.ticketInput.focus(); //prebaci u view
        ticketEventListeners();
    } // disejblu btn
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
                renderGameNumber(state.allNumbers[random]);
                countAffectedNumbers(state.allNumbers[random]);
            }, i * 200);
        }
    }

    setTimeout(() => {
        ticketsSuccess();
    }, 2400);
}

elements.playBtn.addEventListener('click', runGame);


// odigraj btn disejbl kada je vec odigrano