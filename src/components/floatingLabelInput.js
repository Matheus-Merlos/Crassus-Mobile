import { useRef, useState } from "react";
import {
  TextInput,
  Animated,
  View,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { EyeOffSVG, EyeSVG } from "../constants/svgs";
import * as colors from "../constants/colors";

export default function FloatingLabelInput({
  label,
  value,
  setValueFunction,
  style,
  color = "#000",
  isPassword = false,
  width = 350,
  warningMessage = "",
}) {
  const [isVisible, setIsVisible] = useState(isPassword);

  const floatingLabelAnimation = useRef(
    new Animated.Value(value ? 1 : 0),
  ).current;

  function handleFocus() {
    Animated.timing(floatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }

  function handleBlur() {
    if (!value) {
      Animated.timing(floatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }

  const floatingLabelAnimationStyle = {
    top: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [5, -15],
    }),
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 16],
    }),
  };

  return (
    <View style={style}>
      <Animated.Text
        style={[
          {
            paddingLeft: 2.5,
            position: "absolute",
            fontFamily: "Inter-Bold",
            color,
          },
          floatingLabelAnimationStyle,
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={{
          borderBottomWidth: 0.75,
          borderBottomColor: color,
          maxHeight: 50,
          width,
          padding: 2.5,
          fontSize: 20,
          fontFamily: "Inter-Light",
          color,
          marginBottom: 25,
        }}
        accessibilityLabel={label}
        value={value}
        onChangeText={setValueFunction}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={isVisible}
      />
      <Text style={styles.warningMessage}>{warningMessage}</Text>
      {isPassword && (
        <Pressable
          onPress={() => setIsVisible(!isVisible)}
          style={styles.toggleViewButton}
        >
          {isVisible ? (
            <EyeSVG color={colors.BLACK} width={30} height={30} />
          ) : (
            <EyeOffSVG color={colors.BLACK} width={30} height={30} />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  toggleViewButton: {
    position: "absolute",
    right: 0,
  },
  warningMessage: {
    position: "absolute",
    top: 35,
    color: colors.PRIMARY_RED,
    fontFamily: "Inter-Bold",
  },
});
