/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import Tile from './components/Tile';
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

class MainScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    CheckinsInLastWeek: {text:"Checkins Last Week", value:0},
    latestCheckinTime: {text:"Latest Checkin", value:""},
    latestVoltage: {text:"Latest Voltage", value:0},
    highestVoltage: {text:"Highest Volatage", value:0},
    highestVoltageTime: {text:"Highest Voltage Time", value:0},
    lowestVoltage: {text:"Lowest Voltage", value:0},
    lowestVoltageTime: {text:"Lowest Voltage Time", value:0}
    }
    this.getTileData = this.getTileData.bind(this)
    this.updateTiles = this.updateTiles.bind(this)
  }

  updateTiles(responseJson){
    var oldVars = this.state
    var resKeys = Object.keys(oldVars)
    for (var key in responseJson){
      if (resKeys.includes(key)){

        oldVars[key].value = responseJson[key]
      }
    }
    this.setState({oldVars})
  }

  getTileData(){
    return fetch('https://boatbutlerfunctionapp.azurewebsites.net/api/device/e00fce685be17a37c00ccb56?code=TwsDCl8RrynL9h51TaJ5kNdUY2xnU0oJXxWGgxqCN7oZ0gMxM7gcnw==')
      .then((response) => response.json())
      .then((responseJson) =>{
        console.log(responseJson)
        this.updateTiles(responseJson)
      })
      .catch(function(error){
        console.log(error.message)
        throw error;
      })
  }


  render(){
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
          {/*change to be closer to theo's mockup*/}

            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              {/*These three views will be replaced with Tile components with the props passed down*/}

              <Tile tileStyle={styles.tile} contentStyle={styles.tileData} content={[this.state.CheckinsInLastWeek, this.state.latestCheckinTime]} title={"Battery"} />
              <Tile tileStyle={styles.tile} contentStyle={styles.tileData} content={[this.state.latestVoltage, this.state.highestVoltage, this.state.highestVoltageTime, this.state.lowestVoltage, this.state.lowestVoltageTime]} title={"Bilge"} />
              <Button onPress={this.getTileData} title="Refresh" color="#841584"/>
              <Button onPress={() => this.props.navigation.navigate('Settings')} title="Settings"/>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  };
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.gray,
  },
  sectionContainer: {
    marginTop: 32,
    marginHorizontal: 24,
    backgroundColor: Colors.black
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  tile:{
    backgroundColor: 'white',
    marginTop: 24,
    marginHorizontal: 24,
    borderColor: 'black',
    flex: 1,
  },
  tileData:{
    textAlign: 'center'
  },
  container: {
    flex: 1,
  },
});

class SettingsScreen extends React.Component {
  render(){
    return (
      <View>
        <Text>Test</Text>
      </View>
      )
  }

}

const RootStack = createStackNavigator(
  {
    Main: MainScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Main',
  }
);



const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

