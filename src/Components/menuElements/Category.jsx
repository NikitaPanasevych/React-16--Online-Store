import React from "react";

export default class Category extends React.Component{

    handleCategoryChange = () => {
        this.props.handleCategoryChange(this.props.id)
    }

    render(){
        return(
            <li onClick={this.handleCategoryChange}>{this.props.name}</li>
        )
    }
}