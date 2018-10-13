import React, { Component } from 'react';
import "./style.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ContractDetails from '../ContractDetails';
import "./style.css";

export default class UserContract extends Component {
  contractClick = async (id) => {
    this.setState({
      id: id
    });
  }
  render() {
    return (
        <div className="contract-container" onClick={this.contractClick}>
            <Link to={`/contracts/${this.props.id}`}>
                <div className="contract-summary-container">
                    <div className="contract-type">{this.props.type}</div>
                    <div className="client-name">{this.props.clientName}</div>
                </div>
            </Link>
            <Route exact path={`/contracts/${this.props.id}`}
                render={(props) => <ContractDetails {...props} />} />
            <button className='delete-button' onClick={this.props.onClickDeleteButton}>Delete from contracts</button>
        </div>
    )
}
}   
