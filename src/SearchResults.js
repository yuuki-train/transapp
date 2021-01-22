import { Component } from 'react';

class SearchResults extends Component{
    
    constructor(props){
    super(props)
    this.state = {
        id: '',
        line: '',
        departure: '',
        depHour: '',
        depMinute: '',
        destination: '',
        arvHour: '',
        arvMinute: '',
        trainType:'',
        fee:'',
        change:''
        }
    }

    componentWillMount(){ 
        const jsonData
        const counter = 0
        const URL = 'http://localhost:8080/search/getResults'
        fetch(URL, {mode:'cors'})
        .then(res =>res.json())
        .then(json => {
            jsonData = json
            while(jsonData[counter] != null){
                this.setState({
                    id: json[counter]["_id"],
                    line: json[counter]['line'],
                    departure: json[counter]['departure'],
                    depHour: json[counter]['depHour'],
                    depMinute: json[counter]['depMinute'],
                    destination: json[counter]['destination'],
                    arvHour: json[counter]['arvHour'],
                    arvMinute: json[counter]['arvMinute'],
                    trainType: json[counter]['trainType'],
                    fee: json[counter]['fee'],
                    change: json[counter]['change']
                })           
            }       
        })      
    }
    render(){
        return(
        <section className='SearchResults'>
            <h2>検索結果</h2>
            <details>
                <summary>
                    第1経路 {this.state.depHour} : {this.state.depMinute}発 
                    {this.state.arvHour} : {this.state.arvMinute}着<br />
                    {this.state.fee}円, 乗り換え{this.state.change}回<br />
                </summary>
                {this.state.depHour} : {this.state.depMinute} {this.state.departure}<br />
                {this.state.line} {this.state.trainType}{this.state.destination}行き<br />
                {this.state.arvHour} : {this.state.arvMinute} {this.state.destination}<br />
            </details>
        </section>
        )
    }
 } 
export default SearchResults