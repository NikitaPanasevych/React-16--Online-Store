import React from "react";
import CartItem from "../Components/Cart/cartItem";
import "./Cart.css"

export default class Cart extends React.Component{
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

    incrementQuantity = (name, attributes) => {
        this.props.incrementQuantity(name, attributes)
    }

    decrementQuantity = (name, attributes) => {
        this.props.decrementQuantity(name, attributes)
    }

    render(){
        return(
        <>
            <div className="Cart">
                <h1>CART</h1>
                <div className="CartContainer">
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
                                    update={this.update}
                                    incrementQuantity={this.incrementQuantity}
                                    decrementQuantity={this.decrementQuantity}
                                />
                        </>
                        ):null
                }
                <hr />
                </div>
                <footer>
                    <p>Tax 21%: <strong>
                        {   
                            Math.round(this.state.total * 0.21 * 100) / 100
                        } {this.state.symbol}
                    </strong></p>
                    <p>Quantity: <strong>{this.state.quantity}</strong></p>
                    <p>Total: <strong>
                        {Math.round(this.state.total * 100)/100} {this.state.symbol}
                    </strong></p>
                    <button className="">Order</button>
                </footer>
            </div>
        </>
        )
    }
}