
import './OrdersHistoryForm.css';
import React from 'react';


const OrdersHistoryForm = ({customerDetails, onEmailChange, onPhoneChange, requestSubmit, validFieldHistory, validationMsgsHistory}) => {
    const errorMsgs = {
        errorEmail: 'input-'+validFieldHistory.validEmail,
        errorPhone: 'input-'+validFieldHistory.validPhone
    }
        return(
            <section className="orders-history-form">
                        <div className="history-input">
                            <label className="history-form-input" htmlFor="email-address">Email</label>
                            <input onChange={onEmailChange} className={validFieldHistory.validEmail.toString()}  type="email" name="email-address"  id="email-address" value={customerDetails.customer_email} required pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$" title={validationMsgsHistory.validationMsgEmail}/>
                            <div className={errorMsgs.errorEmail}>
                                <img src='images/warning16.png' alt='error'/>
                                <p>{validationMsgsHistory.validationMsgEmail}</p>
                            </div>
                        </div>
                        <div className="history-input">
                            <label className="history-form-input" htmlFor="phone">Phone</label>
                            <input onChange={onPhoneChange} className={validFieldHistory.validPhone.toString()}  type="text" name="phone"  id="phone" value={customerDetails.customer_phone} required pattern="^\(?\d{3}\)?\s?\d{3}-?\s?\d{2}-?\s?\d{2}$" title={validationMsgsHistory.validationMsgPhone}/>
                            <div className={errorMsgs.errorPhone}>
                                <img src='images/warning16.png' alt='error'/>
                                <p>{validationMsgsHistory.validationMsgPhone}</p>
                            </div>                      
                        </div>
                        <input className="history-submit" 
                            type="submit" 
                            value="Orders"
                            onClick={requestSubmit}
                    />
            </section>
        );

}
    


export default OrdersHistoryForm;