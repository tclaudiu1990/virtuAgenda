import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import bgDefault from '../../assets/img/bg.png'

import EditableInput from "../Tasks/EditableInput";


interface SettingsProps {
    closeModal: ()=>void
}

const SettingsModal:React.FC<SettingsProps> = ({closeModal}) => {

    const appContext = useContext(AppContext)



    const [title, setTitle] = useState('VirtuAgenda');
    const [bgType, setBgType] = useState<'default' | 'custom'>('default');
    const [bgUrl, setBgUrl] = useState(bgDefault);

    // save logic
    const saveNewSettings = () => {
        const bg = bgType==='custom'?bgUrl:bgDefault;
        appContext?.updateSettings({
            title: title, 
            bgType: bgType, 
            bgUrl: bg})
    }
    
    const handleBgTypeInput = (val:string) => {
        if(val=='default' || val=='custom'){
            setBgType(val)
        }
    }


    useEffect(()=>{
        if(appContext) {
            setTitle(appContext?.appTitle)
            setBgType(appContext?.appBgType)
            setBgUrl(appContext?.appBgUrl)
        }
    }, [])


    useEffect(()=>{

    }, [title, bgType, bgUrl])



    return(
        <>
            <div className="modal-settings-details modal-details">


                <h2>Settings</h2>
                <h3>Title</h3>
                <EditableInput 
                    acceptEdit={setTitle} 
                    item={<p>{title}</p>} 
                    text={title}
                />


                <h3>Background</h3>
                <div className="radio-group">
                    <div className="radio-input">
                        <input type="radio" name="bgType" id="settings-bg-default" 
                            value={'default'} 
                            onChange={(e)=>handleBgTypeInput(e.currentTarget.value)}
                            checked={bgType === 'default'}
                        />
                        <label htmlFor="settings-bg-default">Default</label>
                    </div>        
                    
                    <div className="radio-input">         
                        <input type="radio" name="bgType" id="settings-bg-custom" 
                            value={'custom'} 
                            onChange={(e)=>handleBgTypeInput(e.currentTarget.value)}
                            checked={bgType === 'custom'}
                        />
                        <label htmlFor="settings-bg-custom">Custom</label>
                    </div>      
                </div>

                {bgType=='custom'
                    ?
                        <input type="text" onChange={(e)=>setBgUrl(e.currentTarget.value)} value={bgUrl}></input>
                    :
                        ''
                }

                         

                <div className="modal-footer">
                <div>
                    <button className="btn" onClick={()=>{
                        saveNewSettings();                            
                        closeModal();
                    }}>Salvează</button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn" onClick={()=>closeModal()}>Renunță</button>
                </div>
            </div>         
            </div>
               
        </>
    )
}   

export default SettingsModal;