import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Card, ListItem, Button } from 'react-native-elements';
import getIcon from '../constants/icons.js';
import colors from '../constants/colors.js';
/*
this.name = '';
    this.trainingType = 'muscle';
    this.repRange = this.getRepRangeFromTrainingType('muscle'); {from, to}
    this.timeBetweenSets = 90;
    this.isBodyWeight = false;
    this.increaseWeightBy = 5;
    */
export default class ViewWorkouts extends Component {
  constructor(props) {
    super(props);
    let { workoutCollection } = props.navigation.state.params;
    this.workouts = workoutCollection.collection;
  }
  generateCards() {
    return Object.keys(this.workouts).map((workout) => {
      let workoutObj = this.workouts[workout];
      return (
        <Card
          key={workoutObj.name}
          title={workoutObj.name}>
          { workoutObj.isBodyWeight ? <Text>Body Weight</Text> : null }
          <Text>{"Training Type: " + workoutObj.trainingType.title}</Text>
          <Text>{"Rep Range: " + workoutObj.repRange.from + ' - ' + workoutObj.repRange.to}</Text>
          <Text>{"Target Areas: " + workoutObj.targetAreas.join(', ')}</Text>
          <Text>{"Sets: " + workoutObj.sets}</Text>
          <Text>{"Time Between Sets: " + workoutObj.timeBetweenSets + ' seconds'}</Text>
          <Text style={{marginBottom: 10}}>
            {"Increase Weight By: " + workoutObj.increaseWeightBy + 'lbs'}
          </Text>
          <Button
            icon={getIcon('eye')}
            backgroundColor={colors.brand}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card>
      )
    });
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>View Workouts</Text>
        {this.generateCards()}
      </ScrollView>
    );
  }
}

// ViewWorkouts.propTypes = {
//   workouts: PropTypes.object.isRequired
// }

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.blank,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});