import React from 'react';
import './miniCart.css';
import OutsideAlerter from '../MenuComponents/OutsideAlert';
import CartItem from '../Cart/cartItem';
import AppContext from '../../Context/app.context';

export default class MiniCart extends React.Component {
	static contextType = AppContext;

	state = {
		cartItems: [],
		total: 0,
		symbol: '',
		quantity: 0,
	};

	static getDerivedStateFromProps(props, state) {
		return {
			cartItems: props.cartItems,
			total: props.cartItems
				?.map((e) => e.prices[props.chosenCurrency].amount * e.count)
				.reduce((total, value) => (total = total + value), 0),
			quantity: props.cartItems?.map((e) => e.count).reduce((total, value) => (total = total + value), 0),
		};
	}

	handleClickOutside = () => {
		this.props.handleClickOutside();
	};

	incrementQuantity = (name, attributes) => {
		this.props.incrementQuantity(name, attributes);
	};

	decrementQuantity = (name, attributes) => {
		this.props.decrementQuantity(name, attributes);
	};

	render() {
		const { Currency } = this.context;

		return (
			<div className=" w-[100vw] h=[100vh] absolute">
				<div className="background"></div>
				<OutsideAlerter handleClickOutside={this.handleClickOutside}>
					<div className="MiniCart">
						<p>
							<strong>My Bag:</strong> {this.state.cartItems?.length}{' '}
							{this.props.cartLength === 1 ? <span>Item</span> : <span>Items</span>}
						</p>
						<div className="MiniCartContainer">
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
						</div>
						<div className="footer">
							<div className="totalContainer">
								<p>
									<strong>Total:</strong>
									<strong className="Total">
										{this.state.total} {this.props.CurrencySymbols[Currency]}
									</strong>
								</p>
							</div>
							<div className="CheckoutBtns">
								<button>
									<a href="/cart">View bag</a>
								</button>
								<button>Checkout</button>
							</div>
						</div>
					</div>
				</OutsideAlerter>
			</div>
		);
	}
}
