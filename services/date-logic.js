export class DateLogic {
  constructor() {
    this.date = new Date();
    this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  getDayOfWeek() {
    return this.weekDays[this.date.getDay()];
  }
}