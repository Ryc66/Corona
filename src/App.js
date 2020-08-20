import React,{useEffect,useState} from 'react';

import './App.css';
import axios from 'axios';
import Top from './components/Top';
import {Line} from 'react-chartjs-2';

function App() {
 const [getCountry,setCountry]=useState([]);
 const [getGlobal,setGlobal]=useState({});
 const [getValue,setValue]=useState('world wide');
 const [gDate,sDate]=useState('7');
 const [xAxis,sxAxis]=useState([]);
 const [yAxis,syAxis]=useState([]);
 const ryc=(event)=>{
 setValue(event.target.value);
 aargee(event.target.value,gDate);
 }
 const btw=(event)=>{
   sDate(event.target.value);
   aargee(getValue,event.target.value);
 }
const aargee=(countryyes,waqt)=>{
 if(countryyes !== 'world wide'){
  const waqt2=`${new Date().getFullYear()}-${new Date().getMonth()+1<10? '0'+ (new Date().getMonth()+1):new Date().getMonth()+1}-${new Date().getDate()<10?'0'+(new Date().getDate()-1):(new Date().getDate()-1)}`;
var currentdate=new Date();
var fromdate=currentdate.setDate(currentdate.getDate()-waqt-1);
var dt=new Date(fromdate);

const waqt1=`${dt.getFullYear()}-${dt.getMonth()+1<10?'0'+(dt.getMonth()+1):dt.getMonth()+1}-${dt.getDate()<10?'0'+ dt.getDate():dt.getDate()}`;
//const waqt1=`${dt.getFullYear()}-0${dt.getMonth()+1}`.slice(-2)`-0${dt.getDate()}`.slice(-2);


  axios.get(`https://api.covid19api.com/total/country/${countryyes}/status/confirmed?from=${waqt1}T00:00:00Z&to=${waqt2}T00:00:00Z`).then(
    res=>{
   const arr=res.data.map(x=>x.Cases);
   const arr2=res.data.map(y=>y.Date.split('T')[0])
   
   sxAxis(arr2);
   syAxis(arr);

    })}
 
  
 }
  
 

 useEffect(() => {
   document.title=getValue;
  axios.get('https://api.covid19api.com/summary').then(res=>{
    
   const my=res.data.Countries;
   const g=res.data.Global;
   
   
   setCountry(my);
   setGlobal(g);
  })
  return () => {
    
  }
}, [getValue])



const countries=getCountry.map(country=>
  <option key={country.CountryCode} value={country.Country} > {country.Slug}</option>
  )
  const yes=getValue==='world wide'?(<Top country={'Worldwide'} total={ getGlobal.TotalConfirmed} 
  recovered={ getGlobal.TotalRecovered}
   death={ getGlobal.TotalDeaths} />): (
   <Top country={getValue} total={ getCountry.find(c=> c.Country===getValue).TotalConfirmed} 
recovered={ getCountry.find(c=> c.Country===getValue).TotalRecovered}
 death={ getCountry.find(c=> c.Country===getValue).TotalDeaths} />)


 const data = {
  labels: [...xAxis],
  datasets: [
    {
      label: 'Corona Cases',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(102,225,65,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [...yAxis]
    }
  ]
}



  return (
   <div className="App container">
<header className="head"><h3>Corona Virus Report</h3></header>



{yes}
<div className="row">
  

<div className="col-md-6 col-sm-6 col-sm-6 mt-3">
  <select style={{width:'70%'}} className="custom-select" onChange={ryc}>
 <option value="world wide" >worldwide</option>
 
{countries?countries:<option value="" >worldwide</option>}

  </select>
  </div>
  <div className="col-md-6 col-sm-6 col-sm-6 mt-3">
  <select style={{width:'70%'}} className="custom-select" onChange={btw}>
<option value='7' >Last 7 Days</option>
<option value='30' >Last 30 Days</option>
<option value='90' >Last 90 Days</option>

  </select>
  </div></div>
  <div className="Right">
<Line data={data}/>
</div>
</div>

  );
}

export default App;
