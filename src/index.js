import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import api from "./components/api.json";

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
        const filterText = this.props.filterText
        const inStockOnly = this.props.inStockOnly

        const rows = []
        let lastCategory = null

        this.props.products.forEach(product => {

            if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return
            }

            if (inStockOnly && !product.stocked) {
                return
            }

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
    constructor(props) {
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked)
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="search"
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange} />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockChange} />
                    {" "}
                         Only show products in stock
                    </p>
            </form>
        )
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: "",
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        })
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
                <div className="table">
                    <h2>Data fetch with <span style={{ color: '#61DAFB' }}>React</span></h2>
                    <SearchBar
                        filterText={this.state.filterText}
                        inStockOnly={this.state.inStockOnly}
                        onFilterTextChange={this.handleFilterTextChange}
                        onInStockChange={this.handleInStockChange}
                    />
                    <ProductTable
                        products={this.props.products}
                        filterText={this.state.filterText}
                        inStockOnly={this.state.inStockOnly}
                    />
                </div>
                <div>
                </div>
            </div>

        )
    }
}


const PRODUCTS = api;

ReactDOM.render(
    <Table products={PRODUCTS} />,
    document.getElementById('root')
);