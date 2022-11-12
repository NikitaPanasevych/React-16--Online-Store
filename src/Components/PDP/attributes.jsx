import React from "react";
import "./attribute.css"


export default class Attribute extends React.Component{
    constructor(props){
        super(props) 
        this.state = {
            isClicked: true
        }
    }

    changeAttribute = () => {
        this.props.changeAttribute(this.props.value, this.props.attribute)
    }

    render(){
        const styles = {
            colorContainerStyle: {
                backgroundColor: this.props.color,
            }
          };
        const { colorContainerStyle } = styles;  
        return(
        <>
            {this.props.colorAttr ?
            <div  className="selected">
                <div style={colorContainerStyle} onClick={this.changeAttribute} className="color-attribute"></div> 
            </div>
            : 
            <div onClick={this.changeAttribute} className="attribute">
                <h1>{this.props.value}</h1>
            </div>
            }
        </>
        )
    }
}