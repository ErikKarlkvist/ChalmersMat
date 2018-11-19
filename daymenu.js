/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableHighlight
} from "react-native";
import {
  checkOpen,
  karen,
  express,
  ls,
  fetchMenu,
  kokboken,
  linsen
} from "./fetchmenu.js";

export default class DayMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expressMenu: [],
      karenMenu: [],
      linsenMenu: [],
      lsMenu: [],
      kokbokenMenu: [],
      refreshing: false
    };
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.update();
    this.setState({ refreshing: false });
  }

  componentDidMount() {
    this.update();
  }

  update() {
    fetchMenu(express).then(val => {
      this.setState({ expressMenu: val });
    });

    fetchMenu(karen).then(val => {
      this.setState({ karenMenu: val });
    });

    fetchMenu(ls).then(val => {
      this.setState({ lsMenu: val });
    });

    fetchMenu(kokboken).then(val => {
      this.setState({ kokbokenMenu: val });
    });

    console.log(linsen);
    // fetchMenu(linsen).then(val => {
    //   console.log(val);
    //   this.setState({ linsenMenu: val });
    // });
  }

  displayMenu(rest) {
    if (rest == undefined)
      return (
        <View>
          <Text style={{ fontSize: 16, fontStyle: "italic", color: "#dddddd" }}>
            Closed for the weekend.
          </Text>
        </View>
      );
    else {
      return rest.map(x => {
        //console.log(x);
        return (
          <View key={x.id}>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, color: "#dddddd" }}
            >
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
        );
      });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.welcome}>ChalmersMat</Text>
          </View>

          {/*L's Kitchen */}
          <TouchableHighlight
            onPress={() =>
              navigate("WeekMenu", {
                name: "L's Kitchen",
                apiURL: ls
              })
            }
          >
            <View style={[styles.menus, { backgroundColor: "#212121" }]}>
              <Text style={styles.titleText}>L's Kitchen</Text>
              {this.displayMenu(this.state.lsMenu)}
            </View>
          </TouchableHighlight>

          {/*Kokboken */}
          <TouchableHighlight
            onPress={() =>
              navigate("WeekMenu", {
                name: "Kokboken",
                apiURL: kokboken
              })
            }
          >
            <View style={[styles.menus, { backgroundColor: "#8c5252" }]}>
              <Text style={styles.titleText}>Kokboken</Text>
              {this.displayMenu(this.state.kokbokenMenu)}
            </View>
          </TouchableHighlight>

          {/*Kårrestaurangen */}
          <TouchableHighlight
            onPress={() =>
              navigate("WeekMenu", {
                name: "Kårrestaurangen",
                apiURL: karen
              })
            }
          >
            <View style={[styles.menus, { backgroundColor: "#212121" }]}>
              <Text style={styles.titleText}>Kårrestaurangen</Text>
              {this.displayMenu(this.state.karenMenu)}
            </View>
          </TouchableHighlight>

          {/*Express Johanneberg */}
          <TouchableHighlight
            onPress={() =>
              navigate("WeekMenu", {
                name: "Express",
                apiURL: express
              })
            }
          >
            <View style={[styles.menus, { backgroundColor: "#8c5252" }]}>
              <Text style={styles.titleText}>Express</Text>
              {this.displayMenu(this.state.expressMenu)}
            </View>
          </TouchableHighlight>

          {/*Linsen doesn't work 
          <TouchableHighlight>
            <View style={[styles.menus, { backgroundColor: "#FFD740" }]}>
              <Text style={styles.titleText}>Linsen</Text>
              {this.displayMenu(this.state.linsenMenu)}
            </View>
          </TouchableHighlight>
          */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8c5252"
  },
  header: {
    flex: 1,
    padding: 30,
    backgroundColor: "#8c5252"

    // backgroundColor: 'green'
  },
  menus: {
    flex: 1,
    padding: 15
    // backgroundColor: 'green'
  },
  welcome: {
    fontSize: 48,
    textAlign: "center",
    color: "#dddddd"
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dddddd"
  },
  contentContainer: {
    // marginBottom: 40
    // paddingTop: 40,
    // backgroundColor: "blue"
  }
});
