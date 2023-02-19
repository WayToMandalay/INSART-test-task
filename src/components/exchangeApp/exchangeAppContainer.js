import ExchangeApp from './exchangeApp'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { addCurrencyDataAsync } from '../../redux/currency/currency.actions'
import Spinner from '../spinner/spinner'
import ErrorPage from '../../pages/errorPage'

const ExchangeAppContainer = ({ isLoading, isFailed, addCurrencyData }) => {
    useEffect(() => {
        addCurrencyData()
    }, [])

    if (isFailed) {
        return <ErrorPage />
    }

    return isLoading ? <Spinner /> : <ExchangeApp />
}

const mapStateToProps = (state) => ({
    isLoading: state.currency.isFetching,
    isFailed: state.currency.isFailed,
})

const mapDispatchToProps = (dispatch) => ({
    addCurrencyData: () => dispatch(addCurrencyDataAsync()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeAppContainer)
