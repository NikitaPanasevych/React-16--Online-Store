import React from "react";
import CartItem from "../Components/Cart/cartItem";
import "./Cart.css"

export default class Cart extends React.Component{
    state={
        cartItems: [],
        quantity: {}
    }

    static getDerivedStateFromProps(props){
        return{cartItems: props.cartItems}
    }

    incrementQuantity = (clickedItem) => {
        this.props.incrementQuantity(clickedItem)
    }

    decrementQuantity = (clickedItem) => {
        this.props.decrementQuantity(clickedItem)
    }

    render(){
        return(
        <>
            <div className="Cart">
                <h1>CART</h1>
                <div className="CartContainer">
                {this.state.cartItems?
                    /*JSON.parse(localStorage.getItem("cartItem"))*/this.state.cartItems.map(
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
                                    itemQuantity={element.itemQuantity}
                                    id={index}
                                    incrementQuantity={this.incrementQuantity}
                                    decrementQuantity={this.decrementQuantity} 
                                />
                        </>
                        ):null
                }
                <hr />
                </div>
                <footer>
                    <p>Tax 21%: <strong>taxAmount</strong></p>
                    <p>Quantity: <strong>amount</strong></p>
                    <p>Total: <strong>totalAmount</strong></p>
                    <button className="">Order</button>
                </footer>
            </div>
        </>
        )
    }
}