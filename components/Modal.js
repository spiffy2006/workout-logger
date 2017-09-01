import React, { Component } from 'react';
import { Modal as M, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

export default class Modal extends Component {
  render() {
    return (
      <M
            animationType={this.props.animationType}
            transparent={this.props.transparent}
            visible={this.props.visible}
            onRequestClose={() => { this.props.onClose() }}
          >
         <View style={{marginTop: 22}}>
           <TouchableOpacity style={{position: 'absolute', top: 0, right: 5, marginBottom: 5}} onPress={() => { this.props.onClosePress() }}>
            <Text style={{color: 'blue'}}>close</Text>
          </TouchableOpacity>
          {this.props.children}
         </View>
      </M>
    );
  }
}

Modal.propTypes = {
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onClosePress: PropTypes.func
};

Modal.defaultProps = {
  animationType: 'slide',
  transparent: false,
  visible: false,
  onClose: () => { alert("Modal has been closed.") },
  onClosePress: () => {}
}