"use client"
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from './ui/input';
import { Label } from './ui/label';

const FileUploader = ({ onFilesUploaded }) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the uploaded files
    onFilesUploaded(acceptedFiles);
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
        <Label>Upload images</Label>
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
            <Input {...getInputProps()} />
            <p>Drag & drop some files here, or click to select files</p>
        </div>
    </div>
  );
};

export default FileUploader;
