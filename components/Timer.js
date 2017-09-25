import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements'; // refactor grid, row, col and use flex-box because deprecated
import PropTypes from 'prop-types';
import getIcon from '../constants/icons.js';
import colors from '../constants/colors.js';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    let status = props.startOnRender ? 'count' : 'stop';
    this.state = this.getStateFromStatus(status);
    this.start = null;
    this.time = 0;
    this.offset = 0;
  }

  count() {
    if (!this.start) {
      this.start = new Date().getTime();
      setTimeout(this.timer.bind(this), 10);
    }
  }

  timer() {
    if (!this.start) {
      return;
    }

    this.time += 10;

    // not ready to figure out why 600 is the most accurate, but it works with a slight lag starting at a minute TODO: Figure out better maths
    let elapsed = (Math.floor(this.time) / 600) + Number(this.offset);

    if (!elapsed.toFixed) {
      console.log('elapsed', elapsed, 'time', this.time, 'math', (Math.floor(this.time) / 600), 'offset', this.offset);
    }

    let seconds = elapsed.toFixed(2);

    this.setState({seconds});

    let diff = (new Date().getTime() - this.start) - this.time;
    if (this.props.seconds > elapsed) {
      setTimeout(this.timer.bind(this), (10 - diff));
    } else {
      this.setState(this.getStateFromStatus('done'));
    }
  }

  clear() {
    this.start = null;
    this.time = 0;
    this.offset = 0;
  }

  pause() {
    this.start = null;
    this.time = 0;
    this.offset = this.state.seconds;
  }

  getStateFromStatus(status) {
    switch(status) {
      case 'done':
        return {status, seconds: this.props.seconds, btnText: 'Start', btnColor: colors.action, icon: getIcon('play'), handlerStatus: 'count'};
      case 'stop':
        this.clear();
        return {status, seconds: 0, btnText: 'Start', btnColor: colors.action, icon: getIcon('play'), handlerStatus: 'count'};
      case 'count':
        this.count();
        return {status, seconds: this.state.seconds, btnText: 'Pause', btnColor: colors.three, icon: getIcon('pause'), handlerStatus: 'pause'};
      case 'pause':
        this.pause();
        return {status, seconds: this.state.seconds, btnText: 'Start', btnColor: colors.action, icon: getIcon('play'), handlerStatus: 'count'};
    }
  }

  render() {
    let { seconds } = this.state;
    return (
      <View>
        <View style={{alignItems: 'flex-end'}}>
          <Icon
            raised
            name='close'
            type='font-awesome'
            color={colors.darkness}
            onPress={() => this.props.onClose()} />
          </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{textAlign: 'center', flex: 1}} h2>{seconds + ' / ' + this.props.seconds}</Text>
        </View>
        <Button
          backgroundColor={this.state.btnColor}
          icon={this.state.icon}
          title={this.state.btnText}
          onPress={() => { this.setState(this.getStateFromStatus(this.state.handlerStatus)) }} />
        <Button
          backgroundColor={colors.stop}
          icon={getIcon('stop')}
          title='Stop'
          onPress={() => { this.setState(this.getStateFromStatus('stop')) }} />
      </View>
    );
  }
}

/*
  0.00
  start/pause colors.stop
*/

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  startOnRender: PropTypes.bool,
  noTimeLimit: PropTypes.bool,
  onClose: PropTypes.func
};

Timer.defaultProps = {
  startOnRender: false,
  noTimeLimit: false,
  onClose: () => { console.log('timer colors.stopped'); }
};