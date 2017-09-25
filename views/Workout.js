import React, { Component } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { WorkoutPlanSkeleton } from '../models/workout-plan-skeleton.js';
import { Set } from '../models/workout-irl.js';
import Input from '../components/Input.js';
import Timer from '../components/Timer.js';
import getIcon from '../constants/icons.js';
import colors from '../constants/colors.js';

export default class Workout extends Component {
  constructor(props) {
    super(props);
    this.plan = new WorkoutPlanSkeleton(props.navigation.state.params.plan);
    this.workoutArchiveCollection = props.navigation.state.params.workoutArchiveCollection;
    console.log('archive', this.workoutArchiveCollection);
    this.workoutPlanCollection = props.navigation.state.params.workoutPlanCollection;
    this.workoutCollection = props.navigation.state.params.workoutCollection;
    this.today = this.plan.getDay();
    let currentWorkout = this.plan.getCurrentWorkout(this.today);
    this.state = this.getStateBasedOnCurrentWorkout(currentWorkout);
    this.isBetweenSets = false;
    console.log(colors);
  }

  getStateBasedOnCurrentWorkout(currentWorkout) {
    let state;
    if (currentWorkout && this.today.workouts.length) {
      state = {
        currentWorkout: currentWorkout,
        workout: this.getWorkout(currentWorkout.name),
        status: 'workout',
        currentWeight: '0',
        currentReps: '0'
      };
    } else if (this.today.workouts.length === 0) {
      state = {status: 'rest'};
    } else if (!currentWorkout) {
      state = {status: 'finished'};
    }
    
    if (this.isBetweenSets) {
      state.status = 'timer';
    }

    return state;
  }

  getWorkout(name) {
    return this.workoutCollection.get(name)
  }

  santizeNumber(num) {
    return num.replace(/[^0-9]/g, '');
  }

  // NEED STATE MACHINE FOR DIFFERENT STATES OF WORKOUT

  generateWorkoutInfo() {
    switch(this.state.status) {
      case 'workout':
        let currentSet = String(this.state.currentWorkout.sets.length + 1); // workout.sets is a string
        if (currentSet === this.state.workout.sets) {
          return this.renderCurrentWorkout(true);
        } else {
          return this.renderCurrentWorkout();
        }
      case 'timer':
        return (<Timer seconds={Number(this.state.workout.timeBetweenSets)} onClose={() => { this.isBetweenSets = false; this.setState({status: 'workout'}); } } />);
      case 'finished':
        console.log(this.plan);
        this.workoutPlanCollection.saveSelectedPlan(this.plan);
        return (<Text>All Done!</Text>);
      case 'rest':
        return (<Text>Rest Day! You've earned it!</Text>);
    }
  }

  addSet() {
    let set = new Set(this.state.currentReps, this.state.currentWeight, this.state.workout.timeBetweenSets);
    let currentWorkout = this.state.currentWorkout.addSet(set);
    this.isBetweenSets = true;
    this.setState(this.getStateBasedOnCurrentWorkout(currentWorkout));
  }

  saveWorkout() {
    console.log('save workout', this.state.currentWorkout);
    let set = new Set(this.state.currentReps, this.state.currentWeight, this.state.workout.timeBetweenSets);
    this.state.currentWorkout.addSet(set);
    this.plan.setWorkout(this.state.currentWorkout);
    this.workoutArchiveCollection.add(this.state.currentWorkout);
    let currentWorkout = this.plan.getCurrentWorkout(this.today);
    this.setState(this.getStateBasedOnCurrentWorkout(currentWorkout));
    // need to save plan progress and save each finished workout to the workout archive
  }

  // 3 views: current workout - if there is a workout that isn't null, finish workout - if all the sets in the workout are done, all done - currentWorkout is null
  
  renderCurrentWorkout(isFinal) {
    let { workout } = this.state;
    let buttonText = isFinal ? 'Finish Set' : 'Next Set';
    let buttonHandler = isFinal ? this.saveWorkout.bind(this) : this.addSet.bind(this);
      return (
        <View style={{flex: 1}}>
          <Text h3 style={{textAlign: 'center'}}>{this.today.title}</Text>
          <Text h4>{workout.name}</Text>
          <Text>{'Set #' + (this.state.currentWorkout.sets.length + 1) + ' of ' + workout.sets}</Text>
          <Text>{'Reps: ' + workout.repRange.from + ' - ' + workout.repRange.to}</Text>
          <Input label="Reps Completed" value={this.state.currentReps} onChange={reps => this.setState({currentReps: this.santizeNumber(reps)})} validationMessage={'asdf'} />
          <Input label="Weight" value={this.state.currentWeight} onChange={weight => this.setState({currentWeight: this.santizeNumber(weight)})} validationMessage={'asdf'} />
           <Button
            backgroundColor={colors.brand}
            icon={getIcon('arrow-right')}
            title={buttonText}
            onPress={() => buttonHandler()} />
          <Button
            backgroundColor={colors.nine}
            icon={getIcon('step-forward')}
            title='Skip'
            onPress={() => this.addSet(new Set())} />
        </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.generateWorkoutInfo()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blank,
    // alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
});