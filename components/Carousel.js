//-------------------------------- general imports ------------------------------
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import CarouselItem from "./CarouseItem";

//-------------------------------- general imports ------------------------------

//get width height of the current window
const { width, heigth } = Dimensions.get("window");
//---------------------------------------

//function for scrolling infinitly through the items every three seconds
function infiniteScroll(dataList, mySlide) {
  const numberOfData = dataList.length;
  let scrollValue = 0,
    scrolled = 0;

  setInterval(function () {
    scrolled++;
    if (scrolled < numberOfData) scrollValue = scrollValue + width;
    else {
      scrollValue = 0;
      scrolled = 0;
    }
    if (mySlide && mySlide.current && mySlide.current.scrollToOffset)
      mySlide.current.scrollToOffset({
        animated: true,
        offset: scrollValue,
      });
  }, 3000);
}
//-------------------------------------------

//function for rendering the flat list view items with a fading animation
const Carousel = ({ data, navigation }) => {
  const mySlide = useRef();

  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState(data);

  useEffect(() => {
    setDataList(data);
    infiniteScroll(dataList, mySlide);
  });

  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          ref={mySlide}
          keyExtractor={(item, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CarouselItem item={item} navigation={navigation} />;
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
        <View style={styles.dotView}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: "#595959",
                  margin: 10,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
  return null;
};
//-----------------------------------------------------------------------------------

//************************  STYLESHEET ****************************** */
const styles = StyleSheet.create({
  dotView: { flexDirection: "row", justifyContent: "center" },
});

//========================== EXPORT ============================
export default Carousel;
//========================== EXPORT ============================
