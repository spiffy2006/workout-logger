import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card.js';

export default class WorkoutCard extends Component {
  generateDetails(workout) {
    let details = [
      {label: 'Training Type', text: workout.trainingType.title},
      {label: 'Rep Range', text: workout.repRange.from + ' - ' + workout.repRange.to},
      {label: 'Target Areas', text: workout.targetAreas && workout.targetAreas.join(', ')}, // Check workout.targetAreas only until all data is updated
      {label: 'Time Between Sets', text: workout.timeBetweenSets + ' seconds'},
      {label: 'Increase Weight By', text: workout.increaseWeightBy + 'lbs'}
    ];
    if (workout.isBodyWeight) {
      details.unshift({label: 'Body Weight', text: 'Yes'});
    }

    return details;
  }

  render() {
    let { workout, buttonText, onSelect } = this.props;
    return (
      <Card
        key={workout.name}
        title={workout.name}
        details={this.generateDetails(workout)}
        selectText={buttonText}
        onSelect={() => onSelect(workout)}
        buttonColor={this.props.buttonColor}
      />);
  }
}

WorkoutCard.propTypes = {
  workout: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  buttonColor: PropTypes.string
};

WorkoutCard.defaultProps = {
  onSelect: workout => console.log(workout)
}