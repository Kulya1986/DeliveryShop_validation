import '@blueprintjs/core/lib/css/blueprint.css';
import {Button, NumericInput} from '@blueprintjs/core';
import './BasketItem.css';
import React from 'react';

const BasketItem = ({prod_name, prod_price, prod_quantity, prod_id, prod_image, onItemDeleteFromCart, onQuantityChange}) =>
    {
        return(
            <article className='cart-product'>
                <div className='cart-product-img'>
                    <img  src={prod_image} alt='burger'/>
                </div>
                <div className='cart-product-info'>
                    <div className='cart-product-name'>
                        <span>{prod_name}</span>
                    </div>
                    <div className='cart-product-price'>
                        <span>Price: {prod_price} $</span>
                    </div>
                    <div className='cart-product-quantity'>
                        <NumericInput 
                            className='quantity-input' 
                            min={1} max={10} 
                            value={prod_quantity} 
                            fill 
                            minorStepSize={null} 
                            stepSize={1}
                            onValueChange={(valueAsNumber)=>{onQuantityChange(valueAsNumber,prod_id)}}
                        />
                    </div>
                </div>
                <Button 
                    className='bp4-minimal cart-product-remove' 
                    icon='cross-circle'
                    onClick={()=>{onItemDeleteFromCart(prod_id,prod_price,prod_quantity)}}/>
            </article>
         );
    } 


export default BasketItem;

