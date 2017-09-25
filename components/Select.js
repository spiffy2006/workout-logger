import React,  { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, FormLabel } from 'react-native-elements';
import PropTypes from 'prop-types';
import SimplePicker from 'react-native-simple-picker';
import getIcon from '../constants/icons.js';
import colors from '../constants/colors.js';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  render() {
    return (
      <View>
        <FormLabel>{this.props.label}</FormLabel>
        <Button
          iconRight
          raised
          buttonStyle={{marginBottom: 5}}
          icon={getIcon('arrow-down', colors.three)}
          title={this.props.value || 'Select'}
          textStyle={{textAlign: 'left'}}
          backgroundColor={colors.blank}
          color={colors.three}
          onPress={() => {
              this.setState({show: !this.state.show});
              if (!this.state.show) {
                this.refs.picker.show();
              }
            }
          }
        />
        <SimplePicker
            ref={'picker'}
            options={this.props.options}
            onSubmit={(option) => {
              this.props.onSelect(option)
            }}
          />
      </View>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

Select.defaultProps = {
  label: '',
  value: '',
  options: [],
  onSelect: () => {}
};