import React, {Fragment} from 'react';
import Tile from './Tile';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableHighlight
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class MainScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    CheckinsInLastWeek: {text:"Checkins Last Week", value:0},
    LatestCheckinTime: {text:"Latest Checkin", value:""},
    LatestCheckinVoltage: {text:"Latest Voltage", value:0},
    HighestCheckinVoltage: {text:"Highest Volatage", value:0},
    HighestCheckinVoltageTime: {text:"Highest Voltage Time", value:0},
    LowestCheckinVoltage: {text:"Lowest Voltage", value:0},
    LowestCheckinVoltageTime: {text:"Lowest Voltage Time", value:0},
    ddTest: "winner"
    }
    this.getTileData = this.getTileData.bind(this)
    this.updateTiles = this.updateTiles.bind(this)
    //this.updateDrillDown = this.updateDrillDown.bind(this)
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



  updateDrillDown(){
    console.log(this.props.navigation.state)
    this.setState({ddTest: "double winner"})
  }

  getBatteryDrillDown(){
    //device ID will be fed through params when device auth is set up
    return fetch('https://boatbutlerfunctionapp.azurewebsites.net/api/device/e00fce685be17a37c00ccb56/batteryhistory')
    .then((response) => response.json())
    .then((responseJson) =>{
      console.log(responseJson)
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

            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}

            <View>
              <Text style={styles.name}>
                Boat Monitor
              </Text>
            </View>
            <View style={styles.body}>

              <Tile tileStyle={styles.tile} contentStyle={styles.tileData} content={[this.state.CheckinsInLastWeek, this.state.LatestCheckinTime]} title={"Device Health"} navigation={this.props.navigation} />
              <TouchableHighlight onPress = {() => this.props.navigation.navigate('DrillDown')}>
                <Tile tileStyle={styles.tile} contentStyle={styles.tileData} content={[this.state.LatestCheckinVoltage, this.state.HighestCheckinVoltage, this.state.HighestCheckinVoltageTime, this.state.LowestCheckinVoltage, this.state.LowestCheckinVoltageTime]} title={"Battery"} navigation={this.props.navigation}/>
              </TouchableHighlight>
            </View>
            <View style={styles.homeButtons}>
              <Button onPress={this.getTileData} title="Refresh"/>
              <Button  onPress={() => this.props.navigation.navigate('Settings')} title="Settings"/>
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
    name: {
      textAlign: 'center',
      fontWeight: 'bold',
      paddingTop: 12,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {

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
      textAlign: 'center',
      paddingTop: 3
    },
    container: {
      flex: 1,
      backgroundColor: Colors.gray,
    },
    homeButtons: {
      marginTop: 24,
      marginHorizontal: 24,
    },
  });
