import  React, { Component } from  'react';
import  CurrencyService  from  './CurrencyService';

const  currencyService  =  new  CurrencyService();

class  CurrencyList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        currencies: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    currencyService.getCurrencies().then(function (result) {
        console.log(result);
        self.setState({ currencies:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,pk){
    var  self  =  this;
    currencyService.deleteCurrency({pk :  pk}).then(()=>{
        var  newArr  =  self.state.currencies.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({currencies:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    currencyService.getCurrenciesByURL(this.state.nextPageURL).then((result) => {
        self.setState({ currencies:  result.data, nextPageURL:  result.nextlink})
    });
}
render() {

    return (
        <div  className="currencys--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Market Cap</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {this.state.currencies.map( c  =>
                <tr  key={c.pk}>
                <td>{c.pk}  </td>
                <td>{c.name}</td>
                <td>{c.symbol}</td>
                <td>{c.market_cap}</td>
                <td>{c.price}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                <a  href={"/currency/" + c.pk}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
  }
}
export  default  CurrencyList;
