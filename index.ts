import { AdapterContext } from 'adaptiveweb';
import { Preferences, preferencesFromObject } from './src/Preferences';
import { AdapterManager } from './src/AdapterManager';
declare const aw: AdapterContext;

aw.getPreferences().then((rawPrefs: any) => {
    let preferences: Preferences = preferencesFromObject(rawPrefs);
    new AdapterManager(aw, preferences);
});