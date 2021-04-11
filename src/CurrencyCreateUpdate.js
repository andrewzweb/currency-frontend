import React, { Component } from 'react';
import CurrencyService from './CurrencyService';

const currencyService = new CurrencyService();

class CurrencyCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          currencyService.getCurrency(params.pk).then((c)=>{
            this.refs.name.value = c.name;
            this.refs.symbol.value = c.symbol;
            this.refs.market_cap.value = c.market_cap;
            this.refs.price.value = c.price;
          })
        }
      }

      handleCreate(){
        currencyService.createCurrency(
          {
            "name": this.refs.name.value,
            "symbol": this.refs.symbol.value,
            "market_cap": this.refs.market_cap.value,
            "price": this.refs.price.value,
        }
        ).then((result)=>{
          alert("Currency created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        currencyService.updateCurrency(
          {
            "pk": pk,
            "name": this.refs.name.value,
            "symbol": this.refs.symbol.value,
            "market_cap": this.refs.market_cap.value,
            "price": this.refs.price.value,
        }
        ).then((result)=>{
          console.log(result);
          alert("Currency updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Name:</label>
              <input className="form-control" type="text" ref='name' />

            <label>
              Symbol:</label>
              <input className="form-control" type="text" ref='symbol' />

            <label>
              Market Cap:</label>
              <input className="form-control" type="number" ref='market_cap' />

            <label>
              Price:</label>
              <input className="form-control" step="0.01" type="number" ref='price'  />

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}

export default CurrencyCreateUpdate;
