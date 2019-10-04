import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class Tile extends Component {
  render() {
    return (
      <View style={this.props.tileStyle}>
            <Text style={{textAlign: 'center', paddingBottom:6}}>{this.props.title}</Text>
            {this.props.content.map((line, index)=>
              <Text key={index} style={this.props.contentStyle}>{line.text} -- {line.value}</Text>
            )}


      </View>
    );
  }
};

