import React, { Component } from 'react';
import { observer } from 'mobx-react'

import logo from './logo.svg';
import './App.scss';
import { app } from './models/App';
import { l } from './models/I18n';
import { LanguageSelector } from './components/LanguagesSelector';

app.i18n.load('fr')

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p dangerouslySetInnerHTML={{ __html: l('edit_and_reload') }} />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {l('app_title')}
          </a>
          <LanguageSelector />
        </header>
      </div>
    );
  }
}

export default App;
