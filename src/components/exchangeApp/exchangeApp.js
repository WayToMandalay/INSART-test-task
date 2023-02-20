import ExchangeAppTable from './exchangeAppTable/exchangeAppTable'
import ExchangeAppConverter from './exchangeConverter/exchangeAppConverter'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ExchangeApp = () => {
    const [date, setDate] = useState(null)

    useEffect(() => {
        const options = { day: 'numeric', year: 'numeric', month: 'long' }
        setDate(new Date().toLocaleDateString('en-US', options))
    }, [])

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }

    return (
        <section className={'exchangeApp-section'}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
                className="exchangeApp-topLine"
            >
                <h1>Currency Converter</h1>
                <div className="exchangeApp-date">{date}</div>
            </motion.div>
            <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
                className="exchangeApp"
            >
                <ExchangeAppTable />
                <ExchangeAppConverter />
            </motion.div>
        </section>
    )
}

export default ExchangeApp
