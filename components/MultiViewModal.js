import React, { Component } from 'react';
import { Modal as M, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import Modal from './Modal.js';

export default class MultiViewModal extends Component {
  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.visible}
        onClosePress={() => { this.props.onClosePress() }}
      >
        <View style={{marginTop: 22}}>
          {this.props.children}
          {/* put a back button, keep state of current and beginning view...and stuff */}
          <TouchableOpacity onPress={() => this.props.onBackPress()} style={{flex: 1, position: 'absolute', left: 10, bottom: 0, zIndex: 10}}>
            <Text style={{color: 'blue'}}>{this.props.backText ? '<' + this.props.backText : ''}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

Modal.propTypes = {
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onClosePress: PropTypes.func,
  onBackPress: PropTypes.func,
  backText: PropTypes.string
};

Modal.defaultProps = {
  animationType: 'slide',
  transparent: false,
  visible: false,
  onClose: () => { alert("Modal has been closed.") },
  onClosePress: () => {},
  onBackPress: () => {},
  backText: 'back'
}