import React from "react";
import "./PDP.css";
import parse from 'html-react-parser';
import GalleryElement from "../Components/PDP/galleryElement";

export default class PDP extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: [],
            selectedPhoto: 0
        }
    }

    static getDerivedStateFromProps(props){
        return{data: props.data}
      }

      changeImage = (clickedImageId) => {
        this.setState({selectedPhoto: clickedImageId})
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
                        {this.state.data[0].attributes.map(element=><p>
                        {element.id + ":"}  
                        <bt />
                        {this.state.data[0].attributes[0].items.map(prod=>prod.id)} 
                        </p>)}
                        <p className="ProductPrice">
                        {this.state.data[0].prices[0].__typename + ":"}
                        <br />
                        {this.state.data[0].prices[0].currency.symbol + this.state.data[0].prices[0].amount}
                        </p>
                        <button className="AddToCartBtn">ADD TO CART</button>
                        {parse(String(this.state.data[0].description))}
                    </div>
                </div>: null}
            </>
        )
    }
}