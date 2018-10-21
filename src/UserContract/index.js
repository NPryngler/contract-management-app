import React, { Component } from 'react';
import "./style.css";
// import ContractDetails from '../ContractDetails';
import Popup from "reactjs-popup";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';


export default class UserContract extends Component {

  render() {
    return (
      <div className="contract-container">
        <div className="contract-summary-container">
          <h2 className="title">Summary</h2>
          <div className='contract-summary-table'>
            <div className="item">
              <div className="table-cell"><h3>Contract Type</h3></div>
              <div className="table-cell">{this.props.type}</div>
            </div>

            <div className="item">
              <div className="table-cell"><h3>Client name</h3></div>
              <div className="table-cell">{this.props.clientName}</div>
            </div>

            <div className="item">
              <div className="table-cell"><h3>Contract date</h3></div>
              <div className="table-cell">{this.props.executionDate}</div>
            </div>

            <div className="item">
              <div className="table-cell"><h3>Status</h3></div>
              <div className="table-cell">{this.props.contractStatus}</div>
            </div>
            {/* <div className="item">
            <div>
                <Image
                  cloudName="contract-management-app"
                  publicId={this.props.fileUrl} width="50" height="80" crop="fill"/>
              </div>
            </div> */}
          </div>
        </div>

        <div className="buttons-container">
          <Popup className="contract-details"
            trigger={<button className="button-standard">See More</button>}
            modal
            closeOnDocumentClick>
            <div className="contract-details-container">
              <div className="contract-info">
                <h3>Type: <span>{this.props.type}</span></h3>
                <h3>Client Name: {this.props.clientName}</h3>
                <h3>Client Email: {this.props.clientEmail}</h3>
                <h3>Client Phone number: {this.props.clientPhone}</h3>
                <h3>Client City: {this.props.clientCity}</h3>
                <h3>Client State: {this.props.clientState}</h3>
                <h3>Client Country: {this.props.clientCountry}</h3>
                <h3>Client Address: {this.props.clientAddress}</h3>
                <h3>Service description: {this.props.serviceDescription}</h3>
                <h3>Service Fee: {this.props.serviceFee}</h3>
                <h3>Payment conditions: {this.props.paymentConditions}</h3>
                <h3>Service delivery date: {this.props.serviceDueDate}</h3>
                <h3>Early termination clause: {this.props.earlyTermination}</h3>
                <h3>Early termination clause description : {this.props.earlyTerminationDescription}</h3>
                <h3>Execution date: {this.props.executionDate}</h3>
                <h3>Status: {this.props.contractStatus}</h3>
              </div>
            </div>
          </Popup>
          <div>
            <button className="button-standard"  onClick={this.props.onClickDeleteButton}>Delete from contracts</button>
          </div>
        </div>
      </div >
    )

  }
}   
