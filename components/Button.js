import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Button extends React.Component {
  render() {
    let color = { color: this.props.color },
        background = { backgroundColor: this.props.backgroundColor },
        width = this.props.fullWidth ? styles.full : styles.notFull;
    return (
      <TouchableOpacity
        onPress={this.props.onClick}
        style={[styles.container, background, width]}
      >
        <Text style={color} >{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  fullWidth: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  color: '#fff',
  backgroundColor: '#333',
  fullWidth: false
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30
  },
  full: {
    width: SCREEN_WIDTH
  },
  notFull: {
    paddingLeft: 10,
    paddingRight: 10
  }
});