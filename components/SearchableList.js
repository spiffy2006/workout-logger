import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import fuzzy from 'fuzzy';
import { SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class SearchableList extends React.Component {
  constructor(props) {
    super(props);
    this.originalList = JSON.parse(JSON.stringify(props.list)); // no passing by reference Grrr
  }
  
  getListItemByName(name) {
    let newList = [];
    let { originalList } = this;
    for (let i = 0; i < originalList.length; i++) {
      if (originalList[i].name === name) {
        return originalList[i];
      }
    }
  }

  render() {
    let nameList = this.originalList.map(item => item.name);
    return (
      <View>
        <SearchBar
            onChangeText={(search) => {
              let filtered = fuzzy.filter(search, nameList);
              this.props.onFilter(filtered.map(el => this.getListItemByName(el.string)));
            }}
            placeholder={this.props.placeholder} />
          <ScrollView style={{height: 500}}>{/* OK...spent way too much time trying to make the height fit the remainder of the screen and not be the height of the children...TODO */}
            {this.props.children}
          </ScrollView>
      </View>
    );
  }
}

SearchableList.propTypes = {
  placeholder: PropTypes.string,
  list: PropTypes.array,
  onPress: PropTypes.func
};

SearchableList.defaultProps = {
  placeholder: 'Search...',
  list: [],
  onFilter: list => console.log(list)
};