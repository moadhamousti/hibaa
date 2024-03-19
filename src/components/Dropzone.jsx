import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    
    const onDrop = useCallback(acceptedFiles => {
        setSelectedImages(acceptedFiles.map(acceptedFile => ({
            ...acceptedFile,
            preview: URL.createObjectURL(acceptedFile)
        })))
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    
    const selectedImagesDisplay = selectedImages.map((file, index) => (
        <div key={index}>
            <Image src={file.preview} width={200} height={200} alt='' />
        </div>
    ));

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop the files here ...</p>
            </div>
            {selectedImagesDisplay}
        </div>
    );
}

export default Dropzone;
