import React from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView } from 'react-native';
import Reflux from 'reflux';
import { Button, SearchBar, List, ListItem, Text } from 'react-native-elements';
import Modal from '../components/Modal.js';
import MultiViewModal from '../components/MultiViewModal.js';
import Card from '../components/Card.js';
import Input from '../components/Input.js';
import WorkoutCard from '../components/WorkoutCard.js';
import AddWorkouts from '../components/AddWorkouts.js';
import AddWeekDay from '../components/AddWeekDay.js';
import { WorkoutPlan, Week, Day } from '../models/workout-plan.js';


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

export default class AddWorkoutPlan extends Reflux.Component {
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
      workoutsList: Object.values(this.workoutCollection)
    };
    console.log(this.state.workoutsList);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onBackPress() {
    switch(this.state.currentStep) {
      case 'add_workouts':
        return this.setState({currentStep: 'add_weekday'});
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
    console.log(this.state);
    let weekdays = Object.keys(this.state.week).map(d => d.charAt(0).toUpperCase() + d.substr(1))
    return (
      <AddWeekDay
        week={this.state.week}
        dayIcon={{name: 'code', type: 'font-awesome'}}
        dayBtnColor="#2c98f0"
        onDaySelect={(day) => {
          let dayta = this.state.week[day.toLocaleLowerCase()];
          let title = dayta.title || day;
          this.setState({
            currentStep: 'add_workouts',
            day: dayta.setTitle(title) || new Day(day),
            selectedDay: day.toLowerCase()
          });
          console.log(new Day(day));
        }}
        saveBtnColor="#2c98f0"
        saveBtnIcon={{name: 'save', type: 'font-awesome'}}
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
    console.log(this);
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
        btnBackgroundColor="#2c98f0"
        icon={{name: 'save', type: 'font-awesome'}}
        btnTitle="Save Day"
        btnOnPress={() => {
            this.setState({
              week: this.state.week.setDay(this.state.selectedDay, this.state.day),
              day: new Day(),
              currentStep: 'add_weekday'
            });
          }
        }
        isSelected={this.isWorkoutSelected.bind(this)}
        onSelectedClick={(workout) => {
          console.log(workout);
          this.setState({
            day: this.state.day.add(workout)
          });
        }}
        onUnselectedClick={(workout) => {
          console.log(workout);
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

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Workout Plan</Text>
        <Input label="Name" onChange={this.onNameChange.bind(this)} validationMessage={'asdf'} />
        <Button
          backgroundColor="#2c98f0"
          icon={{name: 'plus', type: 'font-awesome'}}
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
              backgroundColor="#2c98f0"
              icon={{name: 'code', type: 'font-awesome'}}
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
            backgroundColor="#2c98f0"
            icon={{name: 'save', type: 'font-awesome'}}
            title='Save Plan'
            onPress={() => this.save()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});