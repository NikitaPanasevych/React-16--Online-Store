import './PLP.css';
import React from 'react';
import ProductCard from '../Components/PLP/ProductCard';
import AppContext from '../Context/app.context';

export default class PLP extends React.Component {
	static contextType = AppContext;

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			clickedItemId: '',
		};
	}

	static getDerivedStateFromProps(props) {
		return {
			data: props.data,
		};
	}

	addToCartFromPLP = (itemId) => {
		this.props.addToCartFromPLP(itemId);
	};

	handleClick = (clickedItem) => {
		this.props.handleClick(clickedItem);
	};

	render() {
		const { Currency } = this.context;

		return (
			<>
				{this.state.data ? (
					<div className="Main ">
						<h1 className=" CategoryName">
							store {'>'} {this.state.data.name}
							<hr />
						</h1>
						<div className="grid grid-cols-3 ">
							{this.state.data.products.map((element, index) => (
								<ProductCard
									id={element.id}
									key={index}
									name={element.name}
									price={element.prices[Currency].amount}
									label={element.prices[Currency].currency.symbol}
									imageUrl={element.gallery[0]}
									handleClick={this.handleClick}
									addToCartFromPLP={this.addToCartFromPLP}
								/>
							))}
						</div>
					</div>
				) : null}
			</>
		);
	}
}
