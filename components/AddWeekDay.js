import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Card from './Card.js';

export default class AddWeekDay extends Component {
  render() {
    let { week, dayIcon, dayBtnColor, onDaySelect, saveBtnColor, saveBtnIcon, saveTitle, onSave } = this.props;
    let weekdays = Object.keys(week).map(d => d.charAt(0).toUpperCase() + d.substr(1))
    return (
      <View>
        {weekdays.map((day, i) => {
          let lowerCaseDay = day.toLowerCase();
          console.log(week[lowerCaseDay], day);
          return (
            <Button
              key={day}
              backgroundColor={dayBtnColor}
              icon={dayIcon}
              title={day}
              onPress={() => {
                this.props.onDaySelect(day);
              }} />);
          }
        )}
         <Button
            backgroundColor={saveBtnColor}
            icon={saveBtnIcon}
            title={saveTitle}
            onPress={() => {
                onSave();
              }
            } />
      </View>
    );
  }
}

AddWeekDay.propTypes = {
  week: PropTypes.object.isRequired,
  dayIcon: PropTypes.object,
  dayBtnColor: PropTypes.string,
  onDaySelect: PropTypes.func,
  saveBtnColor: PropTypes.string,
  saveBtnIcon: PropTypes.object,
  saveTitle: PropTypes.string,
  onSave: PropTypes.func
};

AddWeekDay.defaultProps = {
  dayIcon: {name: 'code', type: 'font-awesome'},
  dayBtnColor: "#2c98f0",
  onDaySelect: day => console.log(day),
  saveBtnColor: "#2c98f0",
  saveBtnIcon: {name: 'save', type: 'font-awesome'},
  saveTitle: "Save",
  onSave: () => console.log('add weekday save clicked')
}