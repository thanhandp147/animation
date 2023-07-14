import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, ImageBackground, Image, Dimensions, Animated as AnimatedRN } from 'react-native'

import { Easing, Extrapolation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { call, useCode } from 'react-native-reanimated'
import Lottie from 'lottie-react-native';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import ListNoti from './ListNoti';
import Spotify from './Spotify';

const _width = Dimensions.get('window').width;
const _height = Dimensions.get('window').height;

console.disableYellowBox = true;

const nothing = props => {


  // const widthDynamicIsland = useRef(new Animated.Value(120)).current
  // const heightDynamicIsland = useRef(new Animated.Value(35)).current

  const fadeBG = useRef(new AnimatedRN.Value(0))?.current
  const opacityHasCalling = useRef(new AnimatedRN.Value(0))?.current


  const widthDynamicIsland = useSharedValue(120);
  const heightDynamicIsland = useSharedValue(35);
  const positionTopDynamicIsland = useSharedValue(10);
  const scaleFaceIdIcon = useSharedValue(0);

  const scaleIconWifi = useSharedValue(1);


  const DyIslandBorderRadius = useSharedValue(32)

  const animationLoadRef = useRef(null)
  const animationTickRef = useRef(null)

  const [blurValue, setBlurValue] = useState(0)


  const [showGifFaceId, setShowGifFaceId] = useState(false)
  const [unLockSuccess, setUnLockSuccess] = useState(false)

  const [hasCalling, setHasCalling] = useState(false)
  const [isInACall, setIsInACall] = useState(false)

  const [timerCount, setTimer] = useState(0)

  const [showListNoti, setShowListNoti] = useState(false)

  const [showSpotify, setShowSpotify] = useState(false)
  const [isMinimizeSpotify, setIsMinimizeSpotify] = useState(false);




  useEffect(() => {
  }, [])

  useEffect(() => {
    if (unLockSuccess) {
      setTimeout(() => {

        DyIslandBorderRadius.value = withTiming(120, {
          duration: 300,
        }, (isFinished) => {
          if (isFinished) {
          }
        });

        widthDynamicIsland.value = withTiming(_width - 16, {
          duration: 300,
        }, (isFinished) => {
          if (isFinished) {
          }
        });
        heightDynamicIsland.value = withTiming(35 * 2.25, {
          duration: 300,
        }, (isFinished) => {
          if (isFinished) {
          }
        });

        setTimeout(() => {
          setHasCalling(true)
          AnimatedRN.timing(opacityHasCalling, {
            toValue: 1,
            duration: 500,
          }).start(() => { });

          AnimatedRN.timing(fadeBG, {
            toValue: 10,
            duration: 350,
          }).start(() => { });

        }, 100);


      }, 2500);
    }
  }, [unLockSuccess])

  const dismiss = () => {
    setTimeout(() => {
      setUnLockSuccess(true)
      setTimeout(() => {
        setShowGifFaceId(false)
      }, 1500);

    }, 700);
  }

  useEffect(() => {
    if (showListNoti) {
      AnimatedRN.timing(fadeBG, {
        toValue: 10,
        duration: 350,
      }).start(() => { });
    } else {
      AnimatedRN.timing(fadeBG, {
        toValue: 0,
        duration: 350,
      }).start(() => { });
    }
  }, [showListNoti])

  useEffect(() => {
    if (showGifFaceId) {

      heightDynamicIsland.value = withTiming(120, {
        duration: 300,
      }, (isFinished) => {
        if (isFinished) {
          runOnJS(dismiss)();
        }
      });

      scaleFaceIdIcon.value = withTiming(50, {
        duration: 500,
      }, (isFinished) => {
        if (isFinished) {
        }
      });
    } else {
      // setUnLockSuccess(false)
      AnimatedRN.timing(fadeBG, {
        toValue: 0,
        duration: 350,
      }).start(() => { });
      heightDynamicIsland.value = withTiming(35, {
        duration: 250,
      })
    }
  }, [showGifFaceId])

  const _handleUnlockPhone = () => {
    setShowGifFaceId(true)
    AnimatedRN.timing(fadeBG, {
      toValue: 10,
      duration: 350,
    }).start(() => { });
  }


  const animatedDynamicIsland = useAnimatedStyle(() => {
    return {
      width: widthDynamicIsland.value,
      height: heightDynamicIsland.value,
      top: positionTopDynamicIsland.value
    };
  });
  const animatedFadeFaceId = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleFaceIdIcon.value
        }
      ],
    };
  });
  const animatedScaleIconWifi = useAnimatedStyle(() => {

    const interpolateWidth = interpolate(scaleIconWifi.value, [1, 0], [20, 0], { extrapolateRight: Extrapolation.CLAMP });

    return {
      transform: [
        {
          scale: scaleIconWifi.value
        },
      ],
      width: interpolateWidth
    }
  })

  const _handleHangDownCalling = () => {
    AnimatedRN.timing(fadeBG, {
      toValue: 0,
      duration: 350,
    }).start(() => { });


    AnimatedRN.timing(opacityHasCalling, {
      toValue: 0,
      duration: 250,
    }).start(() => {

      heightDynamicIsland.value = withTiming(35, {
        duration: 250,
      })
      widthDynamicIsland.value = withTiming(120, {
        duration: 250,
      })
      DyIslandBorderRadius.value = withTiming(32, {
        duration: 300,
      });
      setHasCalling(false)
      // setUnLockSuccess(false)
    });

  }

  const _handleHangUpCalling = () => {
    _handleHangDownCalling()
    setTimeout(() => {
      widthDynamicIsland.value = withTiming(220, {
        duration: 250,
      })
      setIsInACall(true)
      scaleIconWifi.value = withTiming(0, {
        duration: 500,
      });

      let interval = setInterval(() => {
        console.log('=====12121212======');

        setTimer(lastTimerCount => {
          return lastTimerCount + 1
        })
      }, 1000)

    }, 500);
  }

  const _minimizeSpotify = () => {
    // widthDynamicIsland.value = withTiming(100, {
    //   duration: 250,
    // })
    // heightDynamicIsland.value = withTiming(45, {
    //   duration: 250,
    // })
    positionTopDynamicIsland.value = withSequence(withTiming(4, { duration: 200 }), withTiming(10, { duration: 200 }))
    widthDynamicIsland.value = withSequence(withTiming(90, { duration: 200 }), withTiming(220, { duration: 400 }))
    heightDynamicIsland.value = withSequence(withTiming(45, { duration: 200 }), withTiming(35, { duration: 200 }))
    scaleIconWifi.value = withTiming(0, {
      duration: 800,
    });
    setIsMinimizeSpotify(true)

  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ImageBackground imageStyle={{ borderRadius: 32 }} source={{
        //  uri: `https://www.guidingtech.com/wp-content/uploads/Space-Black.jpg` 
      }} style={styles.container}>

        <AnimatedRN.Image
          blurRadius={fadeBG}
          style={{
            position: 'absolute',
            top: 0,
            width: _width,
            height: _height,
            left: 0,
            zIndex: -10,
            borderTopStartRadius: 32,
            borderTopEndRadius: 32,
          }}
          source={{
            uri: `https://mega.com.vn/media/news/1309_wallpaper-iPhone-14-Pro-Silver.jpg`
          }} />


        {/* <AnimatedRN.View style={{flex:1,position:'absolute',width:'100%',height:'100%'}}> */}
        {/* <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
            blurType='material'
            blurAmount={0}
            reducedTransparencyFallbackColor="white"
          /> */}
        {/* </AnimatedRN.View> */}

        {/* <AnimatedRN.Image
          blurRadius={fadeBG}
          style={[
            {
              width: 200,
              height: 200,
              position: 'absolute',
              top: 0,
              // width: _width,
              // height: _height,
              left: 0,
              zIndex: -10
            },
            // animatedFadeFaceId
          ]}
          source={{ uri: 'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/305456136_111116618401981_5951354566659943584_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=qeGjk_UXHiYAX__c0Kl&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT9z2EoktYlgDi-DYY7AG3o8eYSY_xQ0WK4DtsPP2VnSPg&oe=632066D6' }} /> */}

        {/* <TouchableOpacity
          style={{
            width: 100,
            height: 100, backgroundColor: 'red'
          }}
          onPress={_handleUnlockPhone}
        >
          <Text>awdawd</Text>
        </TouchableOpacity> */}

        <Animated.View style={[
          styles.dynamicIsland,
          animatedDynamicIsland,
          {
            borderRadius: DyIslandBorderRadius.value,
          }
        ]}>

          <TouchableOpacity
            disabled={unLockSuccess ? true : false}
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={_handleUnlockPhone}
          >

            {
              isMinimizeSpotify ?
                <>
                  <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image style={{
                        width: 26,
                        height: 26,
                        resizeMode: 'contain'
                      }} source={{uri:`https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/1200px-Spotify_App_Logo.svg.png`}} />
                      <Text style={{ color: '#4EDB65', fontSize: 14, fontWeight: '500', top: 1, marginLeft: 4 }}>
                      </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <Lottie
                      speed={1}
                      autoPlay={true}
                      loop={true}
                      style={{ width: 25, height: 25, borderRadius: 16 }}
                      // ref={animationLoadRef}
                      source={require('../Json/ringring.json')}
                    />
                  </View>
                </>
                :
                <></>
            }

            {
              isInACall ?
                <>
                  <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image style={{
                        width: 14,
                        height: 14,
                        resizeMode: 'contain'
                      }} source={require('../Image/iconCall.png')} />
                      <Text style={{ color: '#4EDB65', fontSize: 14, fontWeight: '500', top: 1, marginLeft: 4 }}>
                        0:0{timerCount}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <Lottie
                      speed={1}
                      autoPlay={true}
                      loop={true}
                      style={{ width: 25, height: 25, borderRadius: 16 }}
                      // ref={animationLoadRef}
                      source={require('../Json/ringring.json')}
                    />
                  </View>
                </>
                :
                <>
                </>
            }
            {
              hasCalling ?
                <>
                  <AnimatedRN.View style={[
                    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
                    {
                      opacity: opacityHasCalling
                    }
                  ]}>
                    <Image
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: 54 / 2
                      }}
                      source={{
                        uri: `https://scontent-sin6-3.xx.fbcdn.net/v/t39.30808-6/279839960_2605856086212933_7523087793335412625_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=U1ff36bI0cMAX8lKEjb&_nc_ht=scontent-sin6-3.xx&oh=00_AT_ueBVhlaIfvOrDOJMLlXsaTEILgSYSjauzDRZTyzRipQ&oe=632682F1`
                      }} />
                    <View style={{ marginLeft: 16, flex: 1 }}>
                      <Text style={{
                        fontWeight: '500',
                        color: 'white',
                        fontSize: 16,
                        opacity: 0.7
                      }}>
                        iPhone
                      </Text>
                      <Text style={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 18
                      }}>
                        Thanh An
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity onPress={_handleHangDownCalling}>
                        <Image
                          style={{
                            width: 54,
                            height: 54,
                            borderRadius: 54 / 2
                          }}
                          source={require('../Image/videoCall_cancel.png')} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={_handleHangUpCalling}>
                        <Image
                          style={{
                            width: 54,
                            height: 54,
                            borderRadius: 54 / 2
                          }}
                          source={require('../Image/callAccept.png')} />
                      </TouchableOpacity>
                    </View>
                  </AnimatedRN.View>
                </>
                :
                <></>
            }

            {
              showGifFaceId ?
                <Animated.View style={[
                  { flex: 1, justifyContent: 'center', alignItems: 'center' },
                  // animatedFadeFaceId
                ]}>
                  {
                    unLockSuccess ?
                      <Lottie
                        speed={1.5}
                        style={{ width: 72, height: 72, borderRadius: 16 }}
                        // ref={animationTickRef}
                        autoPlay={true}
                        loop={false}
                        source={require('../Json/circleTick.json')}
                      />
                      :
                      <Lottie
                        speed={3}
                        autoPlay={true}
                        loop={false}
                        style={{ width: 80, height: 80, borderRadius: 16 }}
                        // ref={animationLoadRef}
                        source={require('../Json/circleLoad.json')}
                      />
                  }



                </Animated.View>
                :
                <></>
            }
          </TouchableOpacity>

        </Animated.View>

        <View style={styles.statusBar}>
          <View>
            <Text style={{
              fontSize: 18,
              marginLeft: 32,
              fontWeight: 'bold'
            }}>
              9:41
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 4 }}
              source={{ uri: `https://i.ibb.co/ZcnMMgz/Signal.png` }} />

            <Animated.Image
              style={[{ width: 20, height: 20, resizeMode: 'contain', marginHorizontal: 4 }, animatedScaleIconWifi]}
              source={{ uri: `https://i.ibb.co/s1hxmZ6/Wifi.png` }} />

            <Image
              style={{ width: 40, height: 15, resizeMode: 'contain' }}
              source={{ uri: `https://i.ibb.co/0J49LPL/Group-3.png` }} />

          </View>
        </View>
        {/* <View style={{height:80}}/> */}
        <View style={{
          marginTop: 40,
          alignSelf: 'center',
          alignItems: 'center'
        }}>
          <Text style={styles.date}>
            Web, Sep 14
          </Text>
          <Text style={[styles.time]}>
            9:41
          </Text>
        </View>

        {
          showSpotify ?
            <Spotify minimizeSpotify={_minimizeSpotify} />
            :
            <></>
        }

        {
          showListNoti ?
            <ListNoti
              click={() => {
                setShowSpotify(true)
              }}
              hide={() => {
                setShowListNoti(old => !old)
              }} />
            :
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 64,
                alignSelf: 'center'
              }}
              onPress={() => {
                setShowListNoti(old => !old)
              }}>
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold'
              }}>
                You have new Notifications.
              </Text>
            </TouchableOpacity>
        }



      </ImageBackground>



    </View >
  );
};

const styles = StyleSheet.create({
  time: {
    fontWeight: 'bold',
    fontSize: 80,
    color: 'white',
    opacity: 0.7,
    marginTop: 0
  },
  date: {
    fontWeight: '500',
    fontSize: 24,
    color: 'white',
    opacity: 0.7
  },
  container: {
    width: _width,
    height: _height - 34,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white'
  },
  dynamicIsland: {
    // width: 120,
    // height: 35,
    backgroundColor: 'black',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 100,

  },
  statusBar__border: {
    height: 40,
    width: _width,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 100,
    top: 40,
    borderTopStartRadius: 64,
    borderTopEndRadius: 64,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  statusBar: {
    width: _width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 16
  }
})


export default nothing;