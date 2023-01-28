// initial state is how the data layer looks before we added to it before anything when the app starts

export const initialState = {
    user:null,
};

// this is where we can push some information into data layer
export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            //whatever we return we intend to change the data layer
            return {
                ...state,//keep state that was in there
                //change user to whatever we dispatched
                user: action.user,
            };
            // return default don't do anything with that
            default:
                return state;
    }
};

export default reducer;