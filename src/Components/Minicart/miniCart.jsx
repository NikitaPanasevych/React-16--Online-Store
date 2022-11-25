import React from "react";
import "./miniCart.css";
import OutsideAlerter from "../MenuComponents/OutsideAlert";
import CartItem from "../Cart/cartItem";


export default class MiniCart extends React.Component{
    state={
        cartItems: []
    }


    static getDerivedStateFromProps(props){
        return{cartItems: props.cartItems}
    }

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
                    <div className="MiniCartContainer">
                    {this.state.cartItems?
                    this.state.cartItems.map(
                        (element, index)=>
                        <>
                                <hr />
                                <CartItem 
                                    title={element.description}
                                    description={element.name}
                                    allAttributes={element.allAttributes}
                                    chosenAttributes={element.chosenAttributes}
                                    prices={element.prices}
                                    gallery={element.gallery}
                                    chosenCurrency={this.props.chosenCurrency}
                                    id={index}
                                />
                        </>
                        ):null
                }
                    </div>
                        <div className="footer">
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
                </div>
            </OutsideAlerter>  
        </>
        )
    }
}