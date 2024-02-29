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
			<div className="ProductCard p-10 hover:shadow-lg text-3xl">
				<Link to={'/' + this.props.id}>
					<div className=" grid " onClick={this.handleClick}>
						<div className=" min-h-[50rem]">
							<img
								className=" w-full h-auto max-h-[50rem] object-fill"
								src={this.props.imageUrl}
								alt={this.props.name}
							/>
						</div>
						<div className=" flex justify-between">
							<div>
								<span className="ProductCard__name">{this.props.name}</span>
								<h2>
									{this.props.price} {this.props.label}
								</h2>
							</div>
							<button
								className="ProductCard__btn hidden w-20 h-20 rounded-md transition-all duration-200 bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-110 hover:bg-[#21e065]"
								onClick={this.addToCartFromPLP}
							>
								<FaShoppingCart className=" w-6 h-6 translate-x-7" />
							</button>
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
