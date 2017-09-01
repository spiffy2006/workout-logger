import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';

export default class CheckboxInput extends Component {
  render() {
    return (<CheckBox
      style={{width: '100%', marginTop: 10, marginBottom: 10, paddingTop: 10, paddingBottom: 10}}
      title={this.props.title}
      iconLeft
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checkedColor='black'
      checked={this.props.value}
      onPress={this.props.onPress}
    />);
  }
}