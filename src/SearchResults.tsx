import { Component } from 'react';
import { Trains } from './components/Types'
import "./App.css"

class SearchResults extends Component{

    props: Trains
    
    constructor(props){
        super(props)
        this.state = {
            id: '',
            departure: '',
            depHour: '',
            depMinute: '',
            destination: '',
            arvHour: '',
            arvMinute: '',
            trainType:'',
            fee:''
        }
    }

    componentWillMount(){
        const URL = 'http://localhost:8080/trains'
        fetch(URL, {mode:'cors'})
        .then(res => res.json())
        .then(json =>{
            this.setState({
                id: json['id'],
                departure: json['departure'],
                depHour: json['depHour'],
                depMinute: json['depMinute'],
                destination: json['destination'],
                arvHour: json['arvHour'],
                arvMinute: json['arvMinute'],
                trainType: json['trainType'],
                fee: json['fee']

            })
        })
    }
    render(){
        return(
        <section className='SearchResults'>
                <h2>検索結果</h2>
                第1経路 {this.state}

        </section>
        )
    }


 } 

export default SearchResults