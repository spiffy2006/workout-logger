import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import Card from './Card.js';
import getIcon from '../constants/icons.js';
import colors from '../constants/colors.js';

export default class AddWeekDay extends Component {
  render() {
    let { week, dayIcon, dayBtnColor, onDaySelect, saveBtnColor, saveBtnIcon, saveTitle, onSave } = this.props;
    let weekdays = Object.keys(week).map(d => d.charAt(0).toUpperCase() + d.substr(1))
    return (
      <View>
        <List>
          {weekdays.map((day, i) => {
            let lowerCaseDay = day.toLowerCase();
            return (
              <ListItem
                key={day}
                backgroundColor={dayBtnColor}
                leftIcon={dayIcon}
                title={day}
                onPress={() => {
                  this.props.onDaySelect(day);
                }} />);
            }
          )}
        </List>
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
  dayIcon: getIcon('sun-o'),
  dayBtnColor: colors.brand,
  onDaySelect: day => console.log(day),
  saveBtnColor: colors.brand,
  saveBtnIcon: getIcon('save'),
  saveTitle: "Save",
  onSave: () => console.log('add weekday save clicked')
}