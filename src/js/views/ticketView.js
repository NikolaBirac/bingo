import {
    elements
} from "./base";

const createTicketNumber = (number) => `
<div class="ticket__item">${number}</div>
`;

export const createTicket = (numbers, quota) => {
    const markup = `
            <div class="ticket__box">
                <h4 class="ticket__title">Vaš tiket</h4>
                <div>
                    <div class="ticket__numbers">
                        ${numbers.map( num => createTicketNumber(num)).join('')}
                    </div>
                    <div>
                        <div class="ticket__text">
                            <p>Kvota:</p>
                            <p>${quota}</p>
                        </div>
                        <div class="ticket__text">
                            <p>Uplata:</p>
                            <form action="#">
                                <input type="text" class="ticket__input">
                            </form>
                        </div>
                        <div class="ticket__text">
                            <p>Dobitak:</p>
                            <p class="ticket__payout">0</p>
                        </div>
                    </div>
                    <div class="ticket__btn btn__add">DODAJ TIKET</div>
                </div>
            </div>
            `;
    elements.ticket.insertAdjacentHTML('beforeend', markup);
};

export const showTicket = () => {
    elements.ticket.style.display = "block";
}

export const destroyTicket = () => {
    elements.ticket.innerHTML = '';
    elements.ticket.style.display = "none";
}

export const removeCheckedNumbers = () => {
    elements.numbers.forEach(num => num.classList.remove("active"));
}

export const changePayout = (payout) => {
    elements.ticketPayout.innerHTML = payout;
}