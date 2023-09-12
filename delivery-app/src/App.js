
import Navigation from './components/Navigation/Navigation';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';
import React, { Component } from 'react';
import ShoppingCart from './containers/ShoppingCart/ShoppingCart';
import Shop from './containers/Shop/Shop';
import History from './containers/History/History';
import Footer from './components/Footer/Footer';


class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
        activeShop: 0,
        shopInCart: 0,
        shoppingCart:[],
        cartTotal: 0,
        customerInfo:{
            customer_name:'',
            customer_email:'',
            customer_address:'',
            customer_phone:''
        },
        route:'shop',
        orderSubmitted: false
    }
  }
onNavigationTabClick = (tab) =>{
  this.setState({route:tab});
  if (tab==='shop' && this.state.orderSubmitted===true) this.setState({orderSubmitted:false});
}

shopInCartChange = (shop_id) => {
  this.setState({shopInCart:shop_id});
  if(shop_id!== this.state.activeShop) this.activeShopChange(shop_id);
}

activeShopChange = (shop_id) => {
    this.setState({activeShop:shop_id});
}

ifCartEmptyCheck = () => {
      this.activeShopChange(0);
      this.shopInCartChange(0);
}

onEmailChange = (event) => {
    this.setState(Object.assign(this.state.customerInfo,{customer_email:event.target.value}))
}

onPhoneChange = (event) => {
  this.setState(Object.assign(this.state.customerInfo,{customer_phone:event.target.value}))
}

onNameChange = (event) => {
  this.setState(Object.assign(this.state.customerInfo,{customer_name:event.target.value}))
}

onAddressChange = (event) => {
  this.setState(Object.assign(this.state.customerInfo,{customer_address:event.target.value}))
}


cartTotalChange=(newTotal) => {
  this.setState({cartTotal:newTotal});
}

shoppingCartChange=(newCart) =>{
  this.setState({shoppingCart:newCart});
}

onOrderSubmit = () =>{
    if (this.state.customerInfo.customer_name!=='' 
        && this.state.customerInfo.customer_email!==''
        && this.state.customerInfo.customer_phone!==''
        && this.state.customerInfo.customer_address!==''
        && this.state.shoppingCart.length!==0)
        {
          fetch('http://localhost:3000/submit-order', {
            method: "POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(
                {
                    shoppingCart:this.state.shoppingCart,
                    cartTotal: this.state.cartTotal,
                    customerInfo: this.state.customerInfo
                }
            )
          })
          .then(response => response.json())
          .then(reply => {
                if (reply === 'order placed')
                {
                    this.activeShopChange(0);
                    this.shopInCartChange(0);
                    this.cartTotalChange(0);
                    this.shoppingCartChange([]);
                    this.setState(Object.assign(this.state.customerInfo,{customer_email:''}));
                    this.setState(Object.assign(this.state.customerInfo,{customer_phone:''}));
                    this.setState(Object.assign(this.state.customerInfo,{customer_name:''}));
                    this.setState(Object.assign(this.state.customerInfo,{customer_address:''}));
                    this.setState({orderSubmitted:true});
                }
          }).catch(err => alert('Something went wrong. Try to submit order again.'))
        }   
}


//change  this.props.cartTotal and shoppingCart array when new item added
onAddToCart = (prod_id, prod_name, prod_price,prod_image, prod_quantity) => {
  
  //make fetch to BD with prod_id to get shop_id and call shopInCartChange(shop_id)
  const fetch_url = 'http://localhost:3000/shop-in-cart/'+prod_id;
  fetch(fetch_url,{
      method: "GET",
      headers:{'Content-Type':'application/json'}
    }).then(response => response.json())
      .then(shop => {
        if (shop!=='shop id does not exist' || shop!=='product not found') this.shopInCartChange(shop.shop_id)
      })
      .catch(err => console.log('cannot get shop ID from DB'));
  
  let newCartTotal = this.state.cartTotal+prod_price*prod_quantity;
  this.cartTotalChange(newCartTotal);
  const itemExists = this.state.shoppingCart.filter(item =>{
      return item.prod_id===prod_id;
    });
    if (itemExists.length) {
        this.state.shoppingCart.forEach(item => {
            if (itemExists[0].prod_id===item.prod_id) {
              let newQuantity = item.prod_quantity+prod_quantity;
              this.setState(Object.assign(item,{prod_quantity:newQuantity}));
            }
          })
    }else
    {
        const basketItem = {
            prod_id:prod_id,
            prod_name:prod_name,
            prod_price:prod_price,
            prod_image:prod_image,
            prod_quantity:prod_quantity
        }
        const newBasket=this.state.shoppingCart.map(item => item);
        newBasket.push(basketItem);
        this.shoppingCartChange(newBasket);
    } 
}

  render(){

    let mainContent;
    if (this.state.route === 'shop')
        {
            mainContent=<Shop 
                          activeShop={this.state.activeShop} 
                          shopInCart={this.state.shopInCart}
                          activeShopChange={this.activeShopChange}
                          onAddToCart={this.onAddToCart}
                        />
        }
      else if (this.state.route === 'cart') 
      {
          mainContent = <ShoppingCart 
                            shoppingCart={this.state.shoppingCart}
                            cartTotal={this.state.cartTotal}
                            orderSubmitted={this.state.orderSubmitted}
                            customerInfo={this.state.customerInfo}
                            onEmailChange={this.onEmailChange}
                            onPhoneChange={this.onPhoneChange}
                            onAddressChange={this.onAddressChange}
                            onNameChange={this.onNameChange}
                            cartTotalChange={this.cartTotalChange}
                            shoppingCartChange={this.shoppingCartChange}
                            onOrderSubmit={this.onOrderSubmit}
                            ifCartEmptyCheck={this.ifCartEmptyCheck}
                        />
      }
      else
      {
          mainContent = <History/>
      }

    return (
      <div className='body-container'>
          <Navigation onNavigationTabClick={this.onNavigationTabClick}/> 
          {mainContent}
          <Footer/>
      </div>
      
    );
  }
  
}

export default App;

      