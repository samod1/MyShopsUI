import React, {useContext} from 'react';
import './App.css';
import ResponsiveContainer,{MAIN_PANEL_PATH_MAIN,MAIN_PANEL_PATH_REGISTER} from './Components/Page/Page/Page'
import {AppProvider,AppContext} from "./Tools/AppContext";
import {IntlProvider} from "react-intl";
import messages from "./locale/messages";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const locale = (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
    || 'en-US';

let locale_test='sk-SK';



function App(props) {
  return (

    <React.StrictMode>
        <AppProvider>

            <Router>
                <Switch>
                    <Route path="/register" component={AppL2}>
                    </Route>
                    <Route path="/" component={AppL1}>
                    </Route>
                </Switch>
            </Router>
        </AppProvider>
    </React.StrictMode>



  );
}


function AppL1(props){
    const  [ctx,dispatch] = useContext(AppContext)
    return (
        <IntlProvider locale={ctx.language} messages={messages[ctx.language]}>
            <div className="App">
                <ResponsiveContainer></ResponsiveContainer>
            </div>
        </IntlProvider>
    )
}

function AppL2(props){
    const  [ctx,dispatch] = useContext(AppContext)
    return (
        <IntlProvider locale={ctx.language} messages={messages[ctx.language]}>
            <div className="App">
                <ResponsiveContainer path={MAIN_PANEL_PATH_REGISTER} location={props.location}></ResponsiveContainer>
            </div>
        </IntlProvider>
    )
}


export default App;
