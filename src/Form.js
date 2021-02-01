import React, { Component } from 'react';

class Form extends Component{
    render(){
        return(
            <div className="form">
                <form action ="http://localhost:8080/search"　method="post" onSubmit={this.props.handleSubmit}>
                    出発地  <input type="text" name="departure"  /><br />
                    到着地  <input type="text" name="destination" /><br />
                    利用日　
                        <select name="date" defaultValue="2020-12-25">
                            <option value="2020-12-25">2020年12月25日(金)</option>
                        </select>
                        <select name="hour" defaultValue="10">
                            <option value="10">10</option>
                        </select>時
                        <select name="minute" defaultValue="10">
                            <option value="10">10</option>
                        </select>分<br />
                    <input type="radio" name="depOrArv" value = "depart" defaultChecked/>出発時刻指定
                    <input type="radio" name="depOrArv" value = "arrive" />到着時刻指定<br />
                    優先事項　
                        <select name = "priority" defaultValue="faster">
                            <option value="faster">速さ優先</option>
                            <option value="cheaper">安さ優先</option>
                            <option value="change">乗換の少なさ優先</option>
                        </select>
                    <input type="checkbox" name="addFeeTrain"　value="use" />有料列車を利用する<br />
                    <input type="submit" name="search" value="検索" />   
                </form>
            </div>
        )
    }
}

export default Form