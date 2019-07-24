export const elements = {
    numbersContainer: document.querySelector('.numbers'),
    // numbers: document.querySelectorAll('.numbers__item'),
    addTicket: document.querySelector('.btn__add'),
    play: document.querySelector('.btn__play')
};

export const createNumber = (number, quota, color) => {
    
    const markup = `
                <div class="numbers__item" style="background-color:${color}" data-number="${number}" data-quota="${quota}" data-color="${color}">${number}</div>
                `;
    elements.numbersContainer.insertAdjacentHTML('beforeend', markup);
};
