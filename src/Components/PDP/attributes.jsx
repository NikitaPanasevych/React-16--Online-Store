import React from "react";
import "./attribute.css"


export default class Attribute extends React.Component{

    changeAttribute = () => {
        this.props.changeAttribute(this.props.value, this.props.attribute)
    }

    render(){
        return(
        <>
            <>
            {
            this.props.colorAttr ?
                this.props.selectedAttributes?.find(elem=>elem.selectedAttributeVal === this.props.color)?
                    <div style={{ scale: "0.75"}} className="selected">
                        <div style={{backgroundColor: this.props.color}} onClick={this.changeAttribute} className="color-attribute"></div> 
                    </div>
                :
                <div style={{borderColor: "white", scale: "0.75"}}  className="selected">
                        <div style={{backgroundColor: this.props.color}} onClick={this.changeAttribute} className="color-attribute"></div> 
                    </div>
            : 
            this.props.selectedAttributes?.find(elem=>
                elem.selectedAttributeVal === this.props.value && elem.selectedAttribute === this.props.attribute)?
                <div style={{color:"white", backgroundColor:"black"}} onClick={this.changeAttribute} className="attribute">
                    <h1>{this.props.value}</h1>
                </div>
            :
                <div onClick={this.changeAttribute} className="attribute">
                    <h1>{this.props.value}</h1>
                </div>
            }
            </>
        </>
        )
    }
}