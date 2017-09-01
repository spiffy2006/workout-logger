import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import { Card, ListItem, Button } from 'react-native-elements';
/*
this.name = '';
    this.trainingType = 'muscle';
    this.repRange = this.getRepRangeFromTrainingType('muscle'); {from, to}
    this.timeBetweenSets = 90;
    this.isBodyWeight = false;
    this.increaseWeightBy = 5;
    */
export default class ViewWorkouts extends Reflux.Component {
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
          <Text>{"Time Between Sets: " + workoutObj.timeBetweenSets + ' seconds'}</Text>
          <Text style={{marginBottom: 10}}>
            {"Increase Weight By: " + workoutObj.increaseWeightBy + 'lbs'}
          </Text>
          <Button
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
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
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});