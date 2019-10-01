import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class Tile extends Component {
  render() {
    return (
      <View style={this.props.tileStyle}>
        {/*pass down the title style and put it in*/}
        <Text>{this.props.title}</Text>

        {/*use ternary operator in the style brackets to change style based on whether theres a title*/}
        {this.props.content.map((line, index)=>
          <Text style={this.props.contentStyle}>{line.text} -- {line.value}</Text>

        )}


      </View>
    );
  }
};

