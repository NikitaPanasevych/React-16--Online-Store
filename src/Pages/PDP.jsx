import React from "react";
import "./PDP.css";
import parse from 'html-react-parser';

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

    render(){
        return(
            <>
            {this.state.data?  
            <div className=" ItemDescriptionPage">
                    <div className=" Gallery">
                        {this.props.data[0].gallery.map(element=><img className=" GalleryElement" src={element} />)}
                    </div>
                    <div >
                        <img className=" ProductImage" src={this.props.data[0].gallery[0]}/>
                    </div>
                    <div className=" ProductDescr">
                        <h1 className="Brand">{this.state.data[0].brand}</h1>
                        <p className=" Name">{this.state.data[0].name}</p>
                        <button className="AddToCartBtn">ADD TO CART</button>
                        {parse(String(this.state.data[0].description))}
                    </div>
                </div>: null}
            </>
        )
    }
}