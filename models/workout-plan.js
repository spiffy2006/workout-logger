// TODO depending on the type of training model assign target reps OR do custom amount of reps
import { Workout } from './workout.js';

export class Week {
  constructor(sunday, monday, tuesday, wednesday, thursday, friday, saturday) { // *day = Day
    this.sunday = sunday || new Day();
    this.monday = monday || new Day();
    this.tuesday = tuesday || new Day();
    this.wednesday = wednesday || new Day();
    this.thursday = thursday || new Day();
    this.friday = friday || new Day();
    this.saturday = saturday || new Day();
  }

  setDay(dayOfWeek, dayta) { // get it? dayta: It is the data for that day. I'm hilarious
    if (this.hasOwnProperty(dayOfWeek) && dayta.constructor === Day) {
      this[dayOfWeek] = dayta;
    }
    return this;
  }

  removeDay(dayOfWeek) {
    if (this.hasOwnProperty(dayOfWeek)) {
      this[dayOfWeek] = new Week();
    }
    return this;
  }
}

export class Day {
  constructor(title, workouts) { // workouts = Array<Workout>
    this.title = title || '';
    this.workouts = workouts || [];
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  add(workout) {
    // if (workout.constructor === Workout) { // this would be ideal, but it is loaded from async...so I would have to loop through and instantiate all of the workouts...
      this.workouts.push(workout);
    // }
    return this;
  }

  remove(workout) {
    this.workouts = this.workouts.filter((w => workout.name !== w.name));
    return this;
  }
}

export class WorkoutPlan {
  constructor(name, weeks) {
    this.name = name || '';
    this.weeks = weeks || []; // Array<Week>
  }

  setName(name) {
    this.name = name;
    return this;
  }

  update(week, weekIndex) {
    if (week.constructor === Week) {
      if (this.weeks[weekIndex]) {
        this.weeks[weekIndex] = week;
      } else {
        this.weeks.push(week);
      }
    }
    return this;
  }

  add(week) {
    if (week.constructor === Week) {
      this.weeks.push(week);
    }
    return this;
  }

  remove(week) {
    this.weeks = this.weeks.filter(w => JSON.stringify(week) !== JSON.stringify(w));
    return this;
  }
}

/*
{
  sunday: [], Array<Workout>
  monday: [], Array<Workout>
  tuesday: [], Array<Workout>
  wednesday: [], Array<Workout>
  thursday: [], Array<Workout>
  friday: [], Array<Workout>
  saturday: [] Array<Workout>
}
*/