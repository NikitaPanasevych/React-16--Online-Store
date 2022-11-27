import React from "react"
import "./CurrencyDropdown.css"

export default class CurrencyDropdown extends React.Component{

    handleCurrencyChange = () => {
        this.props.handleCurrencyChange(this.props.id)
    }

    render(){
        return(
            <div onClick={this.handleCurrencyChange} className="CurrencyDropdownElement">
                <a>{this.props.symbol} {this.props.label}</a>
            </div>
        )
    }
}