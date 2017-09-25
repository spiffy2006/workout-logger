import React, { Component } from 'react';
import { StyleSheet, title, View, Text } from 'react-native';
import { Button } from 'react-native-elements'
import colors from '../constants/colors.js';
// storage
import { WorkoutCollection, WorkoutPlanCollection, WorkoutArchiveCollection } from '../storage/async';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.workoutCollection = new WorkoutCollection();
    this.workoutPlanCollection = new WorkoutPlanCollection();
    this.workoutArchiveCollection = new WorkoutArchiveCollection();
    this.state = {
      plan: null
    };
    this.workoutPlanCollection.getSelectedPlan().then(plan => this.setState({plan}));
  }

  getStartWorkout() {
    const { navigate } = this.props.navigation;
    if (this.state.plan) {
      return (
        <Button
          title="Start Workout"
          onPress={() => navigate(
            'Workout',
            {
              workoutArchiveCollection: this.workoutArchiveCollection,
              workoutPlanCollection: this.workoutPlanCollection,
              workoutCollection: this.workoutCollection,
              plan: this.state.plan
            }
          )}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    let { workoutCollection, workoutPlanCollection } = this;
    console.log(workoutPlanCollection);
    return (
      <View style={styles.container}>
        <Text>{'Selected Plan: ' + (this.state.plan ? this.state.plan.name : '')}</Text>
        {this.getStartWorkout()}
        <Button title="Add Workout" onPress={() => navigate('AddWorkout', {workoutCollection})} />
        <Button title="Add Workout Plan" onPress={() => navigate('AddWorkoutPlan', {workoutCollection, workoutPlanCollection})} />
        <Button title="View Workouts" onPress={() => navigate('ViewWorkouts', {workoutCollection})} />
        <Button title="View Workout Plans" onPress={() => navigate('ViewWorkoutPlans', {workoutPlanCollection})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blank,
    alignItems: 'center',
    justifyContent: 'center'
  },
});