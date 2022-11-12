import React from 'react';
import Menu from "./Components/Menu";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route,  } from 'react-router-dom';
import PLP from './Pages/PLP';
import PDP from './Pages/PDP';
import Cart from './Pages/Cart';
import e from 'express';



const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default class App extends React.Component {
    constructor(props){
      super(props)
      this.state= {
        data: [],
        chosenCategory: 0,
        openedItemDescription: [],
        chosenCurrency: 3,
        cartItems: []
      }
    }

     query = async () => {
     let data = await apolloClient
      .query({
        query: gql`
        query {
          categories{
            name
            products{
              gallery
              name
              id
              brand
              inStock
              description
              attributes{
                id
                name
                type
                items{
                  displayValue
                  value
                  id
                }
              }
              category
              prices{
                currency{
                    label
                    symbol
                  }
                    amount
                  }
            }
          }
        }
        `,
      })
      .then(result => result)
      this.setState({data: data.data.categories})
    }

    componentDidMount(){
      this.query()
    }

    addToCart = (cartItem, attributes) => {
      this.setState({cartItems: [
        ...this.state.cartItems.filter(element => 
          element !== cartItem /*&& element.attributes[0].selectedAttributeVal !== attributes[0].selectedAttributeVal*/),
        {
          name: cartItem,
          attributes: attributes
        }
        ]})
    }

    handleClick = (element) => {
      this.setState({ 
        openedItemDescription: this.state.data[this.state.chosenCategory].products.filter((val)=>val.id == element)
      })
    }

    handleCurrencyChange = (element) => {
      this.setState({chosenCurrency: element})
    }

    handleCategoryChange = (element) => {
      this.setState({chosenCategory: element})
    }

    render(){
      console.log(this.state.data)
      return(
        <>
          <Router>
            <Switch>
              <Route exact path='/'>
                <PLP 
                  data={this.state.data} 
                  chosenCategory={this.state.chosenCategory} 
                  handleClick={this.handleClick}
                  chosenCurrency={this.state.chosenCurrency}
                 />
              </Route>
              <Route exact path={"/cart"}>
                <Cart
                  data={this.state.cartItems}
                />
              </Route>
              <Route exact path={"/:id"}>
                <PDP 
                  data={this.state.openedItemDescription} 
                  chosenCurrency={this.state.chosenCurrency}
                  addToCart={this.addToCart}  
                />
              </Route>
            </Switch>
          </Router>
          <Menu 
            data={this.state.data} 
            handleCurrencyChange={this.handleCurrencyChange} 
            handleCategoryChange={this.handleCategoryChange} 
          />
        </>
      )
    }
  }
