import React from 'react';
import Menu from "./Components/Menu";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PLP from './Pages/PLP';
import PDP from './Pages/PDP';
import Cart from './Pages/Cart';
import AppContext from './Context/app.context';



const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

class App extends React.Component {
    static contextType = AppContext;

    constructor(props){
      super(props)
      this.state = {
        data: [],
        openedItemDescription: [],
        CurrencySymbols: [],
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
      this.setState({
        data: data.data.categories,
        CurrencySymbols: data.data.categories[0].products[0].prices.map(item=>item.currency.symbol)
      })
    }

    componentDidMount(){
      this.query();
      this.setState({...this.state.cartItems, cartItems: JSON.parse(localStorage.getItem('cartItem'))});
    }

    addToCart = async (cartItemId,  cartItemDescr, cartItemAttributes, cartItemGallery, cartItemPrices, chosenAttributes) => {
      if(
        !JSON.parse(localStorage.getItem('cartItem')).find((elem)=>elem.name === cartItemId)
          ||
        !JSON.parse(localStorage.getItem('cartItem')).find(
          elem =>JSON.stringify(elem.chosenAttributes) === JSON.stringify(chosenAttributes)
          )
        )
      {localStorage.setItem("cartItem", JSON.stringify(
        [ 
        ...this.state.cartItems, 
        {
          name: cartItemId,
          description: cartItemDescr,
          allAttributes: cartItemAttributes,
          chosenAttributes: chosenAttributes,
          gallery: cartItemGallery,
          prices: cartItemPrices,
          count: 1
        }
        ]
      ))}
        this.setState({cartItems: JSON.parse(localStorage.getItem('cartItem'))})
    }

    handleClick = (element) => {
      this.setState({ 
        openedItemDescription: this.state.data[this.context.Category].products.filter((val)=>val.id === element)
      })
    }

    addToCartFromPLP = (itemId) => {
      const item = this.state.data[0].products.filter(elem=>elem.attributes.length === 0 && elem.id === itemId)
      if(item.length !== 0 && !JSON.parse(localStorage.getItem('cartItem')).find((elem)=>elem.description === itemId))
      {
        localStorage.setItem("cartItem", JSON.stringify(
          [ 
          ...this.state.cartItems, 
          {
            name: item[0].brand,
            description: item[0].id,
            allAttributes: [],
            chosenAttributes: [],
            gallery: item[0].gallery,
            prices: item[0].prices,
            count: 1
          }
          ]
        ))
        this.setState({cartItems: JSON.parse(localStorage.getItem('cartItem'))})
      }
    }

    decrementQuantity = async (name, attributes) => {
      await this.setState({
        cartItems: this.state.cartItems.map(item=>{
          return(
            (item.name === name && item.chosenAttributes === attributes)?
            {
            allAttributes: item.allAttributes,
            chosenAttributes: item.chosenAttributes,
            description: item.description,
            gallery: item.gallery,
            name: item.name,
            prices: item.prices,
            count: item.count-1
            }
            :
            item
            )
          })
      })
      localStorage.setItem("cartItem", JSON.stringify(this.state.cartItems.filter(item=>item.count !== 0)))
      this.setState({cartItems: JSON.parse(localStorage.getItem("cartItem"))})
    }

    incrementQuantity = async (name, attributes) => {
      await this.setState({
        cartItems: this.state.cartItems.map(item=>{
          return(
            (item.name === name && item.chosenAttributes === attributes)?
            {
            allAttributes: item.allAttributes,
            chosenAttributes: item.chosenAttributes,
            description: item.description,
            gallery: item.gallery,
            name: item.name,
            prices: item.prices,
            count: item.count+1
            }
            :item
            )
          })
      })
      localStorage.setItem("cartItem", JSON.stringify(this.state.cartItems))
      console.log(JSON.parse(localStorage.getItem("cartItem")))
    }



    render(){
      const { Category } = this.context;

      return(
        <>
          <Router>
            <Switch>
            <Route exact path={["/", "/all"]}>
                <PLP 
                  data={this.state.data[Category]} 
                  handleClick={this.handleClick}
                  addToCartFromPLP={this.addToCartFromPLP}
                 />
              </Route>
              <Route exact path={"/clothes"}>
                <PLP 
                  data={this.state.data[Category]} 
                  handleClick={this.handleClick}
                  addToCartFromPLP={this.addToCartFromPLP}
                 />
              </Route>
              <Route exact path={"/tech"}>
                <PLP 
                  data={this.state.data[Category]} 
                  handleClick={this.handleClick}
                  addToCartFromPLP={this.addToCartFromPLP}
                 />
              </Route>
              <Route exact path={"/cart"}>
                <Cart
                  data={this.state.data[0]}
                  cartItems={this.state.cartItems}
                  CurrencySymbols={this.state.CurrencySymbols}
                  incrementQuantity={this.incrementQuantity}
                  decrementQuantity={this.decrementQuantity}
                />
              </Route>
              <Route exact path={"/:id"}>
                <PDP 
                  data={this.state.openedItemDescription} 
                  addToCart={this.addToCart}  
                />
              </Route>
            </Switch>
          </Router>
          <Menu 
            data={this.state.data}
            cartItems={this.state.cartItems}
            CurrencySymbols={this.state.CurrencySymbols}
            incrementQuantity={this.incrementQuantity}
            decrementQuantity={this.decrementQuantity} 
          />
        </>
      )
    }
  }


export default App;