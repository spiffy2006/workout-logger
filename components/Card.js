import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Card as C, ListItem, Button } from 'react-native-elements';
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
export default class Card extends Component {
  generateDetails() {
    let { details } = this.props;
    return details.map((detail, i) => {
      let style = {};
      if (i === details.length - 1) {
        style.marginBottom = 10;
      }
      return (<Text key={detail.label} style={style}>{detail.label + ' : ' + detail.text}</Text>);
    });
  }

  render() {
    return (
      <C
          containerStyle={{flex: 1}}
          key={this.props.title}
          title={this.props.title}>
          {this.generateDetails()}
          <Button
            icon={getIcon('code')}
            backgroundColor={this.props.buttonColor}
            onPress={() => this.props.onSelect(this.props.title)}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title={this.props.selectText} />
      </C>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  details: PropTypes.array.isRequired, // [{label: string, text: string}]
  onSelect: PropTypes.func,
  selectText: PropTypes.string,
  buttonColor: PropTypes.string
};

Card.defaultProps = {
  onSelect: name => console.log(name),
  selectText: 'VIEW',
  buttonColor: colors.brand
};