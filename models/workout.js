// TODO depending on the type of training model assign target reps OR do custom amount of reps

import Range from  './range.js';

export const STRENGTH = {from: 3, to: 6};
export const MUSCLE = {from: 8, to: 12};
export const TONING = {from: 15, to: 20};
export const TRAINING_TYPES = [
  {title: 'Strength', value: 'strength'},
  {title: 'Muscle Mass', value: 'muscle'},
  {title: 'Toning', value: 'toning'},
  {title: 'Custom', value: 'custom'}
];
export const SETS = ["1","2","3","4","5","6","7","8","9","10"];
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

export class Workout {
  constructor(name, trainingType, repRange, targetAreas, sets, timeBetweenSets, isBodyWeight, increaseWeightBy) {
    this.name = name || '';
    this.trainingType = trainingType || 'muscle';
    this.repRange = repRange || MUSCLE;
    this.targetAreas = targetAreas || [];
    this.sets = sets || '4';
    this.timeBetweenSets = timeBetweenSets || 90;
    this.isBodyWeight = isBodyWeight || false;
    this.increaseWeightBy = increaseWeightBy || 5;
  }
}

export default class WorkoutModel {
  constructor() {
    this.name = '';
    this.trainingType = 'muscle';
    this.repRange = this.getRepRangeFromTrainingType('muscle');
    this.targetAreas = [];
    this.sets = '4';
    this.timeBetweenSets = 90;
    this.isBodyWeight = false;
    this.increaseWeightBy = 5;

    this.options = {
      trainingType: [
          {title: 'Select', value: ''},
          {title: 'Strength', value: 'strength'},
          {title: 'Muscle Mass', value: 'muscle'},
          {title: 'Toning', value: 'toning'},
          {title: 'Custom', value: 'custom'}
        ]
    };
  }

  getWorkout() {
    return {
      name: this.name,
      trainingType: this.trainingType,
      repRange: this.repRange,
      targetAreas: this.targetAreas,
      sets: this.sets,
      timeBetweenSets: this.timeBetweenSets,
      isBodyWeight: this.isBodyWeight,
      increaseWeightBy: this.increaseWeightBy
    };
  }

  getSelectedOption(optionName) {
    let selected;
    if (this.options.hasOwnProperty(optionName)) {
      // index 0 because array returned from filter
      this.options[optionName].filter((option) => {option.selected})[0];
    }
  }

  /**
   * sets the value of multiple properties given a map of key value pairs
   * @param {Object<any>} values an object of key value pairs to set in the class
   * @return {void}
   */
  setProps(values) {
    for (var key in values) {
      if (this.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    }
  }

  /**
   * gets the value of multiple properties given an array of keys
   * @param {Array<string>} props an array of keys to build a map of to return
   * @return {Object<any>}
   */
  getProps(props) {
    let map = {};
    for (var i = 0; i < props.length; i++) {
      if (this.hasOwnProperty(key)) {
        map[key] = this[key];
      }
    }

    return map;
  }

  setName(name) {
    this.name = name;
  }

  getName(name) {
    return this.name;
  }

  setTrainingType(trainingType) {
    this.trainingType = trainingType;
  }

  getTrainingTypeByTitle(title) {
    let options = this.options.trainingType;
    for (var i = 0; i < options.length; i++) {
      if (options[i].title === title) {
        return options[i];
      }
    }
  }

  getTrainingType() {
    return this.trainingType;
  }

  setRepRange(repRange) {
    this.repRange = repRange;
  }

  getRepRange() {
    return this.repRange;
  }

  addRemoveTargetArea(area) {
    if (MUSCLES.indexOf(area) > -1) {
      let index = this.targetAreas.indexOf(area);
      if (index > -1) {
        this.targetAreas.splice(index, 1);
      } else {
        this.targetAreas.push(area);
      }
    }
    return this.targetAreas;
  }

  getTargetAreas() {
    return this.targetAreas;
  }

  setSets(sets) {
    this.sets = sets;
  }

  getSets() {
    return this.sets;
  }

  setTimeBetweenSets(timeBetweenSets) {
    this.timeBetweenSets = timeBetweenSets;
  }

  getTimeBetweenSets() {
    return this.timeBetweenSets;
  }

  setIsBodyWeight(isBodyWeight) {
    this.isBodyWeight = isBodyWeight;
  }

  getIsBodyWeight() {
    return this.isBodyWeight;
  }

  setIncreaseWeightBy(increaseWeightBy) {
    this.increaseWeightBy = increaseWeightBy;
  }

  getIncreaseWeightBy() {
    return this.increaseWeightBy;
  }

  /**
   * determines what the rep range is based on the strings strength, muscle, or toning
   * @param {string} trainingType "strength", "muscle", or "toning"
   * @param {Range} customRange
   */
  getRepRangeFromTrainingType(trainingType, customRange) {
    switch(trainingType) {
      case 'strength':
        return STRENGTH;
        break;
      case 'muscle':
          return MUSCLE;
        break;
      case 'toning':
        return TONING;
        break;
      default:
        if (customRange) {
          let { from, to } = customRange;
          return new Range(from, to);
        } else {
          return MUSCLE; // default muscle
        }
        break;
    }
  }

  getOptions(prop) {
    if (this.options.hasOwnProperty(prop)) {
      return this.options[prop];
    } else {
      return [];
    }
  }
}

/*
Name?
How many target reps per set?
Time between sets?
Body weight exercise?
If not body weight how much weight to increase when target reps met?
*/