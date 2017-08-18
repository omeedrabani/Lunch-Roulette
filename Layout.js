import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header.js';

export default class Layout extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <Header
          style={ styles.header }
          leftButton={ this.props.leftButton }
          rightButton= { this.props.rightButton }
        />
        <View style={ styles.body }>
          { this.props.body }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'ivory'
  },
  body: {
    flex: 11,
    flexDirection: 'column',
  }
})
