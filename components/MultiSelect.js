import React,  { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, FormLabel } from 'react-native-elements';
import PropTypes from 'prop-types';
import SimplePicker from 'react-native-simple-picker';
import getIcon from '../constants/icons.js';
import colors from '../constants/colors.js';

export default class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.icon = getIcon('plus', colors.three);
  }

  renderButtons() {
    if (!this.state.show) {
      return null;
    }
    return this.props.options.map((option) => {
      let backgroundColor = colors.blank,
          color = colors.three;
      if (this.props.selected.indexOf(option) > -1) {
        backgroundColor = colors.three;
        color = colors.blank;
      }
      return (<Button
        key={option}
        title={option}
        textStyle={{textAlign: 'left'}}
        backgroundColor={backgroundColor}
        color={color}
        onPress={() => {
            this.props.onSelect(option)
          }
        } />);
    });
  }

  render() {
    if (this.state.show) {
      this.icon.name = 'minus';
    } else {
      this.icon.name = 'plus';
    }
    return (
      <View>
        <FormLabel>{this.props.label}</FormLabel>
        <Button
          iconRight
          buttonStyle={{marginBottom: 5}}
          icon={this.icon}
          title={this.props.value || 'Select'}
          textStyle={{textAlign: 'left'}}
          backgroundColor={colors.blank}
          color={colors.three}
          onPress={() => {
              this.setState({show: !this.state.show});
            }
          }
        />
        {this.renderButtons()}
      </View>
    );
  }
}

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

MultiSelect.defaultProps = {
  label: '',
  value: '',
  options: [],
  selected: [],
  onSelect: () => {}
};