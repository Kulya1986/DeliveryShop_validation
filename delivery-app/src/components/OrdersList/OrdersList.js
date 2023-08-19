
import OrderCardHistory from '../OrderCardHistory/OrderCardHistory';
import './OrdersList.css';
import React from 'react';

const OrdersList = ({ordersList, orderTotalList}) => {

    if(ordersList.length!==0 && orderTotalList.length!==0)
    {
        return(
        <section className='orders-list'>
            {
                ordersList.map((item, ind) => {
                    return(
                        <OrderCardHistory 
                        orderProds={item} 
                        orderTotal={orderTotalList[ind]}
                        key={ind}
                        />
                    );
                })
            }
         </section>
        );
    } else {
        return(
            <section className='orders-list'>
                No orders to display.
             </section>
            );
    }       
}


export default OrdersList;

