import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

export default class DrillDown extends Component {

  //will want to change this to a Navigation event to get new data each time the drilldown is opened
  componentDidMount(){
    //update = this.props.navigation.getParam('update');
    //update()

    this.props.screenProps.getBatteryDrillDown()
    console.log(this.props.screenProps)
  }

  render(){
    return(
        <View>
          <Text>{this.props.screenProps.ddTest}</Text>
          <Text>{JSON.stringify(this.props.navigation.getParam('stuff', 'test'))}</Text>
        </View>
      )
  }
}
