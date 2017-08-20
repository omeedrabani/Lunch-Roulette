import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert, TextInput, Picker, Keyboard } from 'react-native';
import Layout from './Layout.js';

/*
  User Facing:
  ####################
  term: string
  location: string (or lat/long)
  max_distance: (radius) int
  cost: $, $$, $$$, $$$$ (1-4)
  open_now: boolean

  Internal
  ####################
  limit: int (make this user facing?)
  offset: depends on limit I guess
  sort_by: idk if we'll need this for MVP, maybe use it for sorting by rating
*/

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.searchParams) {
      this.state = this.props.searchParams;
    } else {
      this.state = {
        term: "",
        location: "",
        maxDistance: "", // TODO: change to int input format
        cost: [false, false, false, false],
        openNow: false,
        limit: "" // TODO: change to int input format
      };
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
        onPress={ () => this.cancelPressed() }
        underlayColor="white">
        <Text>
          X
        </Text>
      </TouchableOpacity>
    );
  }

  rightButton() {
    return (
      <TouchableOpacity
        style={ styles.headerButton }
        onPress={ () => alert("Right button pressed!") }
        underlayColor="white">
        <Text>
          SearchRB
        </Text>
      </TouchableOpacity>
    );
  }

  body() {
    return (
      <View style={ styles.body }>
        <ScrollView>
          <Text style={{ marginTop: 10, marginLeft: 10 }}>Location:</Text>
          <TextInput
            style={ styles.textInput }
            placeholder={ '"42 Wallaby Way, Sydney", "90210", etc.' }
            onChangeText={ (location) => this.setState({ location: location }) }
            keyboardType={ 'ascii-capable' }
            onSubmitEditing={ Keyboard.dismiss }
            value={ this.state.location || "" }
          />

          <Text style={{ marginTop: 5, marginLeft: 10 }}>Search Term:</Text>
          <TextInput
            style={ styles.textInput }
            placeholder={ '"food", "restaurants", "coffee", etc.' }
            onChangeText={ (term) => this.setState({ term: term }) }
            keyboardType={ 'ascii-capable' }
            onSubmitEditing={ Keyboard.dismiss }
            value={ this.state.term || "" }
          />

          <View style={ styles.costContainer }>
            { this.costButton(1) }
            { this.costButton(2) }
            { this.costButton(3) }
            { this.costButton(4) }
          </View>

          <TouchableWithoutFeedback
            onPress={ () => this.switchOpenNow() }>
            <View style={ this.openNowStyle() }>
              <Text style={{ fontSize: 20 }}>
                Open Now
              </Text>
            </View>
          </TouchableWithoutFeedback>

          { this.maxDistanceContainer() }
          { this.searchLimitContainer() }

          <TouchableOpacity
            style={ styles.goButton }
            onPress={ () => this.goPressed() }
            underlayColor="white">
            <Text style={{  fontSize: 30, margin: 20 }}>Go!</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  costViewStyle(cost) {
    if (this.state.cost[cost - 1]) {
      return styles.pressedOption;
    } else {
      return styles.unpressedOption;
    }
  }

  openNowStyle() {
    var style = [styles.openNow];
    if (this.state.openNow) {
      style.push(styles.pressedOption);
    } else {
      style.push(styles.unpressedOption);
    }
    return style;
  }

  switchCost(cost) {
    var newCost = this.state.cost;
    var newCostValue = !this.state.cost[cost - 1];
    newCost[cost - 1] = newCostValue;
    this.setState({ cost: newCost });
  }

  switchOpenNow() {
   this.setState({ openNow: !this.state.openNow  });
  }

  costButton(cost) {
    return (
      <TouchableWithoutFeedback
        onPress={ () => this.switchCost(cost) }>
        <View style={ this.costViewStyle(cost) }>
          <Text style={{ fontSize: 20 }}>
            { "$".repeat(cost) }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  maxDistanceContainer() {
    return (
      <View style={ styles.maxDistanceAndLimitContainer }>
        <Text>Max Distance:</Text>
        <TextInput
          style={ [styles.textInput, { flex: 5 }] }
          placeholder={ "5" }
          onChangeText={ (maxDistance) => this.setState({ maxDistance: maxDistance.trim() }) }
          keyboardType={ 'number-pad' }
          value={ this.state.maxDistance || "" }
        />
        <Text>miles</Text>
      </View>
    );
  }

  searchLimitContainer() {
    return (
      <View style={ styles.maxDistanceAndLimitContainer }>
        <Text>Randomly select from first</Text>
        <TextInput
          style={ [styles.textInput, { flex: 2 }] }
          placeholder={ "20" }
          onChangeText={ (limit) => this.setState({ limit: limit.trim() }) }
          keyboardType={ 'number-pad' || 'numeric' }
          value={ this.state.limit || "" }
        />
        <Text>results</Text>
      </View>
    );
  }

  goPressed() {
    this.props.addItem(this.dummyItem());
    this.props.setSearchParams(this.state);
    this.props.changeView("Main");
  }

  cancelPressed() {
    this.props.setSearchParams(this.state);
    this.props.changeView("Main");
  }

  dummyItem() {
    return {
      "rating": 4,
      "price": "$",
      "phone": "+14152520800",
      "id": "four-barrel-coffee-san-francisco",
      "is_closed": false,
      "categories": [
        {
          "alias": "coffee",
          "title": "Coffee & Tea"
        }
      ],
      "review_count": 1738,
      "name": "Four Barrel Coffee",
      "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
      "coordinates": {
        "latitude": 37.7670169511878,
        "longitude": -122.42184275
      },
      "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
      "location": {
        "city": "San Francisco",
        "country": "US",
        "address2": "",
        "address3": "",
        "state": "CA",
        "address1": "375 Valencia St",
        "zip_code": "94103"
      },
      "distance": 1604.23,
      "transactions": ["pickup", "delivery"]
    };
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'ivory'
  },
  headerButton: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "lightseagreen",
    margin: 20
  },
  textInput: {
    height: 40,
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch'
  },
  costContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between'
  },
  maxDistanceAndLimitContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  openNow: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  pressedOption: {
    backgroundColor: 'skyblue',
    borderWidth: 1,
    alignItems: 'center',
    width: 50
  },
  unpressedOption: {
    backgroundColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    width: 50
  }
})
