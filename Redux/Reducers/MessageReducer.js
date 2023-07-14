import * as ActionType from "../Constants/ActionType";


let initialState = {
    newMessageReaction: {
        _idMsg: null,
        type: null
    }
};

const MessageReducer = (state = initialState, action) => {
    switch (action.type) {

        // case ActionType.SET_DATA_WALLET:
        //     return {
        //         ...state,
        //         infoWallet: action?.payload?.data
        //     }
        // case ActionType.SHOW_MODAL_GET_REWARD:
        //     return {
        //         ...state,
        //         isShowModalGetReward: {
        //             ...state?.isShowModalGetReward,
        //             show: action?.payload?.data?.show,
        //             data: action?.payload?.data?.data,
        //         }
        //     }
        case ActionType.NEW_MSG_REACTION:
            return {
                ...state,
                newMessageReaction: action?.payload?.data
            }

        default:
            return state;
    }
};

export default MessageReducer;
