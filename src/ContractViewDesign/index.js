import React, { Component } from 'react';
import "./style.css";

export default class ContractViewDesign extends Component {
  render() {
    return (
      <div>
        <div className="contract-view">
          <h1 className="heading">Preview</h1>
          <h3 className="contract-title">GRAPHIC DESIGN AGREEMENT</h3>
          <div className="clause-content">
            <p><span className="output client-name">{this.props.clientNameProps} </span>
              ("Client") is hiring </p>
            <p><span className="output freelancer-name">{this.props.userNameProps} </span>
              ("Freelancer") to do freelance to do graphic design work.</p>
            <p>The following sets forth the agreement between these two parties and binds them both.</p>
          </div>
          <div className="clause-section">
            <div className="clause-section-title">SCOPE OF WORK</div>
            <div className="clause-content">
              <p>Freelancer will do the following for Client (the "Scope of Work"):</p>
              <div className="service-description-wrapper">
                <p className="output service-description">{this.props.serviceDescriptionProps}</p>
              </div>
              <p>Freelancer may decline, or charge additionally for, work that Freelancer reasonably deems to be beyond this scope.</p>
              <p>The final deadline for completing the work is <span className="output service-due-date">{this.props.serviceDueDateProps}</span>.</p>
            </div>
            <div className="clause-section-title">OWNERSHIP OF THE WORK</div>
            <div className="clause-content">
              <p>Freelancer hereby assigns to Client all right, title and interest in the work produced or developed under this agreement, including all patent, trade secret and trademark rights, and copyrights, except that Freelancer shall retain the right to use the work for self-promotion, such as in a portfolio or exhibit. This assignment is conditioned on Freelancer being paid the full amount owed under this agreement.</p>
            </div>
            <div className="clause-section-title">PAYMENT</div>
            <div className="clause-content">
              <p>The Client will pay the Freelancer a fee of: US$ <span className="output service-fee">{this.props.serviceFeeProps}</span></p>
              <p>The Client will pay the Freelancer upon the following conditions:<span className="output service-fee">{this.props.paymentConditionsProps}</span></p>
              <p>Upon completion of the work, the Freelancer will invoice Client for any amount due. Payment is due in __________, or as specified in the invoice.</p>
              <p>Any amount not received by its due date will collect interest at the Prompt Payment Insterest Rate provided by the Department of Treasury.</p>

            </div>
            <div className="clause-section-title">CONFIDENTIAL INFORMATION</div>
            <div className="clause-content">
              <p>Any information supplied by one party to the other marked as "Confidential" must be used only for the purposes of this agreement and must not be disclosed to other parties without the discloser's written consent. This does not apply to information that is publicly available or that the recipient already properly knew, developed or received independently. When the agreement terminates, Freelancer must return to Client any materials containing confidential information. Confidentiality obligations survive termination of this agreement.</p>
            </div>
            <div className="clause-section-title">INDEPENDENT CONTRACTOR RELATIONSHIP</div>
            <div className="clause-content">
              <p>Freelancer is an independent contractor, not an employee or partner of Client. Freelancer is solely responsible for all taxes, withholdings, insurance, and any other obligations that may apply to an independent contractor.</p>
            </div>
            <div className="clause-section-title">LIMITED WARRANTY</div>
            <div className="clause-content">
              <p>FREELANCER WARRANTS THAT NO OBLIGATION TO A THIRD PARTY PROHIBITS FREELANCER FROM ENTERING INTO THIS AGREEMENT, AND THAT TO FREELANCER'S KNOWLEDGE, WORK PRODUCED UNDER THIS AGREEMENT WILL NOT VIOLATE THE INTELLECTUAL PROPERTY RIGHTS OF ANY THIRD PARTY.</p>
            </div>
            <div className="clause-section-title">LIMITATION OF LIABILITY</div>
            <div className="clause-content">
              <p>UNLESS A RESULT OF GROSS NEGLIGENCE OR WILLFUL MISCONDUCT, THE LIABILITY OF EITHER PARTY TO THE OTHER FOR ANY TYPE OF DAMAGES SHALL BE LIMITED TO THE AMOUNT OF FREELANCER'S TOTAL FEES UNDER THIS AGREEMENT.</p>
            </div>
            <div className="clause-section-title">TERMINATION</div>
            <div className="clause-content">
              <p>If either party materially breaches this agreement, the non-breaching party may terminate the agreement only by providing written notice of the breach to the breaching party. The breaching party shall have 5 days to cure the breach after receiving such notice. If the breaching party fails to cure the breach in that time, the agreement shall terminate except with respect to those obligations that are noted herein as surviving termination.</p>
              <p>If the agreement terminates for any reason other than a material uncured breach by Freelancer, then Freelancer is immediately entitled to <span className="output state-location">{this.props.earlyTerminationProps}</span></p>

            </div>

            <div className="clause-section-title">MISCELLANEOUS</div>
            <div className="clause-content">
              <p>This agreement is between Client and Freelancer and neither is allowed to delegate, transfer or assign it to a third party without the written consent of the other.
                            </p>
              <p>This is the parties' entire agreement on this matter, superseding all previous negotiations or agreements. It can only be changed by mutual written consent.</p>

              <p>The laws of the state of <span className="output state-location">{this.props.stateLocationProps}</span> govern this agreement and any disputes arising from it must be handled exclusively in courts in that state. The prevailing party in any dispute will be entitled to recover reasonable costs and attorneys' fees.</p>
              <p>Signing a copy of this agreement, physical or electronic, will have the same effect as signing an original.</p>
            </div>
            <div className="signature-section">

              <div className="date-location"><span className="output state-location">{this.props.stateLocationProps}</span>, <span className="output state-location">{this.props.executionDateProps}</span></div>
              <div className="signature-container-client">
                <p><span className="output client-name">{this.props.clientNameProps}</span></p>
              </div>
              <div className="signature-container-freelancer"></div>
              <p><span className="output freelancer-name">{this.props.userNameProps}</span></p>
            </div>

          </div>

        </div>
      </div>
    )
  }
}
