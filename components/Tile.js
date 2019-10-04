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
            <Text>{this.props.title}</Text>
            {this.props.content.map((line, index)=>
              <Text style={this.props.contentStyle}>{line.text} -- {line.value}</Text>
            )}


      </View>
    );
  }
};

