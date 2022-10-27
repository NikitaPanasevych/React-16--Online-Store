import './PLP.css';
import React from 'react';
import ProductCard from "../Components/PLP/ProductCard"



export default class PLP extends React.Component {
  constructor(props){
    super(props)
    this.state={
      data: [],
      chosenCategory: 0,
      clickedItemId: "",
      loading: true
    }
  }

 
  static getDerivedStateFromProps(props, state){
    return{data: props.data[props.chosenCategory], loading: false}
}

  handleClick = (clickedItem) => {
    this.props.handleClick(clickedItem)
  }

    render(){
        return(
        <>
           {this.state.loading === false? <div className="Main">
                <h1 className=' CategoryName'>{this.state.data.name}</h1>
                <div className="Container">
                    {/*this.props.data.map(element =>
                      <ProductCard 
                    id={element.id}
                    name={element.name}
                    price={element.prices.amount}
                    label={element.prices.currency.symbol}
                    imageUrl={element.gallery[0]}
                    handleClick={this.handleClick}
                        />)*/}
                </div>
            </div>: null}
           </>
        )
    }
  }