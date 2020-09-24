import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import {IntlProvider} from 'react-intl'
import messages from "./locale/messages";

const locale = (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
    || 'en-US';

const locale_test='sk-SK';

ReactDOM.render(

  <React.StrictMode>
    <IntlProvider locale={locale_test} messages={messages[locale_test]}>
      <App />
    </IntlProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
