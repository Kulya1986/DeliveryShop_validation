
import {Navbar,
        Button, 
        Alignment} from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './Navigation.css'
import React from 'react';

const Navigation = ({onNavigationTabClick}) => {

    return (
    <Navbar style={{backgroundColor: '#baccaa', color: '#01233e', width:'100%'}}>
        <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading className='nav-text-style'>DeliveryShop</Navbar.Heading>
        <Navbar.Divider />
        <Button 
            className="bp4-minimal nav-text-style" 
            text="Shop" 
            style={{color: '#01233e', padding:'0 1.6rem'}}
            onClick={()=>{onNavigationTabClick('shop')}}
        />
        <Button 
            className="bp4-minimal nav-text-style" 
            text="Shopping Cart" 
            style={{color: '#01233e', padding:'0 1.6rem'}}
            onClick={()=>{onNavigationTabClick('cart')}}
        />
         <Button 
            className="bp4-minimal nav-text-style" 
            text="History" 
            style={{color: '#01233e', padding:'0 1.6rem'}}
            onClick={()=>{onNavigationTabClick('history')}}
        />
        </Navbar.Group>
    </Navbar>
    );
}


export default Navigation;

