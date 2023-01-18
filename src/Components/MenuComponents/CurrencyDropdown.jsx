import React from "react"
import AppContext from "../../Context/app.context"
import "./CurrencyDropdown.css"

export default class CurrencyDropdown extends React.Component{
    static contextType = AppContext;


    render(){
        const {setCurrency} = this.context

        return(
            <div onClick={()=>setCurrency(this.props.id)} className="CurrencyDropdownElement">
                <span>{this.props.symbol} {this.props.label}</span>
            </div>
        )
    }
}