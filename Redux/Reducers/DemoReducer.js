import * as ActionType from "../Constants/ActionType";


let initialState = {
    expanded: false
};

const DemoReducer = (state = initialState, action) => {
    switch (action.type) {


        case ActionType.EXPANDED:
            return {
                ...state,
                expanded: action.payload.flag
            }

        default:
            return state;
    }
};

export default DemoReducer;
