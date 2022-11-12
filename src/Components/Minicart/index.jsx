import React from "react";
import "./index.css";


export default class MiniCart extends React.Component{
    render(){
        return(
        <>
                <div className="MiniCart">
                    <p><strong>My Bag:</strong>{" 1 "}Items</p>
                    <div className="totalContainer">
                        <p>
                            <strong>Total:</strong>
                            <strong className="Total">Amount</strong>
                        </p>
                    </div>
                    <div className="CheckoutBtns">
                        <button >
                            <a href="/cart">Link</a>
                        </button>
                        <button >Checkout</button>
                    </div>
                </div>  

        </>
        )
    }
}