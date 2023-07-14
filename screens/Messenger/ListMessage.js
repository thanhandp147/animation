import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    FlatList
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedGestureHandler, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import SenderMsg from './Components/SenderMsg';
import ReceiveMsg from './Components/ReceiveMsg';
import ReactionMsgOption from './Components/ReactionMsgOption';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import ItemDemo from './Components/ItemDemo';

const FlatListAnimated = Animated.createAnimatedComponent(FlatList)

const ListMessage = memo((props) => {

    const scrollFlatlistY = useSharedValue(0);

    const [listMessages, setListMessage] = useState(Array.from({ length: 100 }, (_, i) => {
        return {
            isSender: Math.floor(Math.random() * 2),
            _id: i,
            content: `${i} It is a long looking at its layout looking at its layout looking at its layout.`,
            avatar: `https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/68595310_1675268325938385_4997491677812752384_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=19026a&_nc_ohc=dNtRAzSpYZAAX9DQzB1&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCy-9G7-LhKEGfxXdW7XqRjYBYcMFc3THNGFBbgeLwgVA&oe=6395810B`
        }
    }))

    const [showReactionOption, setShowReactionOption] = useState({
        idMsg: null,
        pageY: null,
        show: false
    })

    const _longPressMsg = useCallback((e) => {
        setShowReactionOption(e)
    }, [])

    const _handlePressReaction = (data) => {
        // console.log({ data });
        // let findIndex = listMessages?.findIndex(item => {
        //     return item?._id == data?.idMsg
        // })
        // if (findIndex !== -1) {
        //     let temp = [...listMessages];
        //     temp[findIndex] = {
        //         ...temp[findIndex],
        //         reaction: {
        //             type: 'heart',
        //             count: 1
        //         }
        //     }
        //     console.log(temp);
        // }

        store.dispatch({
            type: ActionType.NEW_MSG_REACTION,
            payload: {
                data: {
                    _idMsg: data?.idMsg,
                    type: 'heart'
                }
            }
        })

    }

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event,ctx) => {
            // console.log({...event});
            scrollFlatlistY.value = event.contentOffset.y;
        },
        onBeginDrag: (e) => {
            console.log({...e});
        },
        // onEndDrag: (e) => {
        //     isScrolling.value = false;
        // },
    });

    const _getItemLayout = () => {
        // console.log({data});
    }

    const _renderItem = ({ item, index }) => {
        // console.log({_renderItem:'a'});

        // return (
        //     <ItemDemo index={index}/>
        // )

        if (item?.isSender) {
            return (
                <SenderMsg
                    scrollFlatlistY={scrollFlatlistY}
                    data={item}
                    index={index}
                    separator={listMessages[index - 1]?.isSender == false}
                    startLine={(index == listMessages.length - 1 && listMessages[index - 1]?.isSender == true) || listMessages[index + 1]?.isSender == false && listMessages[index - 1]?.isSender == true}
                    endLine={(index == 0 && listMessages[index + 1]?.isSender == true) || listMessages[index - 1]?.isSender == false && listMessages[index + 1]?.isSender == true}
                    centerLine={listMessages[index - 1]?.isSender == true && listMessages[index + 1]?.isSender == true}
                />
            )
        } else {
            return (
                <ReceiveMsg
                    longPressMsg={_longPressMsg}
                    separator={listMessages[index - 1]?.isSender == true}
                    startLine={(index == listMessages.length - 1 && listMessages[index - 1]?.isSender == false) || listMessages[index + 1]?.isSender == true && listMessages[index - 1]?.isSender == false}
                    endLine={(index == 0 && listMessages[index + 1]?.isSender == false) || listMessages[index - 1]?.isSender == true && listMessages[index + 1]?.isSender == false}
                    centerLine={listMessages[index - 1]?.isSender == false && listMessages[index + 1]?.isSender == false}
                    data={item}
                    showMiniAvat={index == 0 || listMessages[index - 1]?.isSender == true && (listMessages[index + 1]?.isSender == false || listMessages[index + 1]?.isSender == true)} />
            )
        }

    }

    const onViewableItemsChanged = ({ viewableItems, changed }) => {
        console.log("Visible items are", viewableItems);
        console.log("Changed in this iteration", changed);
    }

    return (
        <View style={{ flex: 1 }}>
            {
                showReactionOption?.show ?
                    <ReactionMsgOption
                        handlePressReaction={_handlePressReaction}
                        hide={() => {
                            setShowReactionOption({
                                idMsg: null,
                                pageY: null,
                                show: false
                            })
                        }}
                        data={showReactionOption} />
                    :
                    <></>
            }
            <FlatListAnimated
                onScroll={scrollHandler}
                keyboardShouldPersistTaps={'handled'}
                inverted
                data={listMessages}
                renderItem={_renderItem}
                keyExtractor={({ item, index }) => index} />
            {/* {
                    listMessages?.map((item, index)=>{
                        return (
                            <ItemDemo x={index} index={index}/>
                        )
                    })
                } */}
        </View>
    );
});

const styles = StyleSheet.create({

})

export default ListMessage;
