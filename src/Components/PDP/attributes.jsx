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
        this.props.changeAttribute(this.props.id)
    }

    render(){  
        let className = "attribute"
        return(
        <>
            <div onClick={this.changeAttribute} className={className}>
                <h1>{this.props.value}</h1>
            </div>
        </>
        )
    }
}