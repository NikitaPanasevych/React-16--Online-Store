import React from "react";
import "./miniCart.css";
import OutsideAlerter from "../MenuComponents/OutsideAlert";


export default class MiniCart extends React.Component{

    handleClickOutside = () =>{
        this.props.handleClickOutside();
    }

    render(){
        return(
        <>
            <div className="background"></div>
            <OutsideAlerter handleClickOutside={this.handleClickOutside}>
                <div className="MiniCart">
                    <p><strong>My Bag:</strong> { this.props.cartLength} Items</p>
                    <div className="totalContainer">
                        <p>
                            <strong>Total:</strong>
                            <strong className="Total">Amount</strong>
                        </p>
                    </div>
                    <div className="CheckoutBtns">
                        <button >
                            <a href="/cart">View bag</a>
                        </button>
                        <button >Checkout</button>
                    </div>
                </div>
            </OutsideAlerter>  
        </>
        )
    }
}