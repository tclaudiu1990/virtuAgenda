import { useEffect, useState } from "react";
import bgDefault from './../assets/img/bg.png'
import { getSettingsService, saveSettingsService } from "../Services/settingsServices";
import { SettingsTypeInfo } from "../types/SettingsTypeInfo";


const useSettings = () => {
    const [appTitle, setAppTitle] = useState('VirtuAgenda');
    const [appBgType, setAppBgType] = useState<'default' | 'custom'>('default');
    const [appBgUrl, setAppBgUrl] = useState(bgDefault);

    // loads the settings from local storage using services
    const reloadSettings = () => {
        const savedSettings = getSettingsService();
        updateSettings(savedSettings)       
    };
    
    // method to update the settings and automatically save them
    const updateSettings = (settings: SettingsTypeInfo) => {    
        setAppTitle(settings.title);
        setAppBgType(settings.bgType);
        setAppBgUrl(settings.bgUrl);
        saveSettings(settings);
    };


    // save settings to local storage using services
    const saveSettings = (settings:SettingsTypeInfo) => {
        saveSettingsService(settings);
    }


    // sets the settings to saved settings on component mount
    useEffect(() => {
        reloadSettings();
    }, []); 

    return {
        appTitle,
        appBgType,
        appBgUrl,
        updateSettings,
        reloadSettings
    };
};

export default useSettings;