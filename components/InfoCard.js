import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import Card from './Card.js';
import colors from '../constants/colors.js';

/*
this.name = '';
    this.trainingType = 'muscle';
    this.repRange = this.getRepRangeFromTrainingType('muscle'); {from, to}
    this.timeBetweenSets = 90;
    this.isBodyWeight = false;
    this.increaseWeightBy = 5;
    */

    /*
  on AddWorkout have target areas for the workout

  overall info for plan
    - name
    - goal
    - fitness level (beginner, intermediate, advanced) single or range
    - length

  Plan overview
    - top of page has buttons for each week of the plan
    - week calendar (https://www.bodybuilding.com/images/2016/august/shortcut-to-size-sale-page-calendar-2.jpg)
    - each day has target areas (multiple select) and lists them in the calendar view I need to have this on each indivdual workout :(
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

export default class InfoCard extends Component {
  render() {
    let { list, title, onSelect } = this.props;
    return (
      <TouchableOpacity onPress={() => onSelect()}>
        <Text h4>{title}</Text>
        <Text style={{borderLeftWidth: 1, borderLeftColor: colors.three, paddingLeft: 5, marginLeft: 5}}>{list.join(', ')}</Text>
      </TouchableOpacity>
    );
  }
}

InfoCard.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func
};

InfoCard.defaultProps = {
  onSelect: workout => console.log(workout)
}