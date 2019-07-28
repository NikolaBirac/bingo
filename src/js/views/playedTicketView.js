import { elements } from "./base";

const renderNumber = (number) => `
<div class="tickets__num" style="background-color:${number.color}">${number.number}</div>
`;

export const renderPlayedTicket = (ticket) => {
    const markup = `
            <div class="tickets__item">
                <div class="tickets__numbers">
                    ${ticket.numbers.map( num => renderNumber(num)).join('')}
                </div>
                <div>
                    <p><span class="tickets__sign">+</span> ${ticket.payment}</p>
                </div>
            </div>
            `;
    elements.tickets.insertAdjacentHTML('beforeend', markup);
}