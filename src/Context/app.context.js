import React from "react";

let AppContext
const { Provider } = AppContext = React.createContext();

export class AppContextProvider extends React.Component {

    state={
        Category: JSON.parse(localStorage.getItem("Category")),
        Currency: JSON.parse(localStorage.getItem("Currency")),
    };

    setCategory = (newCategory) => {
        localStorage.setItem("Category", newCategory)
        this.setState({Category: newCategory});
    }

    setCurrency = (newCurrency) => {
        localStorage.setItem("Currency", newCurrency)
        this.setState({Currency: newCurrency});
    }

    render(){
        return(
            <Provider value={{
                Category: this.state.Category,
                Currency: this.state.Currency,
                OpenedItem: this.state.OpenedItem,
                setCategory: this.setCategory,
                setCurrency: this.setCurrency,
                setOpenedItem: this.setOpenedItem,
                }}
            >
                {this.props.children}
            </Provider>
        )
    }

} 

export default AppContext;