import React from "react"
import "./CurrencyDropdown.css"

export default class CurrencyDropdown extends React.Component{

    render(){
        return(
            <div className="CurrencyDropdownElement">
                <a>{this.props.symbol} {this.props.label}</a>
            </div>
        )
    }
}