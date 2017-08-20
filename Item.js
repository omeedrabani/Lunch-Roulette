import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Clipboard } from 'react-native';
import Layout from './Layout.js';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      showAddressCopiedToClipboardMessage: false
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
        <TouchableOpacity
          style={ [styles.headerButton, { backgroundColor: 'skyblue', margin: 5 }] }
          onPress={ () => alert("open yelp link: " + this.state.item.url) }
          underlayColor="white">
          <Text>Go to Yelp</Text>
        </TouchableOpacity>
      </View>
    );
  }

  body() {
    return (
      <ScrollView>
        <View style={ styles.body }>
          <View style={ styles.descriptionContainer }>
            <Text>Name: { this.state.item.name }</Text>

            <Text>Price: { this.state.item.price }</Text>
            <Text>Rating: { this.state.item.rating }</Text>
            <Text># Reviews: { this.state.item.review_count }</Text>
            { this.openNow() }
            { this.categories() }
            <Text>Distance: { this.state.item.distance }</Text>
            { this.transactions() }
          </View>

          <View style={ styles.photoContainer }>
            <Image source={{ uri: this.state.item.image_url }}
                   style={{ width: 400, height: 300 }}
                   resizeMode={ 'contain' }/>
          </View>

          { this.addressButton() }
          { this.addressCopiedToClipboardMessage() }
        </View>
      </ScrollView>
    );
  }

  openNow() {
    if (!this.state.item.is_closed) {
      return (
        <Text>Open Now!</Text>
      );
    }
  }

  categories() {
    if (this.state.item.categories.length > 0) {
      var categoriesList = this.state.item.categories.map(function(category) {
        return category.title;
      })
      return (
        <Text>Categories: { categoriesList.join(", ") }</Text>
      );
    }
  }

  transactions() {
    if (this.state.item.transactions.length > 0) {
      return (
        <Text>Options: { this.state.item.transactions.join(", ") }</Text>
      );
    }
  }

  addressButton() {
    return (
      <TouchableOpacity
        style={ [styles.headerButton, { backgroundColor: 'skyblue', margin: 5 }] }
        onPress={ () => alert("open maps!") }
        onLongPress={ () => this.copyAddressToClipboard() }
        underlayColor="white">
        <Text>
          { this.state.item.location.address1 } { this.state.item.location.address2 } { this.state.item.location.address3 }
        </Text>
        <Text>
          { this.state.item.location.city }, { this.state.item.location.state } { this.state.item.location.zip_code }
        </Text>
      </TouchableOpacity>
    );
  }

  addressCopiedToClipboardMessage() {
    if (this.state.showAddressCopiedToClipboardMessage) {
      return(
        <Text>Address copied to clipboard!</Text>
      );
    }
  }

  copyAddressToClipboard() {
    var location = this.state.item.location;
    var streetAddress = [location.address1, location.address2, location.address3].join(" ");
    var cityAddress = location.city + ", " + location.state + " " + location.zip;
    var fullAddress = streetAddress + " " + cityAddress;

    Clipboard.setString(fullAddress);

    this.setState({ showAddressCopiedToClipboardMessage: true });
    setTimeout(function() {
      this.setState({ showAddressCopiedToClipboardMessage: false });
    }.bind(this), 1000);
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
  descriptionContainer: {
    alignSelf: 'stretch',
    margin: 5
  },
  photoContainer: {
    flex: 1,
    margin: 5
  }
})

