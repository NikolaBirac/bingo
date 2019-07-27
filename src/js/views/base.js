export const elements = {
    numbersContainer: document.querySelector('.numbers'),
    makeTicket: document.querySelector('.btn__make'),
    play: document.querySelector('.btn__play'),
    ticket: document.querySelector('.ticket'),
    tickets: document.querySelector('.tickets'),
};

export const setNumbersToElements = () => {
    elements.numbers = document.querySelectorAll('.numbers__item');    
}

export const setTicketSelectorsToElements = () => {
    elements.ticketInput = document.querySelector('.ticket__input');
    elements.ticketPayout = document.querySelector('.ticket__payout');
    elements.addTicket = document.querySelector('.btn__add');    
}

export const getTicketInput = () => elements.ticketInput.value;

export const createNumber = (number, quota, color) => {
    const markup = `
                <div class="numbers__item" style="background-color:${color}" data-number="${number}" data-quota="${quota}" data-color="${color}">${number}</div>
                `;
    elements.numbersContainer.insertAdjacentHTML('beforeend', markup);
};

