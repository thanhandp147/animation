import { combineReducers } from "redux";
import * as ActionType from "../Constants/ActionType";
import messageReducer from './MessageReducer';
import spotifyReducer from './SpotifyReducer'
import demoReducer from './DemoReducer'

const rootReducer = combineReducers({
    messageReducer,
    spotifyReducer,
    demoReducer
});

// const rootReducer = (state, action) => {
//     if (action.type === 'USER_LOGOUT') {
//         state = undefined
//     }

//     return appReducer(state, action)
// }

// export default rootReducer;
export default (state, action) => rootReducer(action.type === ActionType.CLEAR_STORE_REDUX ? undefined : state, action);
