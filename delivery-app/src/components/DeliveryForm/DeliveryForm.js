
import './DeliveryForm.css';
import React from 'react';


const DeliveryForm =({onEmailChange, onPhoneChange, onAddressChange, onNameChange, orderSubmitted, customerInfo, validationMsgs, validField}) => {
    const errorMsgs = {
        errorName: 'input-'+validField.validName,
        errorEmail: 'input-'+validField.validEmail,
        errorPhone: 'input-'+validField.validPhone,
        errorAddress: 'input-'+validField.validAddress
    }

    if(!orderSubmitted){
        return(
            <section className="delivery-form">
                        <div className="form-input">
                            <label className="del-form-input" htmlFor="first-name">Name</label>
                            <input onChange={onNameChange} className={validField.validName.toString()} type="text" name="first-name"  id="first-name" value={customerInfo.customer_name} required pattern="^[A-Za-z.\s]+$" title={validationMsgs.validationMsgName}/>
                            <div className={errorMsgs.errorName}>
                                <img src='images/warning16.png' alt='error'/>
                                <p>{validationMsgs.validationMsgName}</p>
                                </div>
                        </div>
                        <div className="form-input">
                            <label className="del-form-input" htmlFor="email-address">Email</label>
                            <input onChange={onEmailChange} className={validField.validEmail.toString()} type="email" name="email-address"  id="email-address" value={customerInfo.customer_email} required pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$" title={validationMsgs.validationMsgEmail}/>
                            <div className={errorMsgs.errorEmail}>
                                <img src='images/warning16.png' alt='error'/>
                                <p>{validationMsgs.validationMsgEmail}</p>
                            </div>
                        </div>
                        <div className="form-input">
                            <label className="del-form-input" htmlFor="phone">Phone</label>
                            <input onChange={onPhoneChange} className={validField.validPhone.toString()} type="text" name="phone"  id="phone" value={customerInfo.customer_phone} required pattern="^\(?\d{3}\)?\s?\d{3}-?\s?\d{2}-?\s?\d{2}$" title={validationMsgs.validationMsgPhone}/>
                            <div className={errorMsgs.errorPhone}>
                                <img src='images/warning16.png' alt='error'/>
                                <p>{validationMsgs.validationMsgPhone}</p>
                            </div>
                        </div>
                        <div className="form-input">
                            <label className="del-form-input" htmlFor="address">Address</label>
                            <input onChange={onAddressChange} className={validField.validAddress.toString()} type="text" name="address"  id="address" value={customerInfo.customer_address} required title={validationMsgs.validationMsgAddress}/>
                            <div className={errorMsgs.errorAddress}>
                                <img src='images/warning16.png' alt='error'/>
                                <p>{validationMsgs.validationMsgAddress}</p>
                            </div>
                        </div>
            </section>
        );
    }else{
        return(
            <section className="delivery-form">
                <p>
                    Your order was successfully placed. Visit our shops page to order more products.
                </p>
            </section>
        );
    }
    
}
    


export default DeliveryForm;