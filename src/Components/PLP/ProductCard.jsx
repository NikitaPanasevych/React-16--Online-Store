import React from "react";
import "./ProductCard.css";
import CircleIcon from "../Icons/CircleIcon";
import { Link } from 'react-router-dom';

export default class ProductCard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hover: false
        }
    }

    handleClick = () => {
        this.props.handleClick(this.props.id)
    }

    render(){
        return(
            <Link to={"/" + this.props.id}><div className="Card"
            onMouseOver={()=>this.setState({hover: true})}
            onMouseOut={()=>this.setState({hover:false})}
            onClick={this.handleClick}
            >
                <img className="photo" alt="Product display"
                src={this.props.imageUrl}></img>
                <span className=" Description">{this.props.name}</span>
                <h2 className=" Price">{this.props.price} {this.props.label}</h2>
                {
                    this.state.hover && (<CircleIcon />)
                }
            </div></Link>
        )
    }
}