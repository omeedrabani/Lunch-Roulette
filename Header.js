import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={ this.props.style }>
        <View style={ styles.button }>
          { this.props.leftButton }
        </View>
        <View style={ styles.middle }>
          <Text>App Name & Logo</Text>
        </View>
        <View style={ styles.button }>
          { this.props.rightButton }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  middle: {
    flex: 4,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'turquoise',
  },
  button: {
    flex: 1,
    backgroundColor: 'skyblue'
  }
})
