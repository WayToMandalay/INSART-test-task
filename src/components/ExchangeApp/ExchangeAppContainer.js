import ExchangeApp from './ExchangeApp'
import {useEffect} from 'react'
import axios from 'axios'

const ExchangeAppContainer = () => {

    useEffect(() => {
        const API = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/');
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('Access-Control-Allow-Methods', 'GET');

        console.log(headers)



        // Access-Control-Allow-Headers: Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization


        axios({
            method: 'get',
            url: API,
            headers: {'Access-Control-Allow-Origin': 'http://localhost:3000/'},
        }).then(res => console.log(res))

    }, [])

    return (
        <ExchangeApp></ExchangeApp>
    )
}

export default ExchangeAppContainer
