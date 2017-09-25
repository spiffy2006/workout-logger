export class Set {
  constructor(reps, weight, restTime) {
    this.reps = reps || '0';
    this.weight = weight || '0';
    this.restTime = restTime || '0'; // seconds
  }
}

// make classes that translate async data into their actual class data

export class WorkoutIRL { // make date service to abstract date things
  constructor() {
    this.date = ''; // js Date
    this.dayOfWeek = '';
    this.name = ''; // name of workout
    this.sets = []; // Array<Set>
  }

  setDate(date) {
    if (date) {
      this.date = new Date(date);
    } else {
      this.date = new Date();
    }
    this.dayOfWeek = this.getDayOfWeek();
    return this;
  }

  getDate() {
    return this.date;
  }

  getDayOfWeek() {
    return this.dayOfWeek;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  getName() {
    return this.name;
  }

  getDayOfWeek() {
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekDays[this.date.getDay()];
  }

  addSet(set) {
    if (set.constructor === Set) {
      this.sets.push(set);
    }
    return this;
  }

  setSets(sets) {
    sets.forEach((set) => {
      this.addSet(new Set(set.reps, set.weight, set.restTime));
    });
    return this;
  }

  getSets() {
    return this.sets;
  }
}