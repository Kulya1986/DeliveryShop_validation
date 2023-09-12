import OrdersHistoryForm from '../../components/OrdersHistoryForm/OrdersHistoryForm';
import OrdersList from '../../components/OrdersList/OrdersList';
import './History.css';
import React, { Component } from 'react';


class History extends Component{

    constructor(){
        super();
        this.state={
            customerDetails:{
                customer_email:'',
                customer_phone:''
            },
            orders:[],
            validFieldHistory:{
                validEmail: true,
                validPhone:true
            },
            validationMsgsHistory:{
                validationMsgEmail:'',
                validationMsgPhone:''
            }    
        }
    }

    onEmailChange = (event) => {
        this.setState(Object.assign(this.state.customerDetails,{customer_email:event.target.value}))
    }
    
    onPhoneChange = (event) => {
      this.setState(Object.assign(this.state.customerDetails,{customer_phone:event.target.value}))
    }

    formInputsValidation = () =>{
        const {customer_email, customer_phone} = this.state.customerDetails;
        const phoneExp = /^\(?\d{3}\)?\s?\d{3}-?\s?\d{2}-?\s?\d{2}$/;
        const emailExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

        //Phone field validation
        if (customer_phone.length>0) {
            if (customer_phone.search(phoneExp) === 0){
                this.setState(Object.assign(this.state.validFieldHistory,{validPhone:true}));
                this.setState(Object.assign(this.state.validationMsgsHistory,{validationMsgPhone:''}));
            }
            else {
                this.setState(Object.assign(this.state.validFieldHistory,{validPhone:false}));
                this.setState(Object.assign(this.state.validationMsgsHistory,{validationMsgPhone:'Allowed formats for phone: (xxx)xxx-xx-xx, (xxx)xxx xx xx, (xxx)xxxxxxx, xxxxxxxxxx'}));
            }
        }
        else{
            this.setState(Object.assign(this.state.validFieldHistory,{validPhone:false}));
            this.setState(Object.assign(this.state.validationMsgsHistory,{validationMsgPhone:'Phone field can\'t be empty'}));
        }

        //Email field validation
        if (customer_email.length>0) {
            if (customer_email.search(emailExp) === 0){
                this.setState(Object.assign(this.state.validFieldHistory,{validEmail:true}));
                this.setState(Object.assign(this.state.validationMsgsHistory,{validationMsgEmail:''}));
            }
            else {
                this.setState(Object.assign(this.state.validFieldHistory,{validEmail:false}));
                this.setState(Object.assign(this.state.validationMsgsHistory,{validationMsgEmail:'Email should be in format \'name@example.com\''}));
            }
        }
        else{
            this.setState(Object.assign(this.state.validFieldHistory,{validEmail:false}));
            this.setState(Object.assign(this.state.validationMsgsHistory,{validationMsgEmail:'Email field can\'t be empty'}));
        }
    }

    requestSubmit = () => {
        this.formInputsValidation();
        if (this.state.validFieldHistory.validEmail 
        && this.state.validFieldHistory.validPhone)
            {
                fetch('http://localhost:3000/orders-history', {
                    method: "POST",
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(
                        {
                            customer_email:this.state.customerDetails.customer_email,
                            customer_phone: this.state.customerDetails.customer_phone
                        }
                    )
                }).then(response => response.json())
                  .then(custOrders => {
                    if(custOrders==='no orders placed for this customer' || custOrders==='failed to load orders')
                    {
                        this.setState({orders:[]});
                    }
                    else this.setState({orders:custOrders});
                  })
                  .catch(err => console.log('could not pull orders from server'));
                
            }
    }
  
    render(){
        
        let ordersList=[], prodsOfOrder=[],orderTotalList=[];
        
        if (this.state.orders.length!==0){
            this.state.orders.sort((item1, item2)=>{
                return item1.order_id - item2.order_id;
            });
            let tempOrderId = this.state.orders[0].order_id;
            orderTotalList.push(this.state.orders[0].order_total);
            this.state.orders.forEach(position => {
                if (position.order_id===tempOrderId) prodsOfOrder.push(position);
                else
                {
                    ordersList.push(prodsOfOrder);
                    prodsOfOrder=[];
                    tempOrderId=position.order_id;
                    orderTotalList.push(position.order_total);
                    prodsOfOrder.push(position);
                }
            });
            ordersList.push(prodsOfOrder);
        }
        
        return(
            <main className="orders-history">
                <div className='orders-history-form-container'>
                    <OrdersHistoryForm
                        customerDetails={this.state.customerDetails}
                        onEmailChange={this.onEmailChange}
                        onPhoneChange={this.onPhoneChange}
                        requestSubmit={this.requestSubmit}
                        validFieldHistory={this.state.validFieldHistory}
                        validationMsgsHistory={this.state.validationMsgsHistory}
                    />  
                </div>
                <div className='orders-history-container'>
                    <OrdersList 
                        ordersList ={ordersList} 
                        orderTotalList={orderTotalList}
                    />
                </div>
             </main>
        
        );
    }
} 
    


export default History;