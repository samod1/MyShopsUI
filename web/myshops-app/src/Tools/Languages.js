import React, {Component, useContext,useState} from 'react'
import { Dropdown } from 'semantic-ui-react'
import {FormattedMessage} from "react-intl";
import index from "../index"
import {AppContext, useAppContext,SET_LANGUAGE} from "./AppContext";


export default function Languages(props) {

    const options = [
        { key: 'en-US', text: 'English', value: 'en-US' },
        { key: 'sk-SK', text: 'Slovenčina', value: 'sk-SK' },
    ]

    const langstate = {
        selected: "sk-SK",//context.language,
        text: "Language"
    };

    const options_dict =   { 'en-US':'English', 'sk-SK':'Slovenčina'}
    const [state, setState] = useState(langstate);
    const [ctx,dispatch] = useContext(AppContext);

    const setLanguage = lang => {
        dispatch({
            type: SET_LANGUAGE,
            payload: lang
        });
    };

    const changeLang = (ev,data) => {
        let txt = options_dict[data.value]
        let newState = {selecte: data.value,text: txt};
        setState(newState);
        setLanguage(data.value)
    }
    return(

        <Dropdown  floating options={options} style={{marginLeft: '0.5em'}}
                   text={state.text}
                   onChange={changeLang}
                   value={state.selected}
        />
    )

}





