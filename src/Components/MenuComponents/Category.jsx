import React from "react";
import AppContext from "../../Context/app.context";


export default class Category extends React.Component{
    static contextType = AppContext;

    render(){
        const { Category, setCategory} = this.context;
        return(
            <>
                {
                    this.props.id === Category?
                    <a onClick={()=>setCategory(this.props.id)} href={"/"+this.props.name} style={{color: "#5ECE7B"}}>
                        <div>{this.props.name}</div>
                    </a>
                    :
                    <a href={"/"+this.props.name} style={{borderBottomWidth: "0px"}} onClick={()=>setCategory(this.props.id)}>
                        <div>{this.props.name}</div>
                    </a>
                }
            </>
        )
    }
}
