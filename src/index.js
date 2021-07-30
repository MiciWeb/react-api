import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import api from "./components/api.json";

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

class ProductRow extends React.Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        return (
            <div>
                Iphone and apple
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