import React from "react";
import "./PDP.css";
import parse from 'html-react-parser';
import GalleryElement from "../Components/PDP/galleryElement";
import Attribute from "../Components/PDP/attributes";

export default class PDP extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: [],
            selectedPhoto: 0,
            selectedAttributeId: 0
        }
    }

    static getDerivedStateFromProps(props){
        return{data: props.data}
      }

      changeImage = (clickedImageId) => {
        this.setState({selectedPhoto: clickedImageId})
      }

      changeAttributeId = (clickedAttrId) => {
        this.setState({selectedAttributeId: clickedAttrId})
      }


    render(){
        return(
            <>
            {this.state.data ?  
            <div className=" ItemDescriptionPage">
                    <div className=" Gallery">
                        {
                            this.props.data[0].gallery.map((element, index) =>
                            <GalleryElement 
                            className=" GalleryElement" 
                            src={element}
                            id={index} 
                            changeImage={this.changeImage} 
                            />
                        )}
                    </div>
                    <div >
                        <img className=" ProductImage" src={this.props.data[0].gallery[this.state.selectedPhoto]}/>
                    </div>
                    <div className=" ProductDescr">
                        <h1 className="Brand">{this.state.data[0].brand}</h1>
                        <p className=" Name">{this.state.data[0].name}</p>
                        {this.state.data[0].attributes.map(element=>
                        <p>
                            {element.id + ":"}
                            <div className="attributes"> 
                                {element.items.map((prod, index)=>
                                   <Attribute  
                                   id={index} 
                                   value={prod.value} 
                                   changeAttribute={this.changeAttributeId}
                                   />)}
                            </div> 
                        </p>
                        )}
                        <p className="ProductPrice">
                            {this.state.data[0].prices[this.props.chosenCurrency].__typename + ":"}
                            <br />
                            {this.state.data[0].prices[this.props.chosenCurrency].currency.symbol + this.state.data[0].prices[this.props.chosenCurrency].amount}
                        </p>
                        <button className="AddToCartBtn">ADD TO CART</button>
                        {parse(String(this.state.data[0].description))}
                    </div>
                </div>: null}
            </>
        )
    }
}