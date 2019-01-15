import React, { MouseEvent } from 'react';
import { match as RouterMatch, Redirect } from 'react-router';
import cx from 'classnames'

import { app } from '../models/App'
import { ILanguagesCode, l } from '../models/I18n';
import style from './LanguagesSelector.module.scss';
import { observer } from 'mobx-react';

const handleLangChange = (lang: ILanguagesCode) => (e: MouseEvent) => {
    e.preventDefault();
    app.i18n.load(lang);
}

interface IProps {
    short?: boolean
    match: RouterMatch
}

export const LanguageSelector: React.SFC<IProps> = observer(({
    short = false,
    match
}) => {
    let targetRoot = match.url.replace(/^\/[a-z]{2}\//, `/${app.i18n.language}/`);
    let doRedirect = match.url !== targetRoot;

    if (!match.params.lang) {
        targetRoot = `/${app.i18n.language}/`;
        doRedirect = true;
    }

    return (
        <div className={style.languages}>
            {
                app.i18n.supportedLanguages.map((lang) => (
                    <a
                        key={lang}
                        href={"#" + lang}
                        onClick={handleLangChange(lang)}
                        title={l(lang)}
                        className={cx({
                            [style.current]: lang === app.i18n.language
                        })}
                    >
                        {l(short ? lang + '_short' : lang)}
                    </a>
                ))
            }
            {doRedirect && <Redirect to={targetRoot} />}
        </div>
    );
});
