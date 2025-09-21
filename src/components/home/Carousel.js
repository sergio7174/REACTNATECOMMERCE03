import React, { useRef, useState } from "react";
import { View, Dimensions, Image, StyleSheet, Text } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";
//import { Colors } from "react-native/Libraries/NewAppScreen";

const { width } = Dimensions.get("window");

const CarouselSnap = () => {

  const slides = [
    { image: require("../../assets/slider1.png") },
    { image: require("../../assets/slider2.png") },
    { image: require("../../assets/slider4.png") },
    //   {image: require("../../assets")}
  ];


  return (
    <>
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides.map((slide) => slide.image)}
        dotColor={COLORS.black}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{
          borderRadius: 25,
          marginTop: 15,
          width: "99%",
          height: 160,
        }}
        autoplay
        circleLoop
      />
    </View>
    </>
  );
};

export default CarouselSnap;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 15,
    marginLeft: 15,
    marginBottom: -7,
  },
});
