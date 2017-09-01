import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  render() {
    let {from, to, onChange, validationMessage, label} = this.props;
    return (
      <View>
        <FormLabel>{label}</FormLabel>
        <FormInput value={String(from)} onChangeText={text => onChange({from: text, to})}/>
        <FormInput value={String(to)} onChangeText={text => onChange({from, to: text})}/>
        <FormValidationMessage>{validationMessage}</FormValidationMessage>
      </View>
    );
  }
}

Input.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  onChange: PropTypes.func,
  validationMessage: PropTypes.string,
};