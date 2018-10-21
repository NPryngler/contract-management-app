import React, { Component } from 'react';
import "./style.css";
import Popup from "reactjs-popup";
import { Image } from 'cloudinary-react';
import { Redirect } from 'react-router-dom';

export default class AddContract extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('user-jwt');
    this.state = {
      redirectToReferrer: false,
      isLoggedIn: token,
      user: {},
      contract: {},
      type: '',
      name: '',
      newName: '',
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientZipcode: '',
      clientCity: '',
      clientState: '',
      clientCountry: '',
      clientAddress: '',
      serviceDescription: '',
      serviceDueDate: '',
      serviceFee: 0,
      paymentConditions: '',
      earlyTermination: '',
      stateLocation: '',
      executionDate: '',
      contractStatus: '',
      uploadedFile: '',
      fileUrl: ''
    }
  }



  componentDidMount = async () => {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await (await fetch('/api/current-user', {
      method: "GET",
      headers: {
        "jwt-token": this.state.isLoggedIn,
      }
    })).json();
    this.setState({
      user: user
    });
  }


  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }



  saveContract = async (event) => {
    event.preventDefault();
    this.fetchUser();
    this.uploadFile();

    const requestBody = JSON.stringify({
      type: this.state.type,
      name: this.state.name,
      newName: this.state.newName,
      clientName: this.state.clientName,
      clientPhone: this.state.clientPhone,
      clientZipcode: this.state.clientZipcode,
      clientCity: this.state.clientCity,
      clientState: this.state.clientState,
      clientCountry: this.state.clientCountry,
      clientAddress: this.state.clientAddress,
      serviceDescription: this.state.serviceDescription,
      serviceFee: this.state.serviceFee,
      paymentConditions: this.state.paymentConditions,
      serviceDueDate: this.state.serviceDueDate,
      earlyTermination: this.state.earlyTermination,
      earlyTerminationDescription: this.state.earlyTerminationDescription,
      executionDate: this.state.executionDate,
      contractStatus: this.state.contractStatus,
      uploadedFile: this.state.uploadedFile,
      fileUrl: this.state.uploadedFile.name + "_" + this.state.user.name

    });

    const response = await fetch('/api/contracts', {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-type': 'application/json',
        'jwt-token': this.state.isLoggedIn
      }
    });
    console.log(requestBody);
    this.setState({
      redirectToReferrer: true,
    });
    console.log(requestBody)
  }


  handleFile = (event) => {
    event.preventDefault();
    this.setState({
      uploadedFile: event.target.files[0]
    })
  }


  uploadFile = (file) => {
    const CLOUDINARY_UPLOAD_PRESET = 'xmala6il';
    const cloudName = 'contract-management-app';

    let url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    //create a thumbnail
    // var tokens = url.split('/');
    // tokens.splice(-2, 0, 'w_150,c_scale');
    // var img = new Image();
    // img.src = tokens.join('/');
    // img.alt = response.public_id;

     
    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    fd.append('public_id', `${this.state.uploadedFile.name + "_" + this.state.user.name}`); // Optional - add tag for image admin in Cloudinary
    fd.append('file', this.state.uploadedFile);
    xhr.send(fd);
  }


  render() {
    const { from } = this.props.location.state || { from: { pathname: "/my-contracts" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    const publicId = this.state.fileUrl;
    console.log(publicId);
  

    return (
      <div className="form-container">
        <h1 className="heading">Add contract</h1>
        <div className="input-container">
          <div className="input-container-form">
            <form onSubmit={this.saveContract}>
              <div className="input-wrapper">
                <label className="input-title">Contract type:
                  <input
                    className="title-input"
                    placeholder="Contract type"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}>
                  </input>
                </label>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Contracted party name</label>
                <select className="select-wrapper"
                  name="name"
                  onChange={this.handleChange}>
                  <option value={this.state.user.name}>Use user info</option>
                  <option value='new party'>new party</option>
                </select>
                {this.state.name === 'new party' && (
                  <div>
                    <input
                      className="title-input"
                      placeholder="complete name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}>
                    </input>
                  </div>
                )}
              </div>
              <div className="input-wrapper">
                <label className="input-title">Client's complete name</label>
                <input
                  className="title-input"
                  placeholder="Client's complete name"
                  name="clientName"
                  value={this.state.clientName}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Client's phone</label>
                <input
                  className="title-input"
                  placeholder="+1(000) 000 0000"
                  name="clientPhone"
                  value={this.state.clientPhone}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Client's e-mail</label>
                <input
                  className="title-input"
                  placeholder="Client's e-mail"
                  name="clientEmail"
                  value={this.state.clientEmail}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Client's Zipcode</label>
                <input
                  className="title-input"
                  placeholder="Client's zipcode"
                  name="clientZipcode"
                  value={this.state.clientZipcode}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Client's City</label>
                <input
                  className="title-input"
                  placeholder="Client's City"
                  name="clientCity"
                  value={this.state.clientCity}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Client's State</label>
                <input
                  className="title-input"
                  placeholder="Client's State"
                  name="clientState"
                  value={this.state.clientState}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Client's country</label>
                <input
                  className="title-input"
                  placeholder="Client's Country"
                  name="clientCountry"
                  value={this.state.clientCountry}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Client's address</label>
                <input
                  className="title-input"
                  placeholder="Client's e-mail"
                  name="clientAddress"
                  value={this.state.clientAddress}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Service description</label>
                <input
                  className="title-input"
                  placeholder="service description"
                  name="serviceDescription"
                  value={this.state.serviceDescription}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Service due date</label>
                <input
                  className="title-input"
                  type="date"
                  placeholder="due date"
                  name="serviceDueDate"
                  value={this.state.serviceDueDate}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Service fee</label>
                <input
                  className="title-input"
                  type="number"
                  placeholder="$"
                  name="serviceFee"
                  value={this.state.serviceFee}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Payment conditions</label>
                <input
                  className="title-input"
                  type="text"
                  placeholder="specify the payment conditions"
                  name="paymentConditions"
                  value={this.state.paymentConditions}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title"> Early termination clause:
                    <select className="select-wrapper"
                    name="earlyTermination"
                    value={this.state.earlyTermination} onChange={this.handleChange}>
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                  </select>
                </label>
                <label className="input-title">Describe</label>
                <input
                  className="title-input"
                  type="text"
                  placeholder="describe early termination clause"
                  name="earlyTerminationDescriptio"
                  value={this.state.earlyTerminationDescription}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Signature date</label>
                <input
                  className="title-input"
                  type="date"
                  placeholder="execution date"
                  name="executionDate"
                  value={this.state.executionDate}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div className="input-wrapper">
                <label className="input-title">Contract Status </label>
                <input
                  className="title-input"
                  type="text"
                  placeholder="status"
                  name="contractStatus"
                  value={this.state.contractStatus}
                  onChange={this.handleChange}>
                </input>
              </div>
              <div>
                <input
                  type="file"
                  multiple="false"
                  accept="application/pdf"
                  onChange={this.handleFile}>
                </input>
              </div>
              <div>
                <Image
                  publicId={publicId} 
                  // width="100" height="140" crop="fill"
                  />
              </div>
            </form>
          </div>
          <div className="button-container">
            <Popup className="contract-details"
              trigger={<button className="view-details-button"
              >View</button>}
              modal
              closeOnDocumentClick>
              <div className="contract-details-container">
                <div className="contract-info">
                  <div className="info-line">
                    <h3 className="info-title">Type: <span>{this.state.type}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Client Name: <span>{this.state.clientName}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Client Email: <span>{this.state.clientEmail}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Client Phone number: <span>{this.state.clientPhone}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Client City: <span>{this.state.clientCity}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Client State: <span>{this.state.clientState}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Client Country: <span>{this.state.clientCountry}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Client Address: <span>{this.state.clientAddress}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Service description: <span>{this.state.serviceDescription}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Service Fee: <span>{this.state.serviceFee}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Payment conditions: <span>{this.state.paymentConditions}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Service delivery date: <span>{this.state.serviceDueDate}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Early termination clause: <span>{this.state.earlyTermination}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Early termination clause description : <span> {this.state.earlyTerminationDescription}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Execution date: <span>{this.state.executionDate}</span></h3>
                  </div>
                  <div className="info-line">
                    <h3 className="info-title">Status : <span>{this.state.contractStatus}</span></h3>
                  </div>
                </div>
              </div>
            </Popup>
            <div>
              <button className="button-standard"
                onClick={this.saveContract}>Save</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
