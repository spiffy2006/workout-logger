import React from 'react';
import { StyleSheet, title, View } from 'react-native';
import { Button } from 'react-native-elements'
import Reflux from 'reflux';
// storage
import { WorkoutCollection, WorkoutPlanCollection } from '../storage/async';

export default class Home extends Reflux.Component {
  constructor(props) {
    super(props);
    this.workoutCollection = new WorkoutCollection();
    this.workoutPlanCollection = new WorkoutPlanCollection();
  }
  render() {
    const { navigate } = this.props.navigation;
    let { workoutCollection, workoutPlanCollection } = this;
    return (
      <View style={styles.container}>
        <Button title="Start Workout" onPress={() => navigate('Workout')} />
        <Button title="Add Workout" onPress={() => navigate('AddWorkout', {workoutCollection})} />
        <Button title="Add Workout Plan" onPress={() => navigate('AddWorkoutPlan', {workoutCollection, workoutPlanCollection})} />
        <Button title="View Workouts" onPress={() => navigate('ViewWorkouts', {workoutCollection})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});