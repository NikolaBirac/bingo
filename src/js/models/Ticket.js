export default class Ticket {
    constructor(numbers, quota, payment, payout) {
        this.numbers = numbers;
        this.quota = quota;
        this.payment = payment;
        this.payout = payout;
        this.count = 0;
    }
}