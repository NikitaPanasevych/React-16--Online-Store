import React from "react";
import "./cartItem.css";



export default class CartItem extends React.Component{
    state = {
        chosenImage: 0,
        quantity: 1,
        total: 0,
        symbol: ""
    }

    componentDidMount(){
        this.setState({
            total: this.state.quantity*this.props.prices[this.props.chosenCurrency].amount,
            symbol: this.props.prices[this.props.chosenCurrency].currency.symbol
        })
        
    }


    incrementQuantity = async () => {
        this.props.incrementQuantity(this.props.description ,this.props.chosenAttributes)
    }

    decrementQuantity = async () => {
        this.props.decrementQuantity(this.props.description ,this.props.chosenAttributes)
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
                                                        (color.value === this.props.chosenAttributes.find(val=>val.selectedAttribute === "Color").selectedAttributeVal)?
                                                        <div  className="selected">
                                                            <div style={{backgroundColor: color.value}} className="color-attribute"></div>
                                                        </div>
                                                        :
                                                        <div style={{borderColor: "white"}} className="selected">
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
                                                        (attr.value === this.props.chosenAttributes.find(val=>val.selectedAttribute === element.name).selectedAttributeVal)?
                                                        <div style={{backgroundColor: "black", color: "white"}} className="attribute">
                                                            <h1>{attr.displayValue}</h1>
                                                        </div>
                                                        :
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
                            <div>{this.props.count}</div>
                            <button onClick={this.decrementQuantity}>-</button>
                        </div>
                    </div>
            </div>
        </>
        )
    }
}