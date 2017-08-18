import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Layout from './Layout.js';

export default class Search extends React.Component {
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
        <Text>
          Search Body
        </Text>

        <TouchableOpacity
          style={ styles.searchButton }
          onPress={ () => this.goPressed() }
          underlayColor="white">
          <Text style={{  fontSize: 30, margin: 20 }}>
            Go!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  goPressed() {
    this.props.addItem(this.dummyItem());
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
    alignItems: 'center',
    backgroundColor: 'khaki'
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
  }
})
