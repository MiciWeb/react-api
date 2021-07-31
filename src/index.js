import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import api from "./components/api.json";

class ProductCategoryRow extends React.Component {
    render() {
        return (
                <tr>
                    <th colSpan="2">
                        {this.props.category}
                    </th>
                </tr>
        )
    }
}

class ProductRow extends React.Component {
    render() {
        const name = this.props.product.stocked? this.props.product.name: <span style={{color: 'red'}}>{this.props.product.name}</span>
        const price = this.props.product.price
        return (
                <tr>
                    <td>{name}</td>
                    <td>{price}</td>
                </tr>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        const rows = []
        this.props.products.forEach(product => {
            rows.push(
                <ProductCategoryRow 
                category={product.category}
                key={product.category} />
                )
            rows.push(
                <ProductRow 
                product={product}
                key={product.name} />
            )
        })
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

class SearchBar extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <input type="search" placeholder="search" />
                    <p>
                        <input type="checkbox" />
                        {" "} Only show products in stock
                    </p>
                </form>
            </div>
        )
    }
}

class Table extends React.Component {
    render() {
        return (
            <div>
                 <SearchBar />
                 <ProductTable products = {this.props.products} />
            </div>
        )
    }
}


const PRODUCTS = api;

ReactDOM.render(
    <Table products={PRODUCTS} />,
    document.getElementById('root')
);