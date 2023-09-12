import ProdCard from '../ProdCard/ProdCard';
import './ProdList.css';
import React, { Component } from 'react';

class ProdList extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/shop-products', {
              method: "POST",
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify(
                  {
                      shop_id:this.props.activeShop
                  })
            }).then(response => response.json())
              .then(prods => {
                if (prods!=='no products in the shop' && prods!=='failed to load products')
                this.setState({products:prods});
              }).catch (err => console.log(err))
    }

    componentDidUpdate(prevProps, prevState){

        if (prevProps.activeShop !== this.props.activeShop)
        {
            fetch('http://localhost:3000/shop-products', {
              method: "POST",
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify(
                  {
                      shop_id:this.props.activeShop
                  })
            }).then(response => response.json())
              .then(prods => {
                if (prods!=='no products in the shop' && prods!=='failed to load products')
                this.setState({products:prods});
                else this.setState({products:[]});
              }).catch (err => console.log('failed to load products'))
            }
        }   

    render(){
        const {products} = this.state;
        // console.log(products);
        if(products.length===0){
            return(
                <section className='products-list'>
                    No products to display.
                </section>
            );
        }else
        {
            return(
                <section className='products-list'>
                    {
                        products.map((item,ind) => {
                            return(
                                <ProdCard 
                                    prod_name={item.prod_name} 
                                    prod_price={item.prod_price} 
                                    prod_id={item.prod_id}
                                    prod_image={item.prod_image}
                                    key={ind}
                                    onAddToCart={this.props.onAddToCart}
                                />
                            );
                        })
                    }
                </section>
                
            );
        }
        
    }

}


export default ProdList;

