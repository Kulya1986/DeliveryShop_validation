import BasketItem from '../BasketItem/BasketItem';
import './BasketList.css';
import React from 'react';

const BasketList = ({shoppingCart, cartTotal,onItemDeleteFromCart, onQuantityChange}) => {
    if (shoppingCart.length)
    {
        return(
            <section className='basket-list'>
                {
                        shoppingCart.map((item, ind) => {
                        
                            return(
                                <BasketItem 
                                    prod_name={item.prod_name} 
                                    prod_price={item.prod_price} 
                                    prod_quantity={item.prod_quantity} 
                                    prod_id={item.prod_id}
                                    prod_image={item.prod_image} 
                                    key={ind}
                                    onItemDeleteFromCart={onItemDeleteFromCart}
                                    onQuantityChange={onQuantityChange}
                                />
                            );
                        })
      
                }
            </section>        
        );
    } else
    {
        return(
            <section className='basket-list'>
                Your cart is empty. Visit out shops page to add products. 
            </section>
        );
    }
}


export default BasketList;

