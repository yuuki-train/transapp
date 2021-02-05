import { Component } from 'react';
import fetch from 'node-fetch';

class SearchResults extends Component {

  constructor(){
    super()
    this.state ={
      response: '',
      change:'',
      errorMessage: ''
    }
    this.results = []
    this.details = []
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    //検索ボタンを押したときに実行されるメソッド
    this.onclick = function update(){
      //検索結果表示部分のリストの初期化
      this.results.length = 0
      //フォームの内容をAPIに転送し、レスポンスをfetchする
      let formData = new FormData(document.getElementById('form'));
      const URL = 'http://localhost:8080/search'
      fetch(URL, {
        method: 'POST',
        mode: 'cors',
        body: formData
      })
      .then(res =>res.json())
      .then(json =>{
        //検索件数分だけ繰り返し
        for(let i in json){
          //大阪駅乗り換えの文章表示（削除予定）
          if(json[i]['changeTrain'] !== 0){
            this.setState({
              change: '（大阪駅乗り換え）'
            })
          }else{
            this.setState({
              change: ''
            })
          }

          //経路番号表示(i+1)の数字型変換
          let j = 1
          let numI = parseInt(i)
          let numJ = parseInt(j)
          let plusOne = numI + numJ
            
          //検索結果部分の表示  
          this.results.push(
            <li key={json[i]["id"]}>  
              <details>
                <summary>
                  第{plusOne}経路 {json[i]["depHour"]} : {json[i]["depMinute"]} → {json[i]["arvHour"]} : {json[i]["arvMinute"]}<br />
                  {json[i]["totalMinutes"]}分、{json[i]["totalCharge"]}円（運賃{json[i]["fair"]}円、有料列車料金{json[i]["fee"]}円）、乗換{json[i]["changeTrain"]}回
                </summary>
                <ul>
                  {this.details}
                </ul>                         
              </details>
            </li>
          )

          //経路詳細部分の表示
          this.details.length = 0
          this.details.push(
            <li key={json[i]["id"]}>
              {json[i]["depHour"]} : {json[i]["depMinute"]} {json[i]["departure"]}<br />
              {json[i]["line"]} {json[i]["trainType"]}{this.state.change}<br />
              {json[i]["arvHour"]} : {json[i]["arvMinute"]} {json[i]["destination"]}<br />   
            </li>
          )
        }
        //レスポンス処理の正常完了を表すようstateを更新する。
        this.setState({
          response: 'OK',
          errorMessage:''
        })     
      })
      .catch(error =>{
        //エラー内容をコンソールに表示させ、レスポンス処理のエラーを表すようstateを更新する。
        console.error('Error:', error)
        this.setState({
          response: 'error',
          errorMessage: 'エラーが発生しました'
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
            {this.results}
          </ul>  
          {this.state.errorMessage}
        </div>
    </div>
    )
  }
}

export default SearchResults;
