import React, { MouseEvent } from 'react';

import { app } from '../models/App'
import { ILanguagesCode, l } from '../models/I18n';

const handleLangChange = (lang: ILanguagesCode) => (e: MouseEvent) => {
    e.preventDefault();
    app.i18n.load(lang);
}

interface IProps {
    short?: boolean
}

export const LanguageSelector: React.SFC<IProps> = ({
    short = false
}) => (
    <div className="languages">
        {
            app.i18n.supportedLanguages.map((lang) => (
                <a key={lang} href={"#" + lang} onClick={handleLangChange(lang)} title={l(lang)}>
                    {l(short ? lang + '_short' : lang)}
                </a>
            ))
        }
    </div>
);
