
import ExchangeAppTable from './exchangeAppTable/exchangeAppTable'
import ExchangeAppConverter from './exchangeConverter/exchangeAppConverter'

const ExchangeApp = () => {

    return (
        <section className={'exchangeApp'}>
            <ExchangeAppTable/>
            <ExchangeAppConverter/>
        </section>

    )
}


export default ExchangeApp
