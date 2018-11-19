/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { fetchWeekMenu } from "./fetchmenu.js";

export default class WeekMenu extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
      weekMenu: [],
      name: this.props.navigation.state.params.name
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    console.log(params);
    fetchWeekMenu(params.apiURL).then(val => {
      console.log(val);
      this.setState({ weekMenu: val });
    });
  }

  displayMenu(number) {
    const { params } = this.props.navigation.state;
    if (this.state.weekMenu[number] == undefined)
      return (
        <View>
          <Text style={{ fontSize: 16, fontStyle: "italic", color: "#dddddd" }}>
            No lunch today.
          </Text>
        </View>
      );
    else {
      return this.state.weekMenu[number].map(x => (
        <View key={x.id}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#dddddd" }}>
            {x.dishType}
          </Text>
          <View>
            <Text
              style={{ fontSize: 16, fontStyle: "italic", color: "#dddddd" }}
            >
              {x.dish}
            </Text>
          </View>
        </View>
      ));
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.welcome}>Veckomeny {this.state.name}</Text>
          </View>
          <View style={[styles.menus]}>
            <Text style={styles.titleText}>Måndag</Text>
            {this.displayMenu(0)}
          </View>

          <View style={[styles.menus]}>
            <Text style={styles.titleText}>Tisdag</Text>
            {this.displayMenu(1)}
          </View>

          <View style={[styles.menus]}>
            <Text style={styles.titleText}>Onsdag</Text>
            {this.displayMenu(2)}
          </View>

          <View style={[styles.menus]}>
            <Text style={styles.titleText}>Torsdag</Text>
            {this.displayMenu(3)}
          </View>

          <View style={[styles.menus]}>
            <Text style={styles.titleText}>Fredag</Text>
            {this.displayMenu(4)}
          </View>

          <View>
            <Button
              title="Tillbaka till dagsvy"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#212121"
  },
  header: {
    flex: 1,
    padding: 15,
    paddingTop: 30
    // backgroundColor: '#EEEEEE'

    // backgroundColor: 'green'
  },
  menus: {
    flex: 1,
    padding: 10,
    paddingLeft: 15
    // backgroundColor: '#EEEEEE'
  },
  welcome: {
    fontSize: 32,
    textAlign: "center",
    color: "#dddddd"
    // color: '#37474F'
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dddddd"
    // color: '#37474F'
  },
  contentContainer: {
    // marginBottom: 40
    // paddingTop: 40,
    // backgroundColor: "blue"
  }
});
