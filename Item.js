import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from './Layout.js';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    };
  }

  render() {
    return (
      <Layout
        leftButton={ this.leftButton() }
        rightButton={ this.rightButton() }
        body={ this.body() }
      />
    );
  }

  leftButton() {
    return (
      <TouchableOpacity
        style={ styles.headerButton }
        onPress={ () => this.props.changeView("Main") }
        underlayColor="white">
        <Text>
          Go Back
        </Text>
      </TouchableOpacity>
    );
  }

  rightButton() {
    return (
      <View style={ styles.headerButton }>
        <Text>
          RightItemB
        </Text>
      </View>
    );
  }

  body() {
    return (
      <View style={ styles.body }>
        <Text>
          Item Name:
          { this.state.item.name }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'ivory'
  },
  headerButton: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

