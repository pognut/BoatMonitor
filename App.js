/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import Tile from './components/Tile';
import DrillDown from './components/DrillDown';
import MainScreen from './components/MainScreen';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class SettingsScreen extends React.Component {
  render(){
    return (
      <View>
        <Text>Settings page: WIP </Text>
      </View>
      )
  }
//{JSON.stringify(this.props.navigation.getParam('stuff', 'test'))}
}


const RootStack = createStackNavigator(
  {
    Main: MainScreen,
    Settings: SettingsScreen,
    DrillDown: DrillDown
  },
  {
    initialRouteName: 'Main',
  }
);



const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    batteryChart: []
    }
    this.updateDrillDown = this.updateDrillDown.bind(this)
  }

  getBatteryDrillDown(){
    //device ID will be fed through params when device auth is set up
    return fetch('https://boatbutlerfunctionapp.azurewebsites.net/api/device/e00fce685be17a37c00ccb56/history?code=ToomhKaofx/wI4YU2GoBbCjIu9MJS9RLGrZ5RXGsgTe5VIGhuECUqA==')
    .then((response) => response.json())
    .then((responseJson) =>{
      console.log(responseJson)
      this.updateDrillDown(responseJson)
    })
    .catch(function(error){
      console.log(error.message)
      throw error;
    })
  }

  updateDrillDown(data){
    this.setState({batteryChart: data})
  }

  render() {
    return <AppContainer screenProps={{batteryChart:this.state.batteryChart, updateDrillDown: this.updateDrillDown, getBatteryDrillDown: this.getBatteryDrillDown}} />;
  }
}

