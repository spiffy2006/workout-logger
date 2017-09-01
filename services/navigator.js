import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Navigator {
  constructor(routeMap, options = {}) {
    this.routeMap = routeMap;
    this.options = options;
    this.stackNavigator = StackNavigator(this.routeMap, this.options);
  }

  getNavWrapper() {
    return this.stackNavigator;
  }
}