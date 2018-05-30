import React, { Component } from 'react';
import { Animated, Easing, View, Text } from 'react-native';

export class Logo extends Component {
  constructor(props) {
    super(props);
    this.imageSize = new Animated.Value(0.3);
  }

  componentDidMount() {
    this.animateImage();
  }

  animateImage() {
    this.imageSize.setValue(0.3);
    Animated.spring(this.imageSize, {
      toValue: 1,
      friction: 1,
    }).start();
  }

  render() {
    return (
      <Animated.Image
        style={{
          padding: 50,
          marginTop: 88,
          width: 200,
          height: 200,
          transform: [{ scale: this.imageSize }],
        }}
        source={require('../images/brian.png')}
      />
    );
  }
}
