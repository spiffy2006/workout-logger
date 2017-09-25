import React,  { Component } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import SimplePicker from 'react-native-simple-picker';

export default class HorizontalScrollButtons extends Component {
  renderButtons() {
    return this.props.buttons.map((button) => {
      return (
        <TouchableOpacity style={{padding: 10}} key={button} onPress={() => this.props.onClick(button)}>
          <Text>
            {button}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Text style={{fontSize: 20}}>{this.props.title}</Text>
        <ScrollView horizontal={true}>
          {this.renderButtons()}
        </ScrollView>
      </View>
    );
  }
}

HorizontalScrollButtons.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.array.isRequired,
  onClick: PropTypes.func
};

HorizontalScrollButtons.defaultProps = {
  onClick: button => console.log(button)
};