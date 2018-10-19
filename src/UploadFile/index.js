import React, { Component } from 'react';
// import Dropzone from "react-dropzone";
import { Image } from 'cloudinary-react';
import { render } from 'react-dom';

import request from 'superagent';
import { throws } from 'assert';

const CLOUDINARY_UPLOAD_PRESET = 'n4hz6jqi';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/contract-management-app';

export default class UploadFile extends Component {

  //   uploadWidget() {
  //     cloudinary.openUploadWidget({ cloud_name: 'contract-management-app', upload_preset: 'n4hz6jqi', tags:['xmas']},
  //         function(error, result) {
  //             console.log(result);
  //         });
  // }

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

  uploadFile = (file) => {
    var url = `https://api.cloudinary.com/v1_1/contract-management-app/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //create a thumbnail
    var tokens = url.split('/');
    tokens.splice(-2, 0, 'w_150,c_scale');
    var img = new Image();
    img.src = tokens.join('/');
    img.alt = response.public_id;

    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    fd.append('public_id', `${this.state.uploadedFile.name}`); // Optional - add tag for image admin in Cloudinary
    fd.append('file', this.state.uploadedFile);
    xhr.send(fd);
  }


  render() {
    //   return (
    //     <div className="main">
    //         <div className="upload">
    //             <button onClick={this.uploadWidget.bind(this)} className="upload-button">
    //                 Add Image
    //             </button>
    //         </div>
    //     </div>

    // );
    // }
    // }
    return (
      <form onSubmit={this.uploadedFile}>
        <div
          className="input-wrapper">
          <input
            type="file"
            multiple="false"
            accept="image/*"
            onChange={this.onImageDrop}
            value={this.state.uploadedFile}>
          </input>
        </div>
      </form>
    )
  }
}





