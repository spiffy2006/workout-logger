// TODO depending on the type of training model assign target reps OR do custom amount of reps
import { Workout } from './workout.js';

// https://www.bodybuilding.com/exercises/
export const MUSCLES = [
  "Neck",
  "Traps (trapezius)",
  "Shoulders (deltoids)",
  "Chest (pectoralis)",
  "Biceps (biceps brachii)",
  "Forearm (brachioradialis)",
  "Abs (rectus abdominis)",
  "Quads (quadriceps)",
  "Calves (gastrocnemius)",
  "Triceps (triceps brachii)",
  "Lats (latissimus dorsi)",
  "Middle Back (rhomboids)",
  "Lower Back",
  "Glutes (gluteus maximus and medius)",
  "Hamstrings (biceps femoris)"
];

export const FITNESS_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const LENGTHS = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52"];

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

export class Day { // default as rest day
  constructor(title, workouts) { // workouts = Array<Workout>
    this.title = title || '';
    this.workouts = workouts || [];
    this.deriveTargetAreasFromWorkouts();
  }

  deriveTargetAreasFromWorkouts() {
    let areas = [],
        deduped = [];
    this.workouts.forEach((workout) => {
      areas = areas.concat(workout.targetAreas)
    });
    areas.forEach((area) => {
      if (deduped.indexOf(area) === -1) {
        deduped.push(area);
      }
    });

    this.targetAreas = deduped;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  add(workout) {
    // if (workout.constructor === Workout) { // this would be ideal, but it is loaded from async...so I would have to loop through and instantiate all of the workouts...
      this.workouts.push(workout);
      this.deriveTargetAreasFromWorkouts();
    // }
    return this;
  }

  remove(workout) {
    this.workouts = this.workouts.filter((w => workout.name !== w.name));
    this.deriveTargetAreasFromWorkouts();
    return this;
  }
}

export class WorkoutPlan {
  constructor(name, goal, level, length, weeks) {
    this.name = name || '';
    this.goal = goal || '';
    this.level = level || {from: '', to: ''};
    this.length = length || '';
    this.weeks = weeks || []; // Array<Week>
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setGoal(goal) {
    this.goal = goal;
    return this;
  }

  setLevelFrom(from) {
    if (FITNESS_LEVELS.indexOf(from) > -1) {
      this.level.from = from;
    }
    return this;
  }

  setLevelTo(to) {
    if (FITNESS_LEVELS.indexOf(to) > -1) {
      this.level.to = to;
    }
    return this;
  }

  setLevel(from, to) {
    let level = {from: '', to: ''};
    if (FITNESS_LEVELS.indexOf(from) > -1) {
      level.from = from;
    }
    if (FITNESS_LEVELS.indexOf(to) > -1) {
      level.to = to;
    }
    this.level = level;
    return this;
  }

  setLength(length) {
    if (LENGTHS.indexOf(length) > -1) {
      this.length = length;
    }
    return this;
  }

  fillWeeks() {
    let originalWeeks = JSON.parse(JSON.stringify(this.weeks));
    if (this.weeks.length !== this.length) {
      while (this.weeks.length <= this.length) {
        this.weeks.concat(originalWeeks);
      }
      this.weeks.splice((this.length - 1)); // because zero index and all
    }
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
FUZZY SEARCH OBJECT
 (obj) => { return JSON.stringify(Object.values(obj)).replace(/[^a-zA-Z0-9]/g, ' ').split(' ').filter(function(word) { return !!word.trim(); }).join(' ') }

  overall info for plan
    - name
    - goal
    - fitness level (beginner, intermediate, advanced) single or range
    - length  ** if length is greater than number of weeks added when saved it will loop the weeks already generated until the length of weeks for the plan

  Plan overview
    - top of page has buttons for each week of the plan
    - week calendar (https://www.bodybuilding.com/images/2016/august/shortcut-to-size-sale-page-calendar-2.jpg)
    - each day has target areas (multiple select) and lists them in the calendar view
    - UI example -- accordion
      weeks (1) (2) (3) (etc)
      _______________________
      Day 1 (Chesticles)
      | Chest, Triceps, Abs
      _______________________
      Day 2 (Backness Everdene)
      | Back, Biceps, Abs
      _______________________
      ...Scrollable

  Plan view
    - Title
    - List of workouts: {name}:{sets} of {rep range}
*/

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