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
            selectedAttributes: [],
            attributes: [],
            colorAttribute: []
        }
    }

    static getDerivedStateFromProps(props){
        return{data: props.data}
      }

      componentDidMount(){
        this.setState({
            attributes: this.props.data[0].attributes.filter(element=>element.id !== "Color"),
            colorAttribute: this.props.data[0].attributes.filter(element=>element.id === "Color")
        })
      }

      addToCart = () => {
        this.props.addToCart(this.props.data[0].id, this.state.selectedAttributes)
      }

      changeImage = (clickedImageId) => {
        this.setState({selectedPhoto: clickedImageId})
      }

      changeAttributeId = (clickedAttrVal, clickedAttr) => {
        this.setState({
            selectedAttributes: [
            ...this.state.selectedAttributes.filter(element => element.selectedAttribute !== clickedAttr),
            {                      
                selectedAttributeVal: clickedAttrVal,
                selectedAttribute: clickedAttr
            }
        ]
        })
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
                        {this.state.attributes.map(element=>
                        <p>
                            {element.id + ":"}
                            <div className="attributes"> 
                                {element.items.map((prod, index)=>
                                   <Attribute
                                   id={index}
                                   attribute={element.id} 
                                   value={prod.value}
                                   chosenAttr={this.state.selectedAttributeId}
                                   colorAttr={false}
                                   changeAttribute={this.changeAttributeId}
                                   />)}
                            </div> 
                        </p>)}
                        {
                            this.state.colorAttribute.map(element=>
                        <p>
                            {element.id + ":"}
                            <div className="attributes"> 
                                {element.items.map((prod, index)=>
                                    <Attribute  
                                        id={index}
                                        attribute={element.id} 
                                        colorAttr={true}
                                        value={prod.value}
                                        color={prod.value}
                                        changeAttribute={this.changeAttributeId}
                                    />
                                   )}
                            </div> 
                        </p>)
                        }
                        <p className="ProductPrice">
                            {this.state.data[0].prices[this.props.chosenCurrency].__typename + ":"}
                            <br />
                            {this.state.data[0].prices[this.props.chosenCurrency].currency.symbol + this.state.data[0].prices[this.props.chosenCurrency].amount}
                        </p>
                        <button onClick={this.addToCart} className="AddToCartBtn">ADD TO CART</button>
                        {parse(String(this.state.data[0].description))}
                    </div>
                </div>: null}
            </>
        )
    }
}