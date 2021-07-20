import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  View,
  Animated,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import size from "../../res/size";
import image from "../../res/image";
import font from "../../res/font";
// import { getStatusBarHeight } from "../../res/values/getStatusBarHeight";

let colorList = {
  success: '#2EB553',
  warning: '#EB7231',
  error: '#FF4D4F'
}

const SnackBar = forwardRef((props, ref) => {
  const { time } = props;

  const _animatedSnackbar = useRef(new Animated.Value(0)).current;

  const [label, setLabel] = useState('')
  const [type, setType] = useState('success')

  useEffect(() => { }, []);

  showSnackBar = () => {
    Animated.timing(_animatedSnackbar, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  hideSnackBar = () => {
    Animated.timing(_animatedSnackbar, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useImperativeHandle(ref, () => ({
    showSnackBar: (label, type) => {
      setLabel(label)
      setType(type)
      showSnackBar();
      setTimeout(() => {
        hideSnackBar();
      }, time);
    },
  }));

  let backgroundColor = "";
  let icon

  switch (type) {
    case 'success':
      backgroundColor = colorList.success
      icon = image.circleChecked
      break;
    case 'warning':
      backgroundColor = colorList.warning
      icon = image.warning
      break;
    case 'error':
      backgroundColor = colorList.error
      icon = image.error
      break;
    default:
      backgroundColor = colorList.success
      icon = image.warning
      break;
  }

  const labelStyle = {
    top: _animatedSnackbar.interpolate({
      inputRange: [0, 1],
      outputRange: [-200, 0],
    }),
    width: "100%",
    backgroundColor: backgroundColor,
    position: "absolute",
    paddingHorizontal: 18,
    zIndex: 99,
  };



  return (
    <Animated.View style={labelStyle}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginTop: Platform.OS == "android" ? getStatusBarHeight() : 0,
        }}
      >
        <Image
          resizeMode="contain"
          source={icon}
          style={{
            width: props.size * 1.5,
            height: props.size * 1.5,
          }}
        />
        <Text
          style={{
            fontSize: props.size,
            color: '#ffffff',
            paddingVertical: props.size,
            paddingHorizontal: size.s20,
            fontFamily: font.regular
          }}
        >
          {label}
        </Text>
      </SafeAreaView>
    </Animated.View>
  );
});

SnackBar.defaultProps = {
  label: "This is the title",
  time: 3000,
  type: "default",
  size: 16,
};

export default SnackBar;
