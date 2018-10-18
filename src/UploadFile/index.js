import React, { Component } from 'react';
import Dropzone from "react-dropzone";
import { Image } from 'cloudinary-react';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'n4hz6jqi';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/contract-management-app';

export default class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop(event) {
    this.setState({
      uploadedFile: event.target.files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload = (file) => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      } if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        this.props.getImageURL(this.state.uploadedFileCloudinaryUrl)
      }
    });
  }

  function uploadFile(file) {
    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    fd.append('upload_preset', unsignedUploadPreset);
  fd.append('public_id', `${this.state.uploadedFile.name}`); // Optional - add tag for image admin in Cloudinary
  fd.append('file', this.state.uploadedFile);
  xhr.send(fd);
  }
  

  render() {
    
    const publicID = 
    return (
      <form>
        <div
          className="input-wrapper">
          <Dropzone
            onDrop={this.onImageDrop}
            multiple={false}
            accept="image/*">
            <div>Drop files here, or click to select files to upload.</div>
          </Dropzone>
          <div>{this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedFileCloudinaryUrl} />
            </div>}
          </div>

        </div>
      </form>
    )
  }
}
