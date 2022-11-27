import React from "react";
import "./miniCart.css";
import OutsideAlerter from "../MenuComponents/OutsideAlert";
import CartItem from "../Cart/cartItem";


export default class MiniCart extends React.Component{
    state={
        cartItems: [],
        total: 0,
        symbol: "",
        quantity: 0
    }


    static getDerivedStateFromProps(props, state){
        return{
            cartItems: props.cartItems,
            /*symbol: props.cartItems[0].prices[props.chosenCurrency].currency.symbol,*/
            total: props.cartItems.map(e=>e.prices[props.chosenCurrency].amount * e.count).reduce((total, value)=>total=total+value, 0),
            quantity: props.cartItems.map(e=>e.count).reduce((total, value)=>total=total+value, 0)
        }
    }

    handleClickOutside = () =>{
        this.props.handleClickOutside();
    }

    incrementQuantity = (name, attributes) => {
        this.props.incrementQuantity(name, attributes)
    }

    decrementQuantity = (name, attributes) => {
        this.props.decrementQuantity(name, attributes)
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
                                    count={element.count}
                                    chosenCurrency={this.props.chosenCurrency}
                                    id={index}
                                    incrementQuantity={this.incrementQuantity}
                                    decrementQuantity={this.decrementQuantity}
                                />
                        </>
                        ):null
                }
                    </div>
                        <div className="footer">
                            <div className="totalContainer">
                                <p>
                                    <strong>Total:</strong>
                                    <strong className="Total">{this.state.total} {this.props.CurrencySymbols[this.props.chosenCurrency]}</strong>
                                </p>
                            </div>
                            <div className="CheckoutBtns">
                                <button href="/cart">
                                    <a>View bag</a>
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