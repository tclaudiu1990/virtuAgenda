import { SettingsTypeInfo } from "../types/SettingsTypeInfo"
import bgDefault from './../assets/img/bg.png'

// save settings 
const saveSettingsService = (settings:SettingsTypeInfo) => {
    // const {title, bgType, gbUrl} = settings;
    const jsonSettings = JSON.stringify(settings);
    localStorage.setItem('vaSettings', jsonSettings)    
}

// load settings 
const getSettingsService = () => {
    const savedSettingsJson = localStorage.getItem('vaSettings');
    if(savedSettingsJson) {
        return JSON.parse(savedSettingsJson);
    } else {
        saveSettingsService({
            title: 'VirtuAgenda',
            bgType: 'default',
            bgUrl: bgDefault
        })
        return({
            title: 'VirtuAgenda',
            bgType: 'default',
            bgUrl: bgDefault
        })
    }
}

// clear settings to default
const clearSettingsService = () => {
    const defaultSettings = {
        title: 'VirtuAgenda',
        bgType: 'default',
        bgUrl: bgDefault
    }
    localStorage.setItem('vaSettings', JSON.stringify(defaultSettings))
}


export {saveSettingsService, getSettingsService, clearSettingsService}