import {connect} from 'react-redux'
import '../exchangeApp.scss'
import ExchangeAppRow from './exchangeAppRow'

const ExchangeAppTable = ({data}) => {

    return (
        <table className={'exchangeApp__table'}>
            <thead>
                <tr>
                    <td>Currency \ Date </td>
                    <td>Buy</td>
                    <td>Sell</td>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(el => <ExchangeAppRow key={el.id} item={el}/>)
                }
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    data: state.currency.data
})

export default connect(mapStateToProps)(ExchangeAppTable)
