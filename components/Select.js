import React,  { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import SimplePicker from 'react-native-simple-picker';

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
        <Button
        iconRight
        backgroundColor="#2c98f0"
        icon={{name: 'arrow-down', type: 'font-awesome'}}
        title={this.props.title}
        onPress={() => {
            this.setState({show: !this.state.show});
            if (!this.state.show) {
              this.refs.picker.show();
            }
          }
        } />
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
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

Select.defaultProps = {
  title: '',
  options: [],
  onSelect: () => {}
};