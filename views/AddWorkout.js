import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Picker } from 'react-native';
import Input from '../components/Input.js';
import InputRange from '../components/InputRange.js';
import CheckboxInput from '../components/CheckboxInput.js';
import Select from '../components/Select.js';
import MultiSelect from '../components/MultiSelect.js';
import { Button } from 'react-native-elements';
import WorkoutModel, { MUSCLES, SETS } from '../models/workout';
import colors from '../constants/colors.js';

export default class AddWorkout extends Component {
  static navigationOptions = {
    title: 'Add a workout',
  };

  constructor(props) {
    super(props);
    let { state: { params } } = props.navigation;
    this.workoutModel = new WorkoutModel();

    this.state = this.workoutModel.getWorkout();
    
    this.selectedTrainingType = '';

    this.workoutModel.setProps(this.state);

    this.workoutCollection = this.props.navigation.state.params.workoutCollection;
    console.log(this.state);
  }

  save() {
    this.workoutCollection.save(this.state).then((data) => { console.log(data) });
  }

  getNewState(newState) {
    let state = {};

    for (let key in newState) {
      if (newState.hasOwnProperty(key) && !state.hasOwnProperty(key)) {
        switch(key) {
          case 'trainingType':
            state.repRange = this.workoutModel.getRepRange(newState.trainingType.value);
          default:
            state[key] = newState[key];
        }
      }
    }

    return state;
  }

  onNameChange(name) {
    // TODO integrate with the store
    this.workoutModel.setName(name);
    this.setState({name});
  }

  onTrainingTypeChange(value) {
    let trainingType = this.workoutModel.getTrainingTypeByTitle(value);
    this.selectedTrainingType = trainingType;
    this.workoutModel.setTrainingType(trainingType);
    this.setState({
      trainingType,
      repRange: this.workoutModel.getRepRangeFromTrainingType(trainingType.title.toLowerCase())
    });
  }

  onRepRangeChange(repRange) {
    this.setState({repRange});
    this.workoutModel.setRepRange(repRange);
  }

  onTargetAreasChange(area) {
    let targetAreas = this.workoutModel.addRemoveTargetArea(area);
    this.setState({targetAreas});
  }

  onSetsChange(sets) {
    this.setState({sets});
    this.workoutModel.setSets(sets);
  }

  onTimeBetweenSetsChange(timeBetweenSets) {
    this.setState({timeBetweenSets});
    this.workoutModel.setTimeBetweenSets(timeBetweenSets);
  }

  onIsBodyWeightChange() {
    let isBodyWeight = !this.state.isBodyWeight;
    this.setState({isBodyWeight});
    this.workoutModel.setIsBodyWeight(isBodyWeight);
  }

  onIncreaseWeightByChange(increaseWeightBy) {
    this.setState({increaseWeightBy});
  }

  render() {
    console.log(this.state);
    return (
      <ScrollView contentContainerStyle={[styles.container]}>
        <Input label="Name" onChange={this.onNameChange.bind(this)} validationMessage={'asdf'} />
        <Select label={"Select Training Type"} value={this.selectedTrainingType.title} options={this.workoutModel.getOptions('trainingType').map(o => o.title)} onSelect={this.onTrainingTypeChange.bind(this)} />
        <InputRange label="Rep Range" from={Number(this.state.repRange.from)} to={Number(this.state.repRange.to)} onChange={this.onRepRangeChange.bind(this)} validationMessage={'adsf'} />
        <MultiSelect
            label={"Select Target Areas"}
            value={this.state.targetAreas.join(', ')}
            options={MUSCLES}
            selected={this.state.targetAreas}
            onSelect={this.onTargetAreasChange.bind(this)} />
        <Select
          label={"Number of sets"}
          value={this.state.sets}
          options={SETS}
          onSelect={this.onSetsChange.bind(this)} />
        <Input label="Time Between Sets (seconds)" value={String(this.state.timeBetweenSets)} onChange={this.onTimeBetweenSetsChange.bind(this)} validationMessage={'adsf'} />
        <CheckboxInput title="Body Weight Workout" onPress={this.onIsBodyWeightChange.bind(this)} value={this.state.isBodyWeight} />
        <Input label="After Max Reps Reached, Increase Weight By" value={String(this.state.increaseWeightBy)} onChange={this.onIncreaseWeightByChange.bind(this)} validationMessage={'asdf'} />
        <Button title="Save" onPress={() => { this.save() }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blank
  },
});

// create async default data on app load that clears previous data and inserts predefined scheme and data.