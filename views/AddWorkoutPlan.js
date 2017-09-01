import React from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView } from 'react-native';
import Reflux from 'reflux';
import { Button, SearchBar, List, ListItem, Text } from 'react-native-elements';
import SearchableList from '../components/SearchableList.js';
import Modal from '../components/Modal.js';
import MultiViewModal from '../components/MultiViewModal.js';
import Card from '../components/Card.js';
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
    console.log(this.state.week);
    let weekdays = Object.keys(this.state.week).map(d => d.charAt(0).toUpperCase() + d.substr(1))
    return (
      <View>
        {weekdays.map((day, i) => {
          return (
            <Button
              key={day}
              backgroundColor="#2c98f0"
              icon={{name: 'code', type: 'font-awesome'}}
              title={day}
              onPress={() => {
                  this.setState({currentStep: 'add_workouts', day: new Day(), selectedDay: day.toLowerCase()});
                  console.log(new Day());
                }
              } />)
            }
        )}
         <Button
            backgroundColor="#2c98f0"
            icon={{name: 'save', type: 'font-awesome'}}
            title='Save Week'
            onPress={() => {
                this.setState({workoutPlan: this.state.workoutPlan.add(this.state.week), currentStep: 'add_workouts'});
                console.log(title);
              }
            } />
      </View>
    );
  }

  addWeek() {
    return (
      <View>
         <Button
            backgroundColor="#2c98f0"
            icon={{name: 'plus', type: 'font-awesome'}}
            title='Add Week'
            onPress={() => {
                this.setState({currentStep: 'add_workouts', week: new Week()});
              }
            } />
        {this.state.workoutPlan.weeks.map((week, i) => {
          return (
            <Button
              key={i}
              backgroundColor="#2c98f0"
              icon={{name: 'code', type: 'font-awesome'}}
              title={'Week ' + (i + 1)}
              onPress={() => {
                  this.setState({currentStep: 'add_weekday', week, selectedWeek: i});
                  console.log(title);
                }
              } />)
            }
        )}
         <Button
            backgroundColor="#2c98f0"
            icon={{name: 'save', type: 'font-awesome'}}
            title='Save Plan'
            onPress={() => {
                this.setState({workoutPlan: this.state.workoutPlan.add(this.state.week), currentStep: 'add_workouts'});
                console.log(title);
              }
            } />
      </View>
    );
  }

  generateDetails(obj) {
    let details = [
      {label: 'Training Type', text: obj.trainingType.title},
      {label: 'Rep Range', text: obj.repRange.from + ' - ' + obj.repRange.to},
      {label: 'Time Between Sets', text: obj.timeBetweenSets + ' seconds'},
      {label: 'Increase Weight By', text: obj.increaseWeightBy + 'lbs'}
    ];
    if (obj.isBodyWeight) {
      details.unshift({label: 'Body Weight', text: 'Yes'});
    }

    return details;
  }

  addWorkouts() {
    let { workoutsList } = this.state;
    console.log(this.state);
    return (
      <View onLayout={e => console.log(e.nativeEvent.layout)}>
        <Text style={{textAlign: 'center', marginBottom: 5}} h1>{this.state.day.title}</Text>
        <SearchableList
          placeholder="Search for workout..."
          list={workoutsList}
          onFilter={workoutsList => this.setState({workoutsList})}>
            {Object.keys(workoutsList).map((key) => {
              return (
                <Card
                  key={workoutsList[key].name}
                  title={workoutsList[key].name}
                  details={this.generateDetails(workoutsList[key])}
                  selectText="Add"
                  onSelect={() => {
                    this.setState({
                      day: this.state.day.add(workoutsList[key])
                    });
                  }
                } />);
              })
            }
        </SearchableList>
        <Button
          backgroundColor="#2c98f0"
          icon={{name: 'save', type: 'font-awesome'}}
          title="Save Day"
          onPress={() => {
              this.setState({workoutPlan: this.state.workoutPlan.add(this.state.week), modalVisible: false, currentStep: 'add_week'});
            }
          } />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Workout Plan</Text>
        <Button
          backgroundColor="#2c98f0"
          icon={{name: 'plus', type: 'font-awesome'}}
          title="Add Week"
          onPress={() => {
              this.setState({week: new Week(), modalVisible: !this.state.modalVisible, currentStep: 'add_weekday'});
            }
          } />
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
            onPress={() => {
                this.setState({workoutPlan: this.state.workoutPlan.add(this.state.week), currentStep: 'add_workouts'});
                console.log(title);
              }
            } />
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