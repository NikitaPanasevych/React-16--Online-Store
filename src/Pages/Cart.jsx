import React from 'react';
import CartItem from '../Components/Cart/cartItem';
import AppContext from '../Context/app.context';
import './Cart.css';

export default class Cart extends React.Component {
	static contextType = AppContext;

	state = {
		cartItems: [],
		total: 0,
		quantity: 0,
		Currency: this.context.Currency,
	};

	static getDerivedStateFromProps(props, state) {
		if (props.cartItems === undefined) {
			return {
				cartItems: [],
				total: 0,
				quantity: 0,
			};
		}
		if (props.cartItems?.length === 0) {
			return {
				cartItems: props.cartItems,
				total: 0,
				quantity: 0,
			};
		}
		return {
			cartItems: props.cartItems,
			total: props.cartItems
				?.map((e) => e.prices[state.Currency].amount * e.count)
				.reduce((total, value) => (total = total + value), 0),
			quantity: props.cartItems?.map((e) => e.count).reduce((total, value) => (total = total + value), 0),
		};
	}

	incrementQuantity = (name, attributes) => {
		this.props.incrementQuantity(name, attributes);
	};

	decrementQuantity = (name, attributes) => {
		this.props.decrementQuantity(name, attributes);
	};

	render() {
		return (
			<>
				<div className="Cart pt-[15vh]">
					<h1>CART</h1>
					<div className="CartContainer">
						{this.state.cartItems
							? this.state.cartItems.map((element, index) => (
									<>
										<hr />
										<CartItem
											title={element.description}
											description={element.name}
											allAttributes={element.allAttributes}
											chosenAttributes={element.chosenAttributes}
											prices={element.prices}
											gallery={element.gallery}
											count={element.count}
											id={index}
											incrementQuantity={this.incrementQuantity}
											decrementQuantity={this.decrementQuantity}
										/>
									</>
							  ))
							: null}
						<hr />
					</div>
					<footer>
						<p>
							Tax 21%:{' '}
							<strong>
								{Math.round(this.state.total * 0.21 * 100) / 100} {this.state.symbol}
							</strong>
						</p>
						<p>
							Quantity: <strong>{this.state.quantity}</strong>
						</p>
						<p>
							Total:{' '}
							<strong>
								{Math.round(this.state.total * 100) / 100} {this.props.CurrencySymbols[this.state.Currency]}
							</strong>
						</p>
						<button className="">Order</button>
					</footer>
				</div>
			</>
		);
	}
}
