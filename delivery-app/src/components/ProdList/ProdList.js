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
//Photo by <a href="https://unsplash.com/@briewilly?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Chad Montano</a> on <a href="https://unsplash.com/images/food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
// Photo by <a href="https://unsplash.com/@roonz_nl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">RoonZ nl</a> on <a href="https://unsplash.com/images/nature/flower?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
// Photo by <a href="https://unsplash.com/@anna2301?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Anna Pavlin</a> on <a href="https://unsplash.com/images/nature/rose?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
//Photo by <a href="https://unsplash.com/@rebecca_lee_creative?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rebecca</a> on <a href="https://unsplash.com/s/photos/peony?license=free&utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
 //Photo by <a href="https://unsplash.com/@shouravsheikh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Shourav Sheikh</a> on <a href="https://unsplash.com/images/food/pizza?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
 //Photo by <a href="https://unsplash.com/@thisisnando?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Fernando Andrade</a> on <a href="https://unsplash.com/images/food/pizza?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
 //Photo by <a href="https://unsplash.com/@epicantus?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Daria Nepriakhina 🇺🇦</a> on <a href="https://unsplash.com/images/things/book?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
 //Photo by <a href="https://unsplash.com/@brett_jordan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Brett Jordan</a> on <a href="https://unsplash.com/s/photos/nuggets?license=free&utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
 //Photo by <a href="https://unsplash.com/@jamesyarema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">James Yarema</a> on <a href="https://unsplash.com/s/photos/coke?license=free&utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
 //Photo by <a href="https://unsplash.com/@mitchel3uo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mitchell Luo</a> on <a href="https://unsplash.com/s/photos/fries?license=free&utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@briewilly?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Chad Montano</a> on <a href="https://unsplash.com/images/food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>  
}


export default ProdList;

