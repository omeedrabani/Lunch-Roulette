import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={ this.props.style }>
        <View style={ styles.leftButton }>
          { this.props.leftButton }
        </View>
        <View style={ styles.middle }>
          <Text>App Name & Logo</Text>
        </View>
        <View style={ styles.rightButton }>
          { this.props.rightButton }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftButton: {
    flex: 1,
    backgroundColor: 'steelblue'
  },
  middle: {
    flex: 4,
    backgroundColor: 'darkorange',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButton: {
    flex: 1,
    backgroundColor: 'steelblue'
  }
})
