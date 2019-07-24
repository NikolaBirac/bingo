export const elements = {
    numbersContainer: document.querySelector('.numbers'),
    // numbers: document.querySelectorAll('.numbers__item'),
    makeTicket: document.querySelector('.btn__make'),
    addTicket: document.querySelector('.btn__add'),
    play: document.querySelector('.btn__play'),
    ticket: document.querySelector('.ticket'),
};

export const createNumber = (number, quota, color) => {
    
    const markup = `
                <div class="numbers__item" style="background-color:${color}" data-number="${number}" data-quota="${quota}" data-color="${color}">${number}</div>
                `;
    elements.numbersContainer.insertAdjacentHTML('beforeend', markup);
};

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
                                <p class="ticket__payment">25598</p>
                            </div>
                        </div>
                        <div class="ticket__btn btn__add">DODAJ TIKET</div>
                    </div>
                </div>
                `;
    elements.ticket.insertAdjacentHTML('beforeend', markup);
};
