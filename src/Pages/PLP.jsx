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
    console.log(props.data[props.chosenCategory])
    return{data: props.data[props.chosenCategory]}
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
                    price={element.prices.amount}

                    imageUrl={element.gallery[0]}
                    handleClick={this.handleClick}
                        />)}
                </div>
            </div>:null}
           </>
        )
    }
  }