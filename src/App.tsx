import React, { Component, MouseEvent } from 'react';
import { observer } from 'mobx-react'

import logo from './logo.svg';
import './App.scss';
import { app } from './models/App';
import { l, ILanguagesCode } from './models/I18n';

const handleLangChange = (lang: ILanguagesCode) => (e: MouseEvent) => {
  e.preventDefault();
  app.i18n.load(lang);
}

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
          <div className="languages">
            {app.i18n.supportedLanguages.map((lang) => (
              <a key={lang} href={"#" + lang} onClick={handleLangChange(lang)}>
                {l(lang)}
              </a>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
