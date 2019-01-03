import autobind from 'autobind-decorator'
import { observable } from 'mobx'

const languages = {
    en: 'English',
    fr: 'Français',
    es: 'Español',
    jp: '日本',
    // rs: '日本'
}

const languages_short = {
    en_short: 'En',
    fr_short: 'Fr',
    es_short: 'Es',
    jp_short: '日本'
}

export type ILanguagesCode = 'en' | 'fr' | 'sp' | 'jp';

@autobind
export class I18n {
    private cache: { [key: string]: { [key: string]: string } } = {};
    private defaultLanguage: ILanguagesCode = 'en';

    @observable private strings: { [key: string]: string } = {};
    @observable public language: ILanguagesCode = 'fr';
    @observable public supportedLanguages: ILanguagesCode[] = Object.keys(languages) as ILanguagesCode[];

    public translate(key: string) {
        let value = this.strings[key];
        if (!value && this.cache[this.defaultLanguage]) {
            value = this.cache[this.defaultLanguage][key];
        }
        return value || `[${key}]`;
    }

    public async load(key: ILanguagesCode) {
        try {
            const res = await fetch(`/lang/${key}.json`);
            const json = await res.json();

            this.strings = {
                ...json,
                ...languages,
                ...languages_short
            };

            this.language = key as ILanguagesCode;
        } catch (err) {
            console.error(err);
            alert('could not change language');
        }
    }
}

export const i18n = new I18n();

const supportedKeys: string[] = Object.keys(languages);
const detectedLang: ILanguagesCode = (navigator.languages.filter((l) => supportedKeys.includes(l))[0] || 'en') as ILanguagesCode;
i18n.load(detectedLang);

export const l = i18n.translate;
