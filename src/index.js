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
        const name = this.props.product.stocked ? this.props.product.name : <span style={{ color: 'red' }}>{this.props.product.name}</span>
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
        let lastCategory = null

        this.props.products.forEach(product => {
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category} />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} />
            )
            lastCategory = product.category
            console.log(product.category)
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

class Legend extends React.Component {
    render() {
        return (
            <small><br />
                <i>
                    <span style={{ color: 'Red' }}>Red</span> mean out of stock
                </i>
            </small>
        )
    }
}

class Table extends React.Component {
    render() {
        return (
            <div>
                <SearchBar />
                <ProductTable products={this.props.products} />
                <Legend />
            </div>
        )
    }
}


const PRODUCTS = api;

ReactDOM.render(
    <Table products={PRODUCTS} />,
    document.getElementById('root')
);