import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Card, ListItem, Button } from 'react-native-elements';
import MultiViewModal from '../components/MultiViewModal.js';
import HorizontalScrollButtons from '../components/HorizontalScrollButtons.js';
import InfoCard from '../components/InfoCard.js';
import { WorkoutPlanSkeleton } from '../models/workout-plan-skeleton.js';
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
export default class ViewWorkoutPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedPlan: null,
      selectedWeek: 0,
      selectedDay: null
    };
    let { workoutPlanCollection } = props.navigation.state.params;
    this.workoutPlanCollection = workoutPlanCollection;
    this.workoutPlans = workoutPlanCollection.collection;
  }

  getLevelText(level) {
    if (!level) { // just because of test data need to delete old plan
      return '';
    }

    let text = level.from;

    if (level.to) {
      text += ' - ' + level.to;
    }

    return text;
  }

  generateCards() {
    return Object.keys(this.workoutPlans).map((plan) => {
      let workoutPlan = this.workoutPlans[plan];
      console.log(workoutPlan);
      return (
        <Card
          key={workoutPlan.name}
          title={workoutPlan.name}>
          <Text>{'Goal: ' + workoutPlan.goal}</Text>
          <Text>{'Fitness Level: ' + this.getLevelText(workoutPlan.level)}</Text>
          <Text>{'Length: ' + workoutPlan.length + ' weeks'}</Text>
          <Button
            icon={getIcon('eye')}
            backgroundColor={colors.brand}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW'
            onPress={() => { this.setState({modalVisible: true, currentStep: 'plan_overview', selectedPlan: workoutPlan}) }} />
          <Button
            icon={getIcon('check')}
            backgroundColor={colors.action}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='SELECT'
            onPress={() => { this.selectPlan(workoutPlan) }} />
        </Card>
      )
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onBackPress() {
    switch(this.state.currentStep) {
      case 'day_view':
        return this.setState({currentStep: 'plan_overview'});
    }
  }

  getModalBackText() {
    switch(this.state.currentStep) {
      case 'plan_overview':
        return '';
      case 'day_view':
        return 'Plan Overview';
    }
  }

  getModalContent() {
    switch(this.state.currentStep) {
      case 'plan_overview':
        return this.planOverview();
      case 'day_view':
        return this.dayView();
    }
  }

  onWeekClick(weekNumber) {
    this.setState({selectedWeek: weekNumber});
  }

  getWeekButtons(numButtons) {
    let i = 1;
    let buttons = [];
    let num = Number(numButtons);

    while (i <= num) {
      buttons.push(String(i));
      i++;
    }

    return buttons;
  }
  
  generatePlanInfo() {
    return this.state.selectedDay.workouts.map((workout, i) => {
      console.log('generate plan info', workout);
      return (
        <View key={workout.name + i}>
          <Text style={{fontSize: 14}}>{workout.name}</Text>
          <Text>{workout.targetAreas.join(', ')}</Text>
          <Text style={{fontSize: 14}}>{workout.sets + ' sets of ' + workout.repRange.from + ' - ' + workout.repRange.to}</Text>
        </View>
      );
    });
  }

  dayView() {
    return (
      <View style={{marginBottom: 20}}>
        <Text h4>{this.state.selectedDay.title}</Text>
        {this.generatePlanInfo()}
      </View>
    );
  }

  generateInfoCards() {
    let days = Object.values(this.state.selectedPlan.weeks[this.state.selectedWeek]);
    console.log(this.state.selectedPlan.weeks, this.state.selectedWeek);

    return days.map((day, i) => {
      return <InfoCard
        key={day.title}
        title={'Day ' + (i + 1) + ' (' + day.title + ')'}
        list={day.targetAreas}
        onSelect={() => this.setState({selectedDay: day, currentStep: 'day_view'})}
      />
    })
  }

  planOverview() {
    return(
      <View>
        <HorizontalScrollButtons title="Weeks" buttons={this.getWeekButtons(this.state.selectedPlan.length)} onClick={this.onWeekClick.bind(this)} />
        <ScrollView>
          {this.generateInfoCards()}
        </ScrollView>
      </View>
    );
  }

  selectPlan(plan) {
    this.workoutPlanCollection.saveSelectedPlan(new WorkoutPlanSkeleton(plan));
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <Text>View Workout Plans</Text>
          {this.generateCards()}
        </ScrollView>
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