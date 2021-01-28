import React, { Component } from 'react';
import SearchResults from './SearchResults';
import Form from './Form';

class Search extends Component{
    render(){
        return(
        <div className="search">
            <header>
            交通アプリ
            </header>
            <nav>
                <ol>
                    <li>経路検索</li>
                    <li>決済手段登録</li>
                    <li>利用額の確認</li>
                </ol>
            </nav>
            <section>
                <Form />
            </section>
            <section>
                <SearchResults />
            </section>
        </div>
        )
    }

}

export default Search