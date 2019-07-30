export default class Ticket {
    constructor(id, numbers, quota, payment, payout) {
        this.id = id;
        this.numbers = numbers;
        this.quota = quota;
        this.payment = payment;
        this.payout = payout;
        this.count = 0;
    }
}