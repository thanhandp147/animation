import * as ActionType from "../Constants/ActionType";


let initialState = {
    currPlayTrack: {
        
    }
};

const SpotifyReducer = (state = initialState, action) => {
    switch (action.type) {
       
        case ActionType.SET_NEW_PLAY_TRACK:
            return {
                ...state,
                currPlayTrack: {...action?.payload?.data, status: action.payload.data?.status ? action.payload.data?.status : 'ready'}
            }
        case ActionType.SET_STATUS_PLAYING_TRACK:
            return {
                ...state,
                currPlayTrack: {
                    ...state.currPlayTrack,
                    status: action.payload.flag
                }
            }

        default:
            return state;
    }
};

export default SpotifyReducer;
