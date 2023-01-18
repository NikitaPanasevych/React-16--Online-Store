import React from "react";
import App from "./App";
import { AppContextProvider } from "./Context/app.context";

export default class ContextConsumer extends React.Component{

    componentDidMount(){
        if(JSON.parse(localStorage.getItem("Category")) === null){
            localStorage.setItem("Category", JSON.stringify(0))
        }

        if(JSON.parse(localStorage.getItem("Currency")) === null){
            localStorage.setItem("Currency", JSON.stringify(0))
        }
    }

    render(){
        return(
            <AppContextProvider>
                <App />
            </AppContextProvider>
        )
    }
}