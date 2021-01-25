import { Component } from 'react';

class SearchResults extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            id1: '',
            line1: '',
            departure1: '',
            depHour1: '',
            depMinute1: '',
            destination1: '',
            arvHour1: '',
            arvMinute1: '',
            totalMinutes1: '',
            trainType1: '',
            fair1: '',
            fee1: '',
            totalCharge1: '',
            changeTrain1: '',
            id2: '',
            line2: '',
            departure2: '',
            depHour2: '',
            depMinute2: '',
            destination2: '',
            arvHour2: '',
            rvMinute2: '',
            totalMinutes2: '',
            trainType2: '',
            totalCharge2: '',
            fair2: '',
            fee2: '',
            changeTrain2: '',
            id3: '',
            line3: '',
            departure3: '',
            depHour3: '',
            depMinute3: '',
            destination3: '',
            arvHour3: '',
            arvMinute3: '',
            totalMinutes3: '',
            trainType3: '',
            totalCharge3: '',
            fair3: '',
            fee3: '',
            changeTrain3:''
        }
    }

    componentWillMount(){ 
        const URL = 'http://localhost:8080/search/getResults'
        fetch(URL, {mode:'cors'})
        .then(res =>res.json())
        .then(json => {
            this.setState({
                id1: json[0]['_id'],
                line1: json[0]['line'],
                departure1: json[0]['departure'],
                depHour1: json[0]['depHour'],
                depMinute1: json[0]['depMinute'],
                destination1: json[0]['destination'],
                arvHour1: json[0]['arvHour'],
                arvMinute1: json[0]['arvMinute'],
                totalMinutes1: json[0]['totalMinutes'],
                trainType1: json[0]['trainType'],
                totalCharge1: json[0]['totalCharge'],
                fair1: json[0]['fair'],
                fee1: json[0]['fee'],
                changeTrain1: json[0]['changeTrain'],
                id2: json[1]['id'],
                line2: json[1]['line'],
                departure2: json[1]['departure'],
                depHour2: json[1]['depHour'],
                depMinute2: json[1]['depMinute'],
                destination2: json[1]['destination'],
                arvHour2: json[1]['arvHour'],
                arvMinute2: json[1]['arvMinute'],
                totalMinutes2: json[1]['totalMinutes'],
                trainType2: json[1]['trainType'],
                totalCharge2: json[1]['totalCharge'],
                fair2: json[1]['fair'],
                fee2: json[1]['fee'],
                changeTrain2: json[1]['changeTrain'],
                id3: json[2]['_id'],
                line3: json[2]['line'],
                departure3: json[2]['departure'],
                depHour3: json[2]['depHour'],
                depMinute3: json[2]['depMinute'],
                destination3: json[2]['destination'],
                arvHour3: json[2]['arvHour'],
                arvMinute3: json[2]['arvMinute'],
                totalMinutes3: json[2]['totalMinutes'],
                trainType3: json[2]['trainType'],
                totalCharge3: json[2]['totalCharge'],
                fair3: json[2]['fair'],
                fee3: json[2]['fee'],
                changeTrain3: json[2]['changeTrain']
            })
        });  

    }
    render(){
        return(
        <section className='SearchResults'>
            <h2>検索結果</h2>
            <details>
                <summary>
                    第1経路 {this.state.depHour1} : {this.state.depMinute1}発 
                    {this.state.arvHour1} : {this.state.arvMinute1}着<br />
                    {this.state.totalCharge1}円（運賃{this.state.fair1}円、有料列車料金{this.state.fee1}円、{this.state.totalMinutes1}分、乗り換え{this.state.changeTrain1}回<br />
                </summary>
                {this.state.depHour1} : {this.state.depMinute1} {this.state.departure1}<br />
                {this.state.line1} {this.state.trainType1}{this.state.destination1}行き<br />
                {this.state.arvHour1} : {this.state.arvMinute1} {this.state.destination1}<br />
            </details>
            <details>
                <summary>
                    第2経路 {this.state.depHour2} : {this.state.depMinute2}発 
                    {this.state.arvHour2} : {this.state.arvMinute2}着<br />
                    {this.state.totalCharge2}円（運賃{this.state.fair2}円、有料列車料金{this.state.fee2}円、{this.state.totalMinutes2}分、乗り換え{this.state.changeTrain2}回<br />
                </summary>
                {this.state.depHour2} : {this.state.depMinute2} {this.state.departure2}<br />
                {this.state.line2} {this.state.trainType2}{this.state.destination2}行き<br />
                {this.state.arvHour2} : {this.state.arvMinute2} {this.state.destination2}<br />
            </details>
            <details>
                <summary>
                    第3経路 {this.state.depHour3} : {this.state.depMinute3}発 
                    {this.state.arvHour3} : {this.state.arvMinute3}着<br />
                    {this.state.totalCharge3}円（運賃{this.state.fair3}円、有料列車料金{this.state.fee3}円、{this.state.totalMinutes3}分、乗り換え{this.state.changeTrain3}回<br />
                </summary>
                {this.state.depHour3} : {this.state.depMinute3} {this.state.departure3}<br />
                {this.state.line3} {this.state.trainType3}{this.state.destination3}行き<br />
                {this.state.arvHour3} : {this.state.arvMinute3} {this.state.destination3}<br />
            </details>
        </section>
        )
    }
 } 
export default SearchResults