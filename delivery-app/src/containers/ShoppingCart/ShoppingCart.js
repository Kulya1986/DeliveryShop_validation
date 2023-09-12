import BasketList from '../../components/BasketList/BasketList';
import DeliveryForm from '../../components/DeliveryForm/DeliveryForm';
import './ShoppingCart.css';
import React, { Component } from 'react';


class ShoppingCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            validField:{
                validName:true,
                validEmail: true,
                validPhone:true,
                validAddress: true
            },
            validationMsgs:{
                validationMsgName:'',
                validationMsgEmail:'',
                validationMsgPhone:'',
                validationMsgAddress:''
            }    
        }
    }

    onQuantityChange = (newQuantity, prod_id) => {
        this.props.shoppingCart.forEach(item => {
            if(item.prod_id===prod_id){
                const prevQuantity = item.prod_quantity;
                if (prevQuantity>newQuantity) 
                {
                    const newCartTotal = this.props.cartTotal - (prevQuantity-newQuantity)*item.prod_price;
                    this.props.cartTotalChange(newCartTotal);
                }
                else if (prevQuantity<newQuantity) 
                {
                    const newCartTotal = this.props.cartTotal + (newQuantity-prevQuantity)*item.prod_price;
                    this.props.cartTotalChange(newCartTotal);
                }
                this.setState(Object.assign(item,{prod_quantity:newQuantity}));
            }   
        });
    }

    //change this.props.cartTotal, shoppingCart array and change shopInCart state to 0
    // by calling ifCartEmptyCheck fucntion if basket is empty, when item deleted

    onItemDeleteFromCart = (prod_id, prod_price, prod_quantity) => {
        let newCartTotal = this.props.cartTotal-prod_price*prod_quantity;
        this.props.cartTotalChange(newCartTotal);
        this.props.shoppingCart.forEach((item,ind) => {
            if (prod_id===item.prod_id) {
                const newBasket=this.props.shoppingCart.map(item => item);
                newBasket.splice(ind, 1);
                this.props.shoppingCartChange(newBasket);
                if (newBasket.length===0) this.props.ifCartEmptyCheck();
            }
        })
    }

    onOrderSubmitClick = () =>{
        this.validationCheck();
        const st = this.state.validField;
        if (st.validName && st.validEmail && st.validPhone && st.validAddress)
        {
            this.props.onOrderSubmit();
        }
    }

    validationCheck = () =>{
        const {customer_name, customer_email, customer_phone, customer_address} = this.props.customerInfo;
        const phoneExp = /^\(?\d{3}\)?\s?\d{3}-?\s?\d{2}-?\s?\d{2}$/;
        const emailExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const nameExp = /^[A-Za-z.\s]+$/;
        
        //Name field validation
        if (customer_name.length>0) {
            if (customer_name.search(nameExp) === 0){
                this.setState(Object.assign(this.state.validField,{validName:true}));
                this.setState(Object.assign(this.state.validationMsgs,{validationMsgName:''}));
            }
            else {
                this.setState(Object.assign(this.state.validField,{validName:false}));
                this.setState(Object.assign(this.state.validationMsgs,{validationMsgName:'Name field can include only latin upper/lowercase letters, \'.\' or space.'}));
            }
        }
        else{
            this.setState(Object.assign(this.state.validField,{validName:false}));
            this.setState(Object.assign(this.state.validationMsgs,{validationMsgName:'Name field can\'t be empty'}));
        }

        //Address field validation
        if (customer_address.length>0) {
            this.setState(Object.assign(this.state.validField,{validAddress:true}));
            this.setState(Object.assign(this.state.validationMsgs,{validationMsgAddress:''}));
        }
        else{
            this.setState(Object.assign(this.state.validField,{validAddress:false}));
            this.setState(Object.assign(this.state.validationMsgs,{validationMsgAddress:'Address field can\'t be empty'}));
        }

        //Phone field validation
        if (customer_phone.length>0) {
            if (customer_phone.search(phoneExp) === 0){
                this.setState(Object.assign(this.state.validField,{validPhone:true}));
                this.setState(Object.assign(this.state.validationMsgs,{validationMsgPhone:''}));
            }
            else {
                this.setState(Object.assign(this.state.validField,{validPhone:false}));
                this.setState(Object.assign(this.state.validationMsgs,{validationMsgPhone:'Allowed formats for phone: (xxx)xxx-xx-xx, (xxx)xxx xx xx, (xxx)xxxxxxx, xxxxxxxxxx'}));
            }
        }
        else{
            this.setState(Object.assign(this.state.validField,{validPhone:false}));
            this.setState(Object.assign(this.state.validationMsgs,{validationMsgPhone:'Phone field can\'t be empty'}));
        }

        //Email field validation
        if (customer_email.length>0) {
            if (customer_email.search(emailExp) === 0){
                this.setState(Object.assign(this.state.validField,{validEmail:true}));
                this.setState(Object.assign(this.state.validationMsgs,{validationMsgEmail:''}));
            }
            else {
                this.setState(Object.assign(this.state.validField,{validEmail:false}));
                this.setState(Object.assign(this.state.validationMsgs,{validationMsgEmail:'Email should be in format \'name@example.com\''}));
            }
        }
        else{
            this.setState(Object.assign(this.state.validField,{validEmail:false}));
            this.setState(Object.assign(this.state.validationMsgs,{validationMsgEmail:'Email field can\'t be empty'}));
        }    
    }
  
    render(){
        return(
            <main className="shopping-cart">
                <div className='cart-container'>
                    <DeliveryForm 
                        onEmailChange={this.props.onEmailChange}
                        onPhoneChange={this.props.onPhoneChange}
                        onAddressChange={this.props.onAddressChange}
                        onNameChange={this.props.onNameChange}
                        orderSubmitted={this.props.orderSubmitted}
                        customerInfo={this.props.customerInfo}
                        validationMsgs={this.state.validationMsgs}
                        validField={this.state.validField}
                    />  
                    <BasketList 
                        shoppingCart={this.props.shoppingCart} 
                        cartTotal={this.props.cartTotal}
                        onItemDeleteFromCart={this.onItemDeleteFromCart}
                        onQuantityChange={this.onQuantityChange}
                    />
                </div>
                <div className="cart-summary">
                    <div className='cart-total'>Total price: {Number(this.props.cartTotal).toFixed(2)} $</div>
                    <input className="cart-submit" 
                            type="submit" 
                            value="Submit"
                            onClick={this.onOrderSubmitClick}
                    />
                </div>
             </main>
        
        );
    }
} 
    


export default ShoppingCart;