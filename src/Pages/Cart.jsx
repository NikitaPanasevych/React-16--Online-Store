import React from "react";
import "./Cart.css"

export default class Cart extends React.Component{
    state = {   
        data:[],
        cartItems:[]
        }

    static getDerivedStateFromProps(props){
        console.log(props.cartItems)
        return{data: props.data, cartItems: props.cartItems}
      }

    render(){
        return(
        <>{this.state.data?
            <div className="Cart">
                <h1>Cart</h1>
            </div>:null}
        </>
        )
    }
}