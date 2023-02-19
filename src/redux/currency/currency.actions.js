import {CurrencyTypes} from './currency.types'

export const fetchCurrencyStart = () => {
    return {
        type: CurrencyTypes.FETCH_CURRENCY_START
    }
}

export const fetchCurrencySuccess = (data) => {

    const dataWithId = data.map((el, i) => {
        return {
            ...el,
            id: i
        }
    })

    return {
        type: CurrencyTypes.FETCH_CURRENCY_SUCCESS,
        payload: dataWithId
    }
}

export const fetchCurrencyFailure = (message) => {
    return {
        type: CurrencyTypes.FETCH_CURRENCY_FAILURE,
        payload: message
    }
}

export const addCurrencyDataAsync = () => (dispatch) => {
    let API = process.env.REACT_APP_API_URL

    let count = localStorage.getItem('apiCount')

    if (!count) {
        localStorage.setItem('apiCount', '1')
    }
    count = +count + 1

    if (count === 5) {
        API = 'some dummy API'
        localStorage.setItem('apiCount', '0')
    }
    else {
        localStorage.setItem('apiCount', count.toString())
    }

    dispatch(fetchCurrencyStart())

    fetch(API)
        .then(res => res.json())
        .then(data => dispatch(fetchCurrencySuccess(data)))
        .catch(err => dispatch(fetchCurrencyFailure(err)))

}

export const editData = (data) => {
    return {
        type: CurrencyTypes.EDIT_DATA,
        payload: data
    }
}
