import React from 'react';
import Menu from "./Components/Menu";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route,  } from 'react-router-dom';
import PLP from './Pages/PLP';
import PDP from './Pages/PDP';



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
        openedItemDescription: []
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

    handleClick = (element) => {
      this.setState({ 
        openedItemDescription: this.state.data[this.state.chosenCategory].products.filter((val)=>val.id == element)
      })
    }

    handleCategoryChange = (element) => {
      this.setState({chosenCategory: element}, ()=>console.log(this.state.data[this.state.chosenCategory]))
    }

    render(){
      return(
        <>
          <Router>
            <Switch>
              <Route exact path='/'>
                { 
                 <PLP 
                 data={this.state.data} 
                 chosenCategory={this.state.chosenCategory} 
                 handleClick={this.handleClick}/>
                }
              </Route>
              {<Route exact path={"/:id"}>
                <PDP data={this.state.openedItemDescription} />
              </Route>}
            </Switch>
          </Router>
          {<Menu data={this.state.data} handleCategoryChange={this.handleCategoryChange} />}
        </>
      )
    }
  }
