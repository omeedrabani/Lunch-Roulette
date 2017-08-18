import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Alert, FlatList } from 'react-native';
import Layout from './Layout.js';

export default class Main extends React.Component {
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
        onPress={ () => alert("Left Button pressed!") }
        underlayColor="white">
        <Text>
          MainLB
        </Text>
      </TouchableOpacity>
    );
  }

  rightButton() {
    return (
      <TouchableOpacity
        style={ styles.headerButton }
        onPress={ this.props.clearItems }
        underlayColor="white">
        <Text>
          Clear
        </Text>
      </TouchableOpacity>
    );
  }

  body() {
    return (
      <View style={ styles.body }>
        <TouchableOpacity
          style={ styles.searchButton }
          onPress={ () => this.props.changeView("Search") }
          underlayColor="white">
          <Text style={{  fontSize: 30, margin: 20 }}>
            Search
          </Text>
        </TouchableOpacity>

        <View style={ styles.listContainer }>
          <FlatList
            data={this.props.items}
            renderItem={ (item) => this.componentForItem(item.item) }
            keyExtractor={ (item, index) => index }
          />
        </View>
      </View>
    );
  }

  componentForItem(item) {
    return (
      <TouchableHighlight
        onPress={ () => alert(item + " pressed!") }
        underlayColor="white">
        <View style={ styles.item }>
          <Text style={ fontSize: 24 }>
            { item.name }
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'khaki'
  },
  headerButton: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "lightseagreen",
    margin: 20
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 100,
    margin: 20,
    padding: 10,
    backgroundColor: 'peru'
  }
})
