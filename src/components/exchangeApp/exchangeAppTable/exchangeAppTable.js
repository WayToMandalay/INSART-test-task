import { connect } from 'react-redux'
import '../exchangeApp.scss'
import ExchangeAppRow from './exchangeAppRow'

const ExchangeAppTable = ({ data }) => {
    return (
        <div className={'exchangeApp__table'}>
            {data.map((el) => (
                <ExchangeAppRow key={el.id} item={el} />
            ))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.currency.data,
})

export default connect(mapStateToProps)(ExchangeAppTable)
