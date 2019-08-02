import { elements } from "./base";

const renderNumber = (number) => `
    <div class="ball" style="border:10px solid ${number.color}">${number.number}</div>
`;

export const renderPlayedTicket = (ticket) => {
    const markup = `
            <div class="tickets__item" id="${ticket.id}">
                <div class="tickets__numbers">
                    ${ticket.numbers.map( num => renderNumber(num)).join('')}
                </div>
                <div>
                    <p><span class="tickets__sign"></span> ${ticket.payout}</p>
                </div>
            </div>
            `;
    elements.tickets.insertAdjacentHTML('beforeend', markup);
}

export const winningTicket = (id) => {
    const winTicket = document.getElementById(id);
    winTicket.classList.add('win');
    const plus = document.querySelector(`#${CSS.escape(id)} .tickets__sign`);
    plus.innerHTML = '+';
}

export const failTicket = (id) => {
    const failTicket = document.getElementById(id);
    failTicket.classList.add('fail');
}

export const renderPayout = (payout) => {
    const markup = `
        <div class="payout">
            <h4 class="payout__title">Dobitak</h4>
            <p class="payout__text">${payout}</p>
        </div>
    `;
    elements.popup.insertAdjacentHTML('beforeend', markup);
}