import React, {useContext} from 'react';
import './App.css';
import ResponsiveContainer from './Components/Page/Page/Page'
import {AppProvider,AppContext} from "./Tools/AppContext";
import {IntlProvider} from "react-intl";
import messages from "./locale/messages";


const locale = (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
    || 'en-US';

let locale_test='sk-SK';



function App(props) {
  return (
    <React.StrictMode>
        <AppProvider>
            <AppL1></AppL1>
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



export default App;
