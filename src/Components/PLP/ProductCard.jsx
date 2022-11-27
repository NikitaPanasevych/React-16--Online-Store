import React from "react";
import "./ProductCard.css";
import CircleIcon from "../Icons/CircleIcon";
import { Link } from 'react-router-dom';

export default class ProductCard extends React.Component{

    handleClick = () => {
        this.props.handleClick(this.props.id)
    }

    addToCartFromPLP = () => {
        this.props.addToCartFromPLP(this.props.id)
    }

    render(){
        return(
            <div className="Card">
                <Link to={"/" + this.props.id}>
                <div 
                onClick={this.handleClick}
                >
                    <img className="photo" alt="Product display"
                    src={this.props.imageUrl}></img>
                    <span className=" Description">{this.props.name}</span>
                    <h2 className=" Price">{this.props.price} {this.props.label}</h2>
                    
                </div>
            </Link>
            {
                    <div onClick={this.addToCartFromPLP}><CircleIcon /></div>
            }
            </div>
        )
    }
}