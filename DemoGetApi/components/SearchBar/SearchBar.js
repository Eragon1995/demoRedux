import React, {Component} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';

const styles = require('./SearchBarStyles');

export default class SearchBar extends Component {
  render() {
    return(

      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder = 'Enter your search user'
          style = {styles.textInputSearch}
        />
        <TouchableOpacity
          style = {styles.textSearchButton}
        >
        </TouchableOpacity>
      </View>
    )
  }
}