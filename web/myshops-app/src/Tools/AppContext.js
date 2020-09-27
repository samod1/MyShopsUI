import React,{useReducer} from "react";

const SET_LANGUAGE = 'SET_LANGUAGE'
const SET_LOGGEDUSER = 'SET_LOGGEDUSER'

const contextData = {
    language: "sk-SK",
    loggedUser: null
}

const AppContext = React.createContext(contextData);

const reducer = (state, action) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                language: action.payload
            };
        case SET_LOGGEDUSER:
            return {
                loggedUser:  action.payload
            };
        default:
            throw new Error();
    }
};

function AppProvider(props) {
    const [state, dispatch] = useReducer(reducer, contextData);
    return (
        <AppContext.Provider value={[state, dispatch]}>
              {props.children}
        </AppContext.Provider>
    )
   }


function useAppContext() {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider')
    }
    return context
}

export {AppProvider,useAppContext,AppContext,contextData,SET_LOGGEDUSER,SET_LANGUAGE}