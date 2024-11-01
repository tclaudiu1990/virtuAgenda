import React, { useEffect, useState } from "react";
import bgDefault from './../../assets/img/bg.png'
import imageCompression from "browser-image-compression";

interface UploadProps {
    bgUrl: string;
    uploadPhoto: (imgString:string) => void
}

// component that holds the file input and conversion logic from image to base64 string 
const PhotoUpload:React.FC<UploadProps> = ({ bgUrl, uploadPhoto}) => {

    const [imgSrc, setImgSrc] = useState('')
    
    // converts the image to base64 string
    const handleUpload = async (e: any) => {
        // extract the file
        const image = e.target.files?.[0];

        if(image){
            const reader = new FileReader();

            // set the compression options for the image
            const options = {
                maxSizeMB: 1, // Compress to approximately 1 MB
                maxWidthOrHeight: 1920, // Maintain quality while resizing
                useWebWorker: true,
                fileType: 'image/webp'
            };

            try {
                //use the image compression package to compress the image using the options above
                const compressedImage = await imageCompression(image, options);
                
                console.log(compressedImage)

                // tell the reader to convert the compressed image to a data url
                reader.readAsDataURL(compressedImage);

                // convert the string on reader load end
                reader.onloadend = () => {
                    const imgString = reader.result as string;
                    // update imgsrc state
                    setImgSrc(imgString);
                }
            } catch (err) {
                console.log(`ERROR: Failed to compress image`, err)
            }

        }
    }   

    // automatically update the photo in the settings modal when the src changes
    useEffect(() => {
        if(imgSrc.length>0){
            uploadPhoto(imgSrc)
        }
    }, [imgSrc])

    // if the image is not the default one, set the saved image to update ui
    useEffect(()=>{
        if(bgUrl.length>0 && bgUrl!=bgDefault){
            setImgSrc(bgUrl)
        }
    }, [])

    return(
        <>

            <input 
                className="photo-upload-input"
                id="photo-upload-input"
                type="file" 
                accept="image/jpeg, image/png"
                onChange={(e)=>handleUpload(e)}
            />

            <div className="image-upload-content">
                <label className={imgSrc?"photo-upload-input-label btn btn-transparent":"photo-upload-input-label btn btn-transparent no-image"} htmlFor="photo-upload-input">
                    <span>{imgSrc?'Replace Image':'Upload Image'}</span>
                    
                        
                </label>
                
                <div style={{backgroundImage: `url(${imgSrc})`}} className={imgSrc?"uploaded-img":"uploaded-img no-image"}></div>
            </div>
            

        </>
    )
}

export default PhotoUpload;