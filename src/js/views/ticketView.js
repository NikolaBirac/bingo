import {
    elements
} from "./base";

const createTicketNumber = (number) => `
<div class="ball" style="border:10px solid ${number.color}">${number.number}</div>
`;

export const createTicket = (numbers, quota) => {
    const markup = `
            <div class="ticket">
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
                    <div class="btn btn__small btn__add disabled">DODAJ TIKET</div>
                </div>
            </div>
            `;
    elements.popup.insertAdjacentHTML('beforeend', markup);
};

export const changePayout = (payout) => {
    const formatPayout = payout.replace(/\d(?=(\d{3})+\.)/g, '$&,');
    elements.ticketPayout.innerHTML = formatPayout;
}

export const disableAddTicketBtn = () => {
    elements.addTicketBtn.classList.add('disabled'); 
}

export const enableAddTicketBtn = () => {
    elements.addTicketBtn.classList.remove('disabled');    
}

export const showTicket = () => {
    elements.popup.style.display = "block";
    elements.backgroundImage.classList.add('blur');
}

export const destroyTicket = () => {
    elements.popup.innerHTML = '';
    elements.popup.style.display = "none";
    elements.backgroundImage.classList.remove('blur');
}

export const removeCheckedNumbers = () => {
    elements.numbers.forEach(num => num.classList.remove("active"));
}