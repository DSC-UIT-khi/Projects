import React, {createContext, useContext, useReducer} from 'react';

//creating the context where the data layer actually lives where everything actually lives
export const StateContext = createContext();

// data layer is actually this here stateprovider and this is called a higher order component takes three things a reducer initial state and children
// children would be the app child
export const StateProvider = ({reducer, initialState, children }) => (
    // this stuff actually helps us to set data layer
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

// this final line allows us to pull information from data layer
export const useStateValue = () => useContext(StateContext); 