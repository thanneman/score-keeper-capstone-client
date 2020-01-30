import React, { Component } from 'react'


export default class SearchBar extends Component {
    render() {
        return (
            <section className="search">
                <input type="text" name='search' id='search' />
                <button>Search</button>
            </section>
        )
    }
}