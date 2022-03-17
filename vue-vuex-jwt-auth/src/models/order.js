export default class Order {
  constructor(cost, status_order, user, cleaner, service, date, description) {
    this.cost = cost;
    this.status_order = status_order;
    this.user = user;
    this.cleaner = cleaner;
    this.service = service;
    this.date = date;
    this.description = description;
  }
}
