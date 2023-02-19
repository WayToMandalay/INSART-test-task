import ExchangeAppTable from './exchangeAppTable/exchangeAppTable'
import ExchangeAppConverter from './exchangeConverter/exchangeAppConverter'
import { useEffect, useState } from 'react'

const ExchangeApp = () => {
    const [date, setDate] = useState(null)

    useEffect(() => {
        const options = { day: 'numeric', year: 'numeric', month: 'long' }
        setDate(new Date().toLocaleDateString('en-US', options))
    }, [])

    return (
        <section className={'exchangeApp-section'}>
            <div className="exchangeApp-topLine">
                <h1>Currency Converter</h1>
                <div className="exchangeApp-date">{date}</div>
            </div>
            <div className="exchangeApp">
                <ExchangeAppTable />
                <ExchangeAppConverter />
            </div>
        </section>
    )
}

export default ExchangeApp
