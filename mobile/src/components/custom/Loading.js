import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
const Loading = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: props.backgroundColor === 'none' ? undefined : props.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1
      }}
    >
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={'#A680CD'} />
      </View>
    </View>
  )
}

Loading.defaultProps = {
  backgroundColor: "#00000036"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Loading