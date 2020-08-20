import React, { Component } from 'react'
import './top.css'
import NumberFormat from 'react-number-format'
class Top extends Component {
    render() {
        return (
<div className="row">
<span className="country">{this.props.country} </span>
<div className="cont">
<div className="total"><p>Total Cases: <NumberFormat value={this.props.total} displayType={'text'} thousandSeparator={true} /></p>  </div>
<div className="recovered"><p>Total Recovered: <NumberFormat value={this.props.recovered} displayType={'text'} thousandSeparator={true} /></p></div>
<div className="death"> <p>Total Deaths: <NumberFormat value={this.props.death} displayType={'text'} thousandSeparator={true} /></p> </div>
</div>
</div>
           
        )
    }
}
export default Top;