import {
    elements
} from "./base";

export const renderNumbers = (number, quota, color) => {
    const markup = `
    <div class="numbers__item">
        <div class="numbers__num ball" style="border:10px solid ${color}" data-number="${number}" data-quota="${quota}" data-color="${color}">
            ${number}
        </div>
        <div class="numbers__tooltip">${quota}</div>
    </div>
    `;
    elements.numbersContainer.insertAdjacentHTML('beforeend', markup);
};

export const renderGameNumber = (number) => {
    const markup = `
    <div class="extracted-numbers__item ball ball-large" style="border:13px solid ${number.color}">${number.number}</div>
    `;
    elements.gameNumbersContainer.insertAdjacentHTML('beforeend', markup);
}

export const renderAlert = () => {
    const markup = `
            <div class="alert">
                Možete odigrati maksimalno 5 brojeva.
            </div>
            `;
    elements.popup.insertAdjacentHTML('beforeend', markup);
}

export const toggleActive = (elementClasses) => {
    elementClasses.toggle('active');
}

export const disableMakeTicketBtn = () => {
    elements.makeTicketBtn.classList.add('disabled');
}

export const enableMakeTicketBtn = () => {
    elements.makeTicketBtn.classList.remove('disabled');
}

export const disablePlayBtn = () => {
    elements.playBtn.classList.add('disabled');
}

export const toggleButtons = () => {
    elements.makeTicketBtn.classList.toggle('hidden');
    elements.playBtn.classList.toggle('hidden');
}

export const toggleLoading = () => {
    elements.loading.classList.toggle('hidden');
    elements.game.classList.toggle('hidden');
}