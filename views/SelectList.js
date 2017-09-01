import React from 'react';
import { StyleSheet, title, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import Reflux from 'reflux';
import { NavigationActions } from 'react-navigation';

export default class SelectList extends Reflux.Component {
  listItemClick(value) {
    let params = this.props.navigation.state.params;
    params.state[params.key] = value;
    // make service that goes back with params and navigates by passing state
    const navigateAction = NavigationActions.navigate({
      routeName: params.view,
      params: { state: params.state },
      action: NavigationActions.navigate({ routeName: params.view })
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderListItems(options) {
    return options.map((option) => {
       return <ListItem key={option.value} title={option.title} onPress={() => this.listItemClick(option)} />
    });
  }

  render() {
    const { navigate, state: { params } } = this.props.navigation;
    return (
      <List>
        {this.renderListItems(params.options)}
      </List>
    );
  }
}


// @@@@@ USE SIMPLE PICKER SINCE NOW IT WORKS!!!!
/*
<SimplePicker
          ref={'picker'}
          options={options}
          onSubmit={(option) => {
            this.setState({
              selectedOption: option,
            });
          }}
        />
*/

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });