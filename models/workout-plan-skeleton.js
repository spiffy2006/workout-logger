import { WorkoutIRL } from './workout-irl.js';
import { DateLogic } from '../services/date-logic.js';

export class SkeletonDay {
  constructor(title, workouts) {
    this.title = title;
    this.workouts = workouts.map((workout) => {
      if (workout.date) {
        return new WorkoutIRL()
          .setName(workout.name)
          .setDate(workout.date)
          .setSets(workout.sets);
        return
      } else {
        return new WorkoutIRL().setName(workout.name);
      }
    });
  }
}

export class WorkoutPlanSkeleton {
  constructor(plan) {
    this.name = plan.name;
    this.length = plan.length;
    this.level = plan.level;
    this.goal = plan.goal;
    this.weeks = [];
    this.dateLogic = new DateLogic();
    this.currentWeek = 0; // index of the current week user is on in the plan
    this.currentDay = this.dateLogic.getDayOfWeek().toLocaleLowerCase();
    this.currentWorkout = 0; // index of the current workout user is on in the plan
    this.processWeeks(plan.weeks);
  }

  processWeeks(weeks) {
    weeks.forEach((week) => {
      this.processWeek(week);
    });
  }

  processWeek(week) {
    let skeletonWeek = {};
    Object.keys(week).forEach((day) => {
      skeletonWeek[day] = new SkeletonDay(week[day].title, week[day].workouts);
    });
    this.weeks.push(skeletonWeek);
  }

  getDay() {
    return this.weeks[this.currentWeek][this.currentDay];
  }

  setDay(day) {
    this.weeks[this.currentWeek][this.currentDay] = day;
    return this;
  }

  /**
   * Sets the workout for the current day
   * @param {*} workout 
   */
  setWorkout(workout) {
    this.weeks[this.currentWeek][this.currentDay].workouts[this.currentWorkout] = workout;
  }

  getCurrentWorkout(day) {
    for (let i = 0; i < day.workouts.length; i++) {
      if (!day.workouts[i].date) {
        this.currentWorkout = i;
        return day.workouts[i].setDate();
      }
    }

    return null;
  }

  startWorkout() {
    // figure out what day it is of the week and start with the first workout of that day
  }
}