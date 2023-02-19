import {connect} from 'react-redux'
import '../exchangeApp.scss'
import ExchangeAppRow from './exchangeAppRow'
import {useEffect, useState} from 'react'

const ExchangeAppTable = ({data}) => {

     const [date, setDate] = useState(null)

    useEffect(() => {
        // setDate(new Date('YYYY-MM-DD'))
        const options = { day: 'numeric', year: 'numeric', month: 'long'}
        setDate(new Date().toLocaleDateString("en-US", options))
    }, [])

    return (
        <table className={'exchangeApp__table'}>
            <thead>
                <tr>
                    <td>Currency \ {date} </td>
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
