import { Component } from 'react';
import fetch from 'node-fetch';

class SearchResults extends Component {

  constructor(){
    super();
    this.state = {
      date: '',
      time: '',
      change:'',
      sentence1: '',
      sentence2: '',
      sentence3: '',
      errorMessage: ''
    };
    this.results = [];
    this.details = [];
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    //メソッド1：日付・時刻のデフォルト値となる、現在の日付・時刻を取得する
    this.onload = function load(){
      const now = new Date();
      const Year = String(now.getFullYear());
      const numArray = [];
      numArray.push(now.getMonth()+1);
      numArray.push(now.getDate());
      numArray.push(now.getHours());
      numArray.push(now.getMinutes());

      const strArray = [];
      //文字列に変換する。1桁の数値は10の位に0を足す。
      for(let i in numArray){
        const number = numArray[i];
        if(number < 10){
          const zeroPlus = '0' + String(number);
          strArray.push(zeroPlus);
        }else{
          const noChange = String(number);
          strArray.push(noChange);
        }
      }
      //正しい表示形式に変換してstateに入れる。
      const Month = strArray[0];
      const Dat = strArray[1];
      const Hour = strArray[2];
      const Min = strArray[3];

      const date = Year + '-' + Month + '-' + Dat;
      const time = Hour + ':' + Min;
      
      this.setState({
        date: date,
        time: time
      });
    }
    //リソース読み込み時にメソッド1を呼び出す。
    window.addEventListener('load', this.onload.bind(this))


    //メソッド2：検索APIを呼び出し、その結果を表示する。
    this.onclick = function update(){

      //検索結果表示部分のリストを初期化する。
      this.results.length = 0
      //検索値を取得して、空白及びnullであれば入力エラーメッセージを作成する。
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const departure = document.getElementById('departure').value;
      const destination = document.getElementById('destination').value;
      let message = ''
      if(departure === '' | null){
        message = '出発駅'
      }
      if(destination === '' | null){
        message = message + '、到着駅'
      }
      if(date === '' | null){
        message = message + '、日付'
      }
      if(time === '' | null){
        message = message + '、時刻'
      }

      //入力エラーメッセージが空白（正しく入力されている）の場合、検索処理を実行する。
      if(message === ''){
        //フォームの内容をAPIに転送し、レスポンスをfetchする。
        let formData = new FormData(document.getElementById('form'));
        const URL = 'http://localhost:8080/search'
        fetch(URL, {
          method: 'POST',
          mode: 'cors',
          body: formData
        })
        .then(res =>res.json())
        .then(json =>{

          //検索条件の概略文を構成する。
          const year = date.slice(0,4);
          const month = date.slice(5,7);
          const dat = date.slice(8);
          const dayCheck = new Date();
          dayCheck.setFullYear(parseInt(year,10));
          dayCheck.setMonth(parseInt(month,10));
          dayCheck.setDate(parseInt(dat,10));
          const day = "日月火水木金土".charAt(dayCheck.getDay());

          const sentence1 = '検索結果'
          const sentence2 = year +'年'+ month +'月'+ dat +'日（'+ day + '） ' + departure + ' → ' + destination;
          let sentence3 = ''
          //出発時刻が指定されていたら出発を表示し、されていなければ到着を表示する。
          if (document.searchForm.depOrArv[0].checked){
            sentence3 = time + ' 出発';
          }else{
            sentence3 = time + ' 到着';
          }
          this.setState({
            sentence1: sentence1,
            sentence2: sentence2,
            sentence3: sentence3
          });
        
          //検索件数分だけ繰り返す。
          for(let i in json){
            //大阪駅乗り換えの文章を表示する。（削除予定）
            if(json[i]['changeTrain'] !== 0){
              this.setState({
                change: '（大阪駅乗り換え）'
              });
            }else{
              this.setState({
                change: ''
              });
            }
            //経路番号表示(i+1)を数字型に変換する。
            const j = 1;
            const numI = parseInt(i,10);
            const numJ = parseInt(j,10);
            const plusOne = numI + numJ;
            
            //検索結果部分を表示する。  
            this.results.push(
              <li key={json[i]["id"]}>  
                <details>
                  <summary>
                    第{plusOne}経路 {json[i]["depHour"]} : {json[i]["depMinute"]} → {json[i]["arvHour"]} : {json[i]["arvMinute"]}<br />
                    {json[i]["totalMinutes"]}分、{json[i]["totalCharge"]}円（運賃{json[i]["fair"]}円、有料列車料金{json[i]["fee"]}円）、乗換{json[i]["changeTrain"]}回
                    <form>
                      <input id="search" type="button" name="search" value="この経路を利用する" />   
                    </form>
                  </summary>
                  <ul>
                    {this.details}
                  </ul>                         
                </details>
              </li>
            )

            //経路詳細部分を表示する。
            this.details.length = 0;
            this.details.push(
              <li key={json[i]["id"]}>
                {json[i]["depHour"]} : {json[i]["depMinute"]} {json[i]["departure"]}<br />
                {json[i]["line"]} {json[i]["trainType"]}{this.state.change}<br />
                {json[i]["arvHour"]} : {json[i]["arvMinute"]} {json[i]["destination"]}<br />   
              </li>
            )
          }     
          //検索件数が0件であれば、結果無しエラーメッセージを表示する。
          if(json.length !== 0){
            this.setState({
              errorMessage: ''
            })     
          }else{
            this.setState({
              errorMessage: '検索結果が0件です。再度検索してください。'
            })
          }
        })
        .catch(error =>{
          //エラー内容をコンソールに表示させ、処理エラーメッセージを表示する。
          console.error('Error:', error)
          this.setState({
            sentence1: '',
            sentence2: '',
            sentence3: '',
            errorMessage: '処理エラーが発生しました。再度検索してください。'
          })
        })
      //入力エラーメッセージがある場合
      }else{
        //入力エラーメッセージが、で始まる場合、それを除去する。
        if(message.slice(0,1)==='、'){
          message = message.slice(1)
        }
        //入力エラーメッセージを表示する。
        this.setState({
          sentence1: '',
          sentence2: '',
          sentence3: '',
          errorMessage: message + 'を正しく入力してください。'
        })
      }  
    }
    //検索ボタンクリック時にメソッド2を呼び出す。
    document.getElementById('search').addEventListener('click', this.onclick.bind(this))
  }
  
  render(){
    return(
      <div className="render">
        <h2>経路検索</h2>
        <div className="form">
          <form id="form" name="searchForm">
            出発駅  <input id="departure" type="text" name="departure" required/><br />
            到着駅  <input id="destination" type="text" name="destination" required/><br />
            利用日時
            <input　id="date" type="date" name="date" defaultValue={this.state.date} required/>
            <input  id="time" type="time" name="time" defaultValue={this.state.time} required/><br />
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
              <option value="1">1件</option>
              <option value="3">3件</option>
              <option value="5">5件</option>
            </select><br />
            <input id="search" type="button" name="search" value="検索" />   
          </form>
        </div>
        <div className="results">
          <h2>{this.state.sentence1}</h2>
          {this.state.sentence2}<br />
          {this.state.sentence3}<br />
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
