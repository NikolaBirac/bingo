export const elements = {
    numbersContainer: document.querySelector('.numbers'),
    backgroundImage: document.querySelector('.background-image'),
    makeTicketBtn: document.querySelector('.btn__make'),
    playBtn: document.querySelector('.btn__play'),
    popup: document.querySelector('.popup'),
    tickets: document.querySelector('.tickets'),
    gameNumbersContainer: document.querySelector('.extracted-numbers'),
    loading: document.querySelector('.lds-ring'),
    game: document.querySelector('.game')
};

export const setNumbersToElements = () => {
    elements.numbers = document.querySelectorAll('.numbers__num');
}

export const setTicketSelectorsToElements = () => {
    elements.ticketInput = document.querySelector('.ticket__input');
    elements.ticketPayout = document.querySelector('.ticket__payout');
    elements.addTicketBtn = document.querySelector('.btn__add');
}