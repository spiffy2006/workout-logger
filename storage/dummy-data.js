import { Day, Week, WorkoutPlan, MUSCLES, FITNESS_LEVELS, LENGTHS } from '../models/workout-plan.js';
import WorkoutModel, { Workout, STRENGTH, MUSCLE, TONING, TRAINING_TYPES, SETS } from '../models/workout.js';

export class DummyData {
  constructor() {
    this.workouts = this.generateWorkouts();
    this.workoutPlans = this.generateWorkoutPlans();
  }

  getWorkouts() {
    return this.workouts;
  }

  generateWorkouts() {
    if (this.workouts) {
      return this.workouts;
    }
  
    let workoutNames = ['Barbell Squat', 'Barbell Bench Press', 'Hack Slide Squat', 'Calf Extension', 'Leg Extension', 'Barbell Curls', 'Tricep Extension', 'Leg Curls', 'Lateral Pulldown', 'Barbell Shrugs'];
    let workouts = {};

    workoutNames.forEach((workout) => {
      workouts[workout] = this.getRandomWorkout(workout);
    });

    return workouts;
  }

  getRandomWorkout(name) {
    return new Workout(name, this.getTrainingType(), this.getRepRange(), this.getTargetAreas(), this.getSets(), this.getTimeBetweenSets(), this.getIsBodyWeight(), this.getIncreaseWeightBy());
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getTrainingType() {
    let i = this.getRandomNumber(0, TRAINING_TYPES.length);

    return TRAINING_TYPES[i];
  }

  getRepRange() {
    let i = this.getRandomNumber(0, 3);
    
    switch(i) {
      case 0:
        return MUSCLE;
      case 1:
        return TONING;
      case 2:
        return STRENGTH;
    }
  }

  getTargetAreas() {
    let numAreas = this.getRandomNumber(1, 4),
        numMuscles = MUSCLES.length,
        i = 0,
        areas = [];

    while(i < numAreas) {
      areas.push(MUSCLES[this.getRandomNumber(0, numMuscles)]);
      i++;
    }

    return areas;
  }

  getSets() {
    let i = this.getRandomNumber(0, SETS.length);

    return SETS[i];
  }

  getTimeBetweenSets() {
    let i = this.getRandomNumber(0, 4);

    switch(i) {
      case 0:
        return "30";
      case 1:
        return "90";
      case 2:
        return "120";
      case 3:
        return "300";
    }
  }

  getIsBodyWeight() {
    return this.getRandomBoolean();
  }

  getRandomBoolean() {
    return Math.random() >= .5;
  }

  getIncreaseWeightBy() {
    let i = this.getRandomNumber(0, 4);

    switch(i) {
      case 0:
        return "5";
      case 1:
        return "10";
      case 2:
        return "15";
      case 3:
        return "20";
    }
  }

  getPlans() {
    return this.workoutPlans;
  }

  generateWorkoutPlans() {
    let workoutPlanNames = ['Legs 4 Dayz', 'Chestercize', 'Back Blaster', 'Monster Arms', 'Strong as an Ox', 'Death to Ming', 'Towering Traps'];
    let plans = {};

    workoutPlanNames.forEach((name) => {
      plans[name] = this.generateWorkoutPlan(name);
    });

    return plans;
  }

  generateWorkoutPlan(name) {
    return new WorkoutPlan(name, this.getGoal(), this.getLevel(), this.getLength(), this.getWeeks());
  }

  getGoal() {
    return 'Generic Goal';
  }

  getLevel() {
    let level = {from: '', to: ''};
    let numLevels = FITNESS_LEVELS.length;

    if (this.getRandomBoolean()) {
      level.from = FITNESS_LEVELS[this.getRandomNumber(0, numLevels)]
    } else {
      level = {
        from: FITNESS_LEVELS[this.getRandomNumber(0, numLevels)],
        to: FITNESS_LEVELS[this.getRandomNumber(0, numLevels)]
      };
    }

    return level;
  }

  getLength() {
    let i = this.getRandomNumber(0, 5);

    switch(i) {
      case 0:
        return "2";
      case 1:
        return "3";
      case 2:
        return "4";
      case 3:
        return "6";
      case 4:
        return "12";
    }
  }

  getWeek() {
    return new Week(
      this.getDay('Sunday'),
      this.getDay('Monday'),
      this.getDay('Tuesday'),
      this.getDay('Wednesday'),
      this.getDay('Thursday'),
      this.getDay('Friday'),
      this.getDay('Saturday')
    );
  }

  getDay(title) {
    return new Day(title, this.getWorkoutsForDay());
  }

  getWorkoutsForDay() {
    if (Math.random() >= .80) {
      return [];
    }

    let numWorkouts = this.getRandomNumber(4, 7);
    let workouts = Object.values(this.generateWorkouts());
    let numOfWorkouts = workouts.length;
    let day = [];
    let i = 0;

    while(i <= numWorkouts) {
      day.push(workouts[this.getRandomNumber(0, numOfWorkouts)]);
      i++;
    }

    return day;
  }

  getWeeks() {
    let weeks = [];
    let num = this.getRandomNumber(2, 12);
    let i = 0;

    while(i <= num) {
      weeks.push(this.getWeek());
      i++;
    }

    return weeks;
  }
}