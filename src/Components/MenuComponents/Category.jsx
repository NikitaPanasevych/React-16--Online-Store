import { getArgumentValues } from "graphql";
import React from "react";

export default class Category extends React.Component{

    handleCategoryChange = () => {
        this.props.handleCategoryChange(this.props.id)
    }

    render(){     
        return(
            <>
                {
                    this.props.id === this.props.chosenCategory?
                    <div style={{color: "#5ECE7B"}} onClick={this.handleCategoryChange}>{this.props.name}</div>
                    :
                    <div style={{borderBottomWidth: "0px"}} onClick={this.handleCategoryChange}>{this.props.name}</div>
                }
            </>
        )
    }
}