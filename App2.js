import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, useAnimatedRef, measure, useDerivedValue, withSpring, withTiming, runOnUI } from 'react-native-reanimated';

const App = () => {
  const scrollY = useSharedValue(0);
  const viewRef = useAnimatedRef();

  const isScrolling = useState(false);

  const heightHeader = useSharedValue(0);

  const progress = useDerivedValue(() =>
    isScrolling ? withSpring(1, { duration: 1000 }) : withTiming(0)
    // open ? 1 : 0
  );

  useDerivedValue(() => {
    const measured = measure(viewRef);
    if (measured !== null) {
      const { x, y, width, height, pageX, pageY } = measured;
      console.log({ x, y, width, height, pageX, pageY });
    } else {
      console.warn('measure: could not measure view');
    }
  });

  // useEffect(() => {
  //   const viewHeight = measure(viewRef);
  //     console.log('View height:', viewHeight);
  //   // heightHeader.value = measure(viewRef).height;
  // }, [])

  // const onScroll = useAnimatedScrollHandler((event) => {
  //   scrollY.value = event.contentOffset.y;
  // });

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      // console.log({ ...event });
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
      console.log({ e });
      const viewHeight = measure(viewRef).height;
      console.log('View height:', viewHeight);
      // runOnUI(() => {
      //   "worklet";
      //   heightHeader.value = measure(viewRef).height;
      // })();
      heightHeader.value = measure(viewRef).height;
    },
    // onEndDrag: (e) => {
    //     isScrolling.value = false;
    // },
  });



  const animExpand = useAnimatedStyle(() => ({

    // listHeight.value = props.open ? withTiming(ITEM_HEIGHT * props.data.length, { duration: 500 }) : withTiming(0, { duration: 500 })
    height: heightHeader.value - scrollY.value
  }))


  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: Math.max(0, 300 - scrollY.value),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box]} >
        <View ref={viewRef}>
          <Text>
            awdmimwamdmamd
          </Text>
          <Text>
            awdmimwamdmamd
          </Text>
          <Text>
            awdmimwamdmamd
          </Text>
          <Text>
            awdmimwamdmamd
          </Text>
          <Text>
            awdmimwamdmamd
          </Text>
        </View>
      </Animated.View>
      <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll}>
        {/* Add content here */}
        <Text>
          awdmimwamdmamd
        </Text>
        <Text>
          awdmimwamdmamd
        </Text>
        <Text>
          awdmimwamdmamd
        </Text>
        <Text>
          awdmimwamdmamd
        </Text>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  box: {
    backgroundColor: 'grey',
    width: 200,
    // height:200
  },
});

export default App;
