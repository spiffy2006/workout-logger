import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  render() {
    let {label, onChange, validationMessage, value} = this.props;
    return (
      <View style={{flexDirection: 'column'}}>
        <FormLabel>{label}</FormLabel>
        <FormInput value={value} onChangeText={text => onChange(text)}/>
        <FormValidationMessage>{validationMessage}</FormValidationMessage>
      </View>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  validationMessage: PropTypes.string
};