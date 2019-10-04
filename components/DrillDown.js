import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView
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
        <ScrollView>
          <Text style={{textAlign: 'center', paddingBottom: 3}}>
            Battery Voltage History
          </Text>
          {this.props.screenProps.batteryChart.map((line, index)=>
              <Text key={index} style={{textAlign: 'center', paddingTop: 3}}>{line.Voltage} -- {line.Published_At}</Text>
            )}
        </ScrollView>
      )
  }
}
