import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Alert, FlatList } from 'react-native';
import Layout from './Layout.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showClearItems: false
    }
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
        onPress={ () => alert("Left Button pressed!") }
        underlayColor="white">
        <Text>
          MainLB
        </Text>
      </TouchableOpacity>
    );
  }

  rightButton() {
    if (this.state.showClearItems) {
      return this.clearItemsButton();
    } else {
      return this.buttonForClearItemsButton();
    }
  }

  clearItemsButton() {
    setTimeout(function() {
      this.setState({ showClearItems: false });
    }.bind(this), 1000);

    return (
      <TouchableOpacity
        style={ styles.clearItemsButton }
        onPress={ () => this.clearItemsAndHideClearItemsButton() }
        underlayColor="white">
        <Text>
          Clear!
        </Text>
      </TouchableOpacity>
    );
  }

  buttonForClearItemsButton() {
    return (
      <TouchableOpacity
        style={ styles.headerButton }
        onPress={ () => this.setState({ showClearItems: true }) }
        underlayColor="white">
        <Text>
          Clear?
        </Text>
      </TouchableOpacity>
    );
  }

  body() {
    return (
      <View style={ styles.body }>
        <TouchableHighlight
          style={ styles.searchButton }
          onPress={ () => this.props.changeView("Search") }
          underlayColor="skyblue">
          <Text style={{  fontSize: 30, margin: 20, color: 'ivory' }}>
            Search
          </Text>
        </TouchableHighlight>

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
        onPress={ () => this.showItem(item) }
        underlayColor="ivory">
        <View style={ styles.item }>
          <Text style={{ fontSize: 20 }}>
            { item.name }
          </Text>
          <Text style={{ fontSize: 20 }}>
            Rating: { item.rating }
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  clearItemsAndHideClearItemsButton() {
    this.props.clearItems();
    this.setState({ showClearItems: false });
  }

  showItem(item) {
    this.props.setItemToShow(item);
    this.props.changeView("Item");
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
  },
  clearItemsButton: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  searchButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "royalblue",
    margin: 10
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: 'lightcoral'
  }
})
