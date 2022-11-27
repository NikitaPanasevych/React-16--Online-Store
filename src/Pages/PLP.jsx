import './PLP.css';
import React from 'react';
import ProductCard from "../Components/PLP/ProductCard"

export default class PLP extends React.Component {
  constructor(props){
    super(props)
    this.state={
      data: [],
      chosenCategory: 0,
      clickedItemId: ""
    }
  }

  static getDerivedStateFromProps(props){
    return({
      data: props.data[props.chosenCategory]
    })
}

  addToCartFromPLP = (itemId) => {
    this.props.addToCartFromPLP(itemId)
  }

  handleClick = (clickedItem) => {
    this.props.handleClick(clickedItem)
  }

    render(){
        return(
        <>
           {this.state.data? <div className="Main">
                <h1 className=' CategoryName'>{this.state.data.name}</h1>
                <div className="Container">
                    {this.state.data.products.map(element =>
                      <ProductCard 
                    id={element.id}
                    name={element.name}
                    price={element.prices[this.props.chosenCurrency].amount}
                    label={element.prices[this.props.chosenCurrency].currency.symbol}
                    imageUrl={element.gallery[0]}
                    handleClick={this.handleClick}
                    addToCartFromPLP={this.addToCartFromPLP}
                        />)}
                </div>
            </div>:null}
           </>
        )
    }
  }