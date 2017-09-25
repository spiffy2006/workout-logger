import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView } from 'react-native';
import { Button, SearchBar, List, ListItem, Text } from 'react-native-elements';
import Modal from '../components/Modal.js';
import MultiViewModal from '../components/MultiViewModal.js';
import Card from '../components/Card.js';
import Input from '../components/Input.js';
import Select from '../components/Select.js';
import WorkoutCard from '../components/WorkoutCard.js';
import AddWorkouts from '../components/AddWorkouts.js';
import AddWeekDay from '../components/AddWeekDay.js';
import { WorkoutPlan, Week, Day, FITNESS_LEVELS, LENGTHS } from '../models/workout-plan.js';
import getIcon from '../constants/icons.js';
import colors from '../constants/colors.js';

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


// workout plan
/*
  start with all days of the week
    Sunday: [] workouts
      select workout
      + workout
    ...
    Saturday: [] workouts
      select workout
      + workout
  add week variation
*/

export default class AddWorkoutPlan extends Component {
  constructor(props) {
    super(props);
    this.workoutCollection = this.props.navigation.state.params.workoutCollection.collection;
    this.workoutPlanCollection = this.props.navigation.state.params.workoutPlanCollection;
    this.state = {
      selectedDay: '',
      day: new Day(),
      selectedWeek: 0,
      week: new Week(),
      workoutPlan: new WorkoutPlan(),
      modalVisible: false,
      currentStep: '',
      filteredWorkouts: this.workoutsList,
      workoutsList: this.getOriginalWorkoutsList()
    };
    console.log(this.state.workoutsList);
  }

  getOriginalWorkoutsList() {
    return Object.values(this.workoutCollection);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onBackPress() {
    switch(this.state.currentStep) {
      case 'add_workouts':
        return this.setState({currentStep: 'add_weekday', workoutsList: this.getOriginalWorkoutsList()});
    }
  }

  getModalBackText() {
    switch(this.state.currentStep) {
      case 'add_weekday':
        return '';
      case 'add_workouts':
        return 'Add Week';
    }
  }

  getModalContent() {
    switch(this.state.currentStep) {
      case 'add_weekday':
        return this.addWeekDay();
      case 'add_workouts':
        return this.addWorkouts();
    }
  }

  addWeekDay() {
    let weekdays = Object.keys(this.state.week).map(d => d.charAt(0).toUpperCase() + d.substr(1))
    return (
      <AddWeekDay
        week={this.state.week}
        dayIcon={getIcon('code')}
        dayBtnColor={colors.brand}
        onDaySelect={(day) => {
          let dayta = this.state.week[day.toLocaleLowerCase()];
          let title = dayta.title || day;
          this.setState({
            currentStep: 'add_workouts',
            day: dayta.setTitle(title) || new Day(day),
            selectedDay: day.toLowerCase()
          });
        }}
        saveBtnColor={colors.brand}
        saveBtnIcon={getIcon('save')}
        saveTitle="Save Week"
        onSave={() => {
            this.setState({
              workoutPlan: this.state.workoutPlan.update(this.state.week, this.state.selectedWeek),
              week: new Week(),
              currentStep: '',
              modalVisible: false
            });
          }
        }
      />);
  }

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

  getCapitalized(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }

  onDayTitleChange(title) {
    this.setState({day: this.state.day.setTitle(title)});
  }

  addWorkouts() {
    let { workoutsList } = this.state;
    
    console.log(this.state);

    return (
      <AddWorkouts
        searchPlaceholder="Search for workout..."
        workoutsList={workoutsList}
        onFilter={workoutsList => this.setState({workoutsList})}
        inputLabel="Title"
        inputValue={this.state.day.title}
        onInputChange={this.onDayTitleChange.bind(this)}
        btnBackgroundColor={colors.brand}
        icon={getIcon('save')}
        btnTitle="Save Day"
        btnOnPress={() => {
            this.setState({
              week: this.state.week.setDay(this.state.selectedDay, this.state.day),
              workoutsList: this.getOriginalWorkoutsList(),
              day: new Day(),
              currentStep: 'add_weekday'
            });
          }
        }
        isSelected={this.isWorkoutSelected.bind(this)}
        onSelectedClick={(workout) => {
          this.setState({
            day: this.state.day.add(workout)
          });
        }}
        onUnselectedClick={(workout) => {
          this.setState({
            day: this.state.day.remove(workout)
          });
        }}
       />
    );
  }

  save() {
    this.workoutPlanCollection.save(this.state.workoutPlan).then((data) => { console.log(data) });
  }

  onNameChange(name) {
    this.setState({workoutPlan: this.state.workoutPlan.setName(name)});
  }

  onGoalChange(goal) {
    this.setState({workoutPlan: this.state.workoutPlan.setGoal(goal)});
  }

  onFitnessLevelFromChange(level) {
    this.setState({workoutPlan: this.state.workoutPlan.setLevelFrom(level)});
  }

  onFitnessLevelToChange(level) {
    this.setState({workoutPlan: this.state.workoutPlan.setLevelTo(level)});
  }

  onLengthChange(length) {
    this.setState({workoutPlan: this.state.workoutPlan.setLength(length)});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Workout Plan</Text>
        <Input label="Name" onChange={this.onNameChange.bind(this)} validationMessage={'asdf'} />
        <Input label="Goal" onChange={this.onGoalChange.bind(this)} validationMessage={'asdf'} />
        <Select
          label={"Fitness Level From"}
          value={this.state.workoutPlan.level.from}
          options={FITNESS_LEVELS}
          onSelect={this.onFitnessLevelFromChange.bind(this)} />
        <Select
          label={"Fitness Level To"}
          value={this.state.workoutPlan.level.to}
          options={FITNESS_LEVELS}
          onSelect={this.onFitnessLevelToChange.bind(this)} />
        <Select
          label={"Select Length (weeks)"}
          value={this.state.workoutPlan.length ? 'Select' : (this.state.workoutPlan.length + ' Weeks')}
          options={LENGTHS}
          onSelect={this.onLengthChange.bind(this)} />
        <Button
          backgroundColor={colors.brand}
          icon={getIcon('plus')}
          title="Add Week"
          onPress={() => {
              this.setState({
                workoutPlan: this.state.workoutPlan.add(new Week()),
              });
            }
          }
        />
        {this.state.workoutPlan.weeks.map((week, i) => {
          return (
            <Button
              key={i}
              backgroundColor={colors.brand}
              icon={getIcon('code')}
              title={'Week ' + (i + 1)}
              onPress={() => {
                  this.setState({currentStep: 'add_weekday', week, modalVisible: true, selectedWeek: i});
                }
              } />)
            }
        )}
        <MultiViewModal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onClosePress={() => { this.setState({modalVisible: !this.state.modalVisible}) }}
            onBackPress={this.onBackPress.bind(this)}
            backText={this.getModalBackText()}
        >
          {this.getModalContent()}
        </MultiViewModal>
        <Button
            backgroundColor={colors.brand}
            icon={getIcon('save')}
            title='Save Plan'
            onPress={() => this.save()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blank,
  },
});