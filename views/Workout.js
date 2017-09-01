import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Reflux from 'reflux';

export default class Workout extends Reflux.Component {
  onNameChange(e) {
    console.log(e);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Workout</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});