import {CurrencyTypes} from './currency.types'
import {editCurrency} from './currency.utils'

const INITIAL_STATE = {
    data: null,
    isFetching: true,
    isFailed: false,
}

const currencyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CurrencyTypes.FETCH_CURRENCY_START:
            return {
                ...state,
                isFetching: true,
            }
        case CurrencyTypes.FETCH_CURRENCY_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isFetching: false
            }
        case CurrencyTypes.FETCH_CURRENCY_FAILURE:
            return {
                ...state,
                isFailed: true
            }
        case CurrencyTypes.EDIT_DATA:
            return {
                ...state,
                data: editCurrency(action.payload, state.data)
            }

        default:
            return state

    }
}

export default currencyReducer
