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
            orders:[]
        }
    }

    onEmailChange = (event) => {
        this.setState(Object.assign(this.state.customerDetails,{customer_email:event.target.value}))
    }
    
    onPhoneChange = (event) => {
      this.setState(Object.assign(this.state.customerDetails,{customer_phone:event.target.value}))
    }

    requestSubmit = () => {
        if (this.state.customerDetails.customer_email!=='' 
        && this.state.customerDetails.customer_phone!=='')
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