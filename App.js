import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import Main from './Main.js';
import Search from './Search.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      viewToShow: "Main",
      items: []
    };

    this.changeView = this.changeView.bind(this);
    this.addItem    = this.addItem.bind(this);
    this.clearItems = this.clearItems.bind(this);
  }

  render() {
    switch(this.state.viewToShow) {
      case "Main": 
        return this.renderMain();  
      case "Search":
        return this.renderSearch();
      default:
        return this.renderOther();  
    }
  }

  renderMain() {
    return (
      <View style={ styles.container }>
        <Main changeView={ this.changeView } items={ this.state.items } clearItems={ this.clearItems }/>
      </View>
    );
  }

  renderSearch() {
    return (
      <View style={ styles.container }>
        <Search changeView={ this.changeView } addItem={ this.addItem }/>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 25,
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
