import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Button, Animated, Text } from 'react-native';
import { AppLoading } from 'expo';

export default class App extends Component {
  constructor() {
    super();
    this.animated = new Animated.Value(0);

    var range = 1,
      snapshot = 50,
      radius = 100;
    /// translateX
    var inputRange = [],
      outputRange = [];
    for (var i = 0; i <= snapshot; ++i) {
      var value = i / snapshot;
      var move = Math.sin(value * Math.PI * 2) * radius;
      inputRange.push(value);
      outputRange.push(move);
    }
    this.translateX = this.animated.interpolate({ inputRange, outputRange });

    /// translateY
    var inputRange = [],
      outputRange = [];
    for (var i = 0; i <= snapshot; ++i) {
      var value = i / snapshot;
      var move = -Math.cos(value * Math.PI * 2) * radius;
      inputRange.push(value);
      outputRange.push(move);
    }
    this.translateY = this.animated.interpolate({ inputRange, outputRange });
  }

  animate() {
    this.animated.setValue(0);
    Animated.timing(this.animated, {
      toValue: 1,
      duration: 1000,
    }).start();
  }

  render() {
    const transform = [{ translateY: this.translateY }, { translateX: this.translateX }];
    return (
      <View style={styles.container}>
        <Animated.View style={[{ transform }]}>
          <TouchableOpacity style={styles.btn}>
            <Text>hallo</Text>
          </TouchableOpacity>
        </Animated.View>
        <Button
          title='Test'
          onPress={() => {
            this.animate();
          }}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  btn: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
});
