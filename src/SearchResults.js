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
        const URL = 'http://localhost:8080/trains'
        fetch(URL, {mode:'cors'})
        .then(res => res.json())
        .then(json =>{
            this.setState({                
                id: json['id'],
                line: json['line'],
                departure: json['departure'],
                depHour: json['depHour'],
                depMinute: json['depMinute'],
                destination: json['destination'],
                arvHour: json['arvHour'],
                arvMinute: json['arvMinute'],
                trainType: json['trainType'],
                fee: json['fee'],
                change: json['change']
            })
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