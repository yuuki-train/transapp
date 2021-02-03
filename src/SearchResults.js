import { Component } from 'react';
import fetch from 'node-fetch';

class SearchResults extends Component {

  constructor(){
    super()
    this.state ={
      error: ''
    }
    this.list = []
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    this.onclick = function update(){
      this.list.length = 0
      let formData = new FormData(document.getElementById('form'));
      const URL = 'http://localhost:8080/search'
      fetch(URL, {
        method: 'POST',
        mode: 'cors',
        body: formData
      })
      .then(res =>res.json())
      .then(json =>{
        for(let i in json){
          if(json[i]["id"]!== null){
            this.list.push(<li key ={json[i]["id"]}>{json[i]["id"]}</li>)
          }else{
            break
          }
        }
        this.setState({
          error: ''
        })
      })
      .catch(error =>{
        console.error('Error:', error)
        this.setState({
          error: 'エラーが発生しました'
        })
      })
    }
    document.getElementById("search").addEventListener('click', this.onclick.bind(this) ,false)
  }
  
  render(){
    return(
      <div className="render">
        <div className="form">
          <form id ="form">
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
            検索件数
            <select id="theNumberOfSearch" name="theNumberOfSearch" defaultValue="3">
              <option value="3">3件</option>
            </select><br />
            <input id="search" type="button" name="search" value="検索" />   
          </form>
        </div>
        <div className="results"> 
          <ul>
          {this.list}
          </ul><br />
          {this.state.error}
        </div>
    </div>
    )
  }
}

export default SearchResults;
