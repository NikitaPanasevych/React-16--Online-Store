import React from "react";
import "./Cart.css"

export default class Cart extends React.Component{
    state = {   data:[]    }

    static getDerivedStateFromProps(props){
        return{data: props.data}
      }

    render(){
        return(
        <h1>CART</h1>
        )
    }
}