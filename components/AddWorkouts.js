import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import Card from './Card.js';
import Input from './Input.js';
import SearchableList from './SearchableList.js';
import WorkoutCard from './WorkoutCard.js';

export default class AddWorkouts extends Component {
  isWorkoutSelected(workout) {
    let { workouts } = this.state.day;
    let selected = false;
     for (let i = 0; i < workouts.length; i++) {
       if (workouts[i].name === workout.name) {
         selected = true;
         break;
       }
     }
     return selected;
  }

  prependSelected(workoutsList) {
    let prependedList = [];
    let unselectedIndex = 0;
    for (let i = 0; i < workoutsList.length; i++) {
      if (this.props.isSelected(workoutsList[i])) {
        prependedList.unshift(workoutsList[i]);
        unselectedIndex++;
      } else {
        prependedList.push(workoutsList[i]);
      }
    }
    return {prependedList, unselectedIndex};
  }
    
  getWorkoutCards(workoutsList) {
    let { prependedList, unselectedIndex } = this.prependSelected(workoutsList);
    return prependedList.map((workout, i) => {
      let btnText, btnColor, onSelect;
      if (i < unselectedIndex) {
        btnText = "Remove";
        btnColor = "red";
        onSelect = workout => this.props.onUnselectedClick(workout);
      } else {
        btnText = "Add";
        btnColor = "green";
        onSelect = workout => this.props.onSelectedClick(workout);
      }
      return (
        <WorkoutCard
          key={workout.name}
          workout={workout}
          buttonText={btnText}
          buttonColor={btnColor}
          onSelect={() => onSelect(workout)} />);
      }
    );
  }

  render() {
    let { workoutsList } = this.props;
    return (
      <View>
        <SearchableList
          placeholder="Search for workout..."
          list={workoutsList}
          onFilter={workoutsList => this.props.onFilter(workoutsList)}>
            <Input
              label="Title"
              value={this.props.title}
              onChange={title => this.props.onInputChange(title)}
              validationMessage={'asdf'} />
            {this.getWorkoutCards(workoutsList)}
        </SearchableList>
        <Button
          backgroundColor={this.props.btnBackgroundColor}
          icon={this.props.icon}
          title={this.props.btnTitle}
          onPress={() => this.props.btnOnPress()} />
      </View>
    );
  }
}

AddWorkouts.propTypes = {
  searchPlaceholder: PropTypes.string,
  workoutsList: PropTypes.array.isRequired,
  onFilter: PropTypes.func,
  inputLabel: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func,
  inputValidationMessage: PropTypes.string,
  btnBackgroundColor: PropTypes.string,
  icon: PropTypes.object,
  btnTitle: PropTypes.string,
  btnOnPress: PropTypes.func,
  isSelected: PropTypes.func.isRequired
};

AddWorkouts.defaultProps = {
  searchPlaceholder: 'Search...',
  onFilter: filtered => console.log(filtered),
  inputLabel: '',
  onInputChange: value => console.log(value),
  inputValidationMessage: '',
  btnBackgroundColor: '#2c98f0',
  icon: {name: 'save', type: 'font-awesome'},
  btnTitle: 'Click',
  btnOnPress: () => console.log('button pressed')
}