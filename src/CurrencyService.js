import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class CustomersService{
    constructor(){}

    getCurrencies() {
        const url = `${API_URL}/api/currency/`;
        return axios.get(url).then(response => response.data);
    }
    getCurrenciesByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getCurrency(pk) {
        const url = `${API_URL}/api/currency/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteCurrency(currency){
        const url = `${API_URL}/api/currency/${currency.pk}`;
        return axios.delete(url);
    }
    createCurrency(currency){
        const url = `${API_URL}/api/currency/`;
        return axios.post(url,currency);
    }
    updateCurrency(currency){
        const url = `${API_URL}/api/currency/${currency.pk}`;
        return axios.put(url,currency);
    }
}
