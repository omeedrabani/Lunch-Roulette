import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import Main from './Main.js';
import Search from './Search.js';
import Item from './Item.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewToShow: "Main",
      items: [],
      itemToShow: null,
      searchParams: null
    };

    this.changeView      = this.changeView.bind(this);
    this.addItem         = this.addItem.bind(this);
    this.clearItems      = this.clearItems.bind(this);
    this.setItemToShow   = this.setItemToShow.bind(this);
    this.setSearchParams = this.setSearchParams.bind(this);
  }

  render() {
    switch(this.state.viewToShow) {
      case "Main":
        return this.renderMain();
      case "Search":
        return this.renderSearch();
      case "Item":
        return this.renderItem();
      default:
        return this.renderOther();
    }
  }

  renderMain() {
    return (
      <View style={ styles.container }>
        <Main changeView={ this.changeView } items={ this.state.items } clearItems={ this.clearItems } setItemToShow={ this.setItemToShow }/>
      </View>
    );
  }

  renderSearch() {
    return (
      <View style={ styles.container }>
        <Search changeView={ this.changeView } addItem={ this.addItem } searchParams={ this.state.searchParams } setSearchParams={ this.setSearchParams }/>
      </View>
    );
  }

  renderItem() {
    return (
      <View style={ styles.container }>
        <Item changeView={ this.changeView } item={ this.state.itemToShow }/>
      </View>
    );
  }

  renderOther() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => alert("button pressed")} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Button</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  changeView(viewToShow) {
    this.setState({ viewToShow: viewToShow });
  }

  addItem(item) {
    var items = this.state.items;
    items.push(item);
    this.setState({ items: items });
  }

  clearItems() {
    this.setState({ items: [] });
  }

  setItemToShow(item) {
    this.setState({ itemToShow: item });
  }

  setSearchParams(params) {
    this.setState({ searchParams: params });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ivory',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 20,
    flexDirection: 'column'
  },
  button: {
    backgroundColor: '#000000',
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
  },
});
