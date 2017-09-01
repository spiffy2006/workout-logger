import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

// views
import Home from './views/Home.js';
import AddWorkout from './views/AddWorkout.js';
import AddWorkoutPlan from './views/AddWorkoutPlan.js';
import ViewWorkouts from './views/ViewWorkouts.js';
import Workout from './views/Workout.js';
import SelectList from './views/SelectList.js';

const WorkoutLogger = StackNavigator(
  {
    Home: { screen: Home },
    AddWorkout: { screen: AddWorkout },
    AddWorkoutPlan: { screen: AddWorkoutPlan },
    ViewWorkouts: { screen: ViewWorkouts },
    Workout: { screen: Workout },
    SelectList: { screen: SelectList }
  }
);

export default class App extends React.Component {
  render() {
    return (
        <WorkoutLogger />
    );
  }
}