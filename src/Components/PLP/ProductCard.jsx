import React from 'react';
import './ProductCard.css';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class ProductCard extends React.Component {
	handleClick = () => {
		this.props.handleClick(this.props.id);
	};

	addToCartFromPLP = () => {
		this.props.addToCartFromPLP(this.props.id);
	};

	render() {
		return (
			<div className="Card ">
				<Link to={'/' + this.props.id}>
					<div className=" grid " onClick={this.handleClick}>
						<img className="photo" alt="Product display" src={this.props.imageUrl} />
						<div className=" flex justify-between">
							<div>
								<span className=" Description ">{this.props.name}</span>
								<h2 className=" Price">
									{this.props.price} {this.props.label}
								</h2>
							</div>
							<button
								className="p-5 h-16 w-16 flex justify-center rounded-full transition-all duration-200 bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-110 hover:bg-[#21e065]"
								onClick={this.addToCartFromPLP}
							>
								<FaShoppingCart className=" translate-y-[-0.4rem]" />
							</button>
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
