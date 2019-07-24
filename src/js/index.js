import "../sass/main.scss";
import {
    elements,
    createNumber
} from "./views/base";

const state = {
    allNumbers: [],
    newTicket: {},
    tickets: []
};

// {
//     tickets: [],  niz objekata
//     newTicket: { numbers: [2,3,4],
//                    kvota: 8.56,
//                  uplata: 200,
//                }
// }

const addNumberToTicket = (element) => {
    const number = +element.toElement.innerText;
    const elementClasses = element.srcElement.classList;

    if (!state.newTicket.numbers) {
        state.newTicket.numbers = [number];
        elementClasses.toggle('checked');
    } else {
        if (element.target.matches('.checked')) {
            elementClasses.toggle('checked');
            let freshTicket = state.newTicket.numbers.filter(num => num !== number);
            state.newTicket.numbers = freshTicket;
            console.log(state.newTicket.numbers);
        } else {
            if (state.newTicket.numbers.length < 5) {
                elementClasses.toggle('checked');
                state.newTicket.numbers.push(number);
                console.log(state.newTicket.numbers);
            }
        }
    }

    // console.log(event.target.dataset);   state.newTicket.numbers && state.newTicket.numbers.length <5 
    // console.log(event.srcElement.classList); toElement.innerText

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
    const quota = (Math.random() * (5 - 2) + 2).toFixed(2);

    return [color, quota];
}

window.addEventListener('load', () => {

    for (let i = 1; i <= 30; i++) {
        const [color, quota] = generateQuotaAndColor();

        state.allNumbers.push({
            number: i,
            qouta: quota,
            color: color
        })
        createNumber(i, quota, color);
    }

    elements.numbers = document.querySelectorAll('.numbers__item');
    numbersEventListener();
});


// funkcija koja dodaje tiket u state prtiskom na add btn
//funkcija koja vraca newTicket na [] kada se tiket doda