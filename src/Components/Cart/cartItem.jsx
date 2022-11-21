import React from "react";
import "./cartItem.css";



export default class CartItem extends React.Component{
    state = {
        chosenImage: 0,
        itemQuantity: 1,
        test: {}
    }

    componentDidMount(){
        this.setState({itemQuantity: this.props.itemQuantity})
    }

    incrementQuantity = async () => {
        await this.setState({
            itemQuantity: this.state.itemQuantity+1, 
            test: {
                ...JSON.parse(localStorage.getItem("cartItem"))[this.props.id], 
                itemQuantity: this.state.itemQuantity+1
            }
        })
        this.props.incrementQuantity(this.state.test)
    }

    decrementQuantity = async () => {
        if(this.state.itemQuantity > 1){
        await this.setState({
            itemQuantity: this.state.itemQuantity-1, 
            test: {
                ...JSON.parse(localStorage.getItem("cartItem"))[this.props.id], 
                itemQuantity: this.state.itemQuantity-1}
            })
        this.props.decrementQuantity(this.state.test)}
    }

    render(){
        return(
        <>
            <div className="CartItem">
                    <div className="leftSide">
                        <h1>{this.props.title}</h1>
                        <h2>{this.props.description}</h2>
                        {
                            <p>
                                {this.props.prices[this.props.chosenCurrency].currency.symbol}
                                {this.props.prices[this.props.chosenCurrency].amount}
                            </p>
                        }
                        {
                            this.props.allAttributes.map(
                                element=>
                                {
                                    if(element.name === "Color"){
                                        return(
                                            <>
                                                <h3>{element.name}:</h3>
                                                <div className="attributes">
                                                        {element.items.map(color=>
                                                        <div className="selected">
                                                            <div style={{backgroundColor: color.value}} className="color-attribute"></div>
                                                        </div>
                                                        )}
                                                </div>
                                            </>
                                        )
                                    }
                                    else{
                                        return(
                                            <>
                                                <h3>{element.name}:</h3>
                                                <div className="attributes">
                                                    {element.items.map(attr=>
                                                        <div className="attribute">
                                                            <h1>{attr.displayValue}</h1>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )
                                        
                                    }
                                }
                            )
                        }
                </div>
                <div className="rightSide">
                        <img src={this.props.gallery[this.state.chosenImage]} alt="photo" />
                        <div className="btnGroup">
                            <button onClick={()=>this.state.chosenImage > 0 && this.state.chosenImage <=  this.props.gallery.length-1? this.setState({chosenImage: this.state.chosenImage - 1 }):null}>&lt;</button>
                            <button onClick={()=>this.state.chosenImage >= 0 && this.state.chosenImage <  this.props.gallery.length-1? this.setState({chosenImage: this.state.chosenImage + 1 }):null}>&gt;</button> 
                        </div>
                        <div className="quantity">
                            <button onClick={this.incrementQuantity}>+</button>
                            <div>{this.state.itemQuantity}</div>
                            <button onClick={this.decrementQuantity}>-</button>
                        </div>
                    </div>
            </div>
        </>
        )
    }
}