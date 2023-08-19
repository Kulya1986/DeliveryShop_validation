
import ProdCardHistory from '../ProdCardHistory/ProdCardHistory';
import './OrderCardHistory.css';
import React from 'react';

const OrderCardHistory = ({orderProds, orderTotal}) => {
    return(
            <section className='order-card-history'>
                <div className='order-card-prods'>
                    {
                        orderProds.map((item) => {
                            console.log('OrderCard', item);
                            return(
                                <ProdCardHistory    
                                    prod_image={item.prod_image} 
                                    prod_name={item.prod_name} 
                                    prod_price={item.prod_price} 
                                    prod_quantity={item.prod_quantity} 
                                    key={item.prod_id}  
                                />
                            );
                        })      
                    }
                </div>
                <div className='order-card-total'>
                    <div>Total price:</div> 
                    <div>{orderTotal} $</div>
                </div>
            </section>        
        );
}


export default OrderCardHistory;

