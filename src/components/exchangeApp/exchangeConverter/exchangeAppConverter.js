import './exchangeAppConverter.scss'
import { useEffect, useRef, useState } from 'react'
import Dropdown from '../../dropDown/dropDown'
import { connect } from 'react-redux'
import { roundValue, validateInput } from '../../../helpers'
import ConvertButton from '../../convertButton/convertButton'
import clsx from 'clsx'

const ExchangeAppConverter = ({ data }) => {
    const [buyInput, setBuyInput] = useState('')
    const [amount, setAmount] = useState('')
    const [from, setFrom] = useState('UAH')
    const [to, setTo] = useState('USD')
    const [options, setOptions] = useState([])
    const [error, setError] = useState(false)
    const amountInput = useRef(null)

    useEffect(() => {
        const dropOptions = data.map((el) => ({
            value: el.ccy,
            title: el.ccy.toUpperCase(),
        }))
        dropOptions.push({ value: 'UAH', title: 'UAH' })
        setOptions(dropOptions)
    }, [])

    useEffect(() => {
        amountInput.current.value = amount
    }, [amount])

    useEffect(() => {
        if (validateInput(buyInput) || buyInput === '') {
            setError((prev) => false)
        } else {
            setError((prev) => true)
        }
    }, [buyInput])

    function flip() {
        const temp = { dropValue: from, value: amount || '' }

        setFrom((prev) => to)
        setTo((prev) => temp.dropValue)
        setBuyInput((prev) => temp.value)
        amountInput.current.value = ''
    }

    //Todo improve convert func
    function convert() {
        if (from === to) {
            setAmount((prev) => 'N/A')
            setError(true)
            return
        }
        setError(false)

        if (from === 'UAH') {
            const saleRate = +data.filter((el) => el.ccy === to)[0].sale
            setAmount((prev) => roundValue(+buyInput / saleRate))
        } else if (to === 'UAH') {
            const buyRate = +data.filter((el) => el.ccy === from)[0].buy
            setAmount((prev) => roundValue(+buyInput * buyRate))
        } else {
            const saleRate = +data.filter((el) => el.ccy === to)[0].sale
            const buyRate = +data.filter((el) => el.ccy === from)[0].buy
            const calcRate = buyRate / saleRate
            setAmount((prev) => roundValue(+buyInput * calcRate))
        }
    }

    return (
        <div className={'exchangeAppConverter__container'}>
            <div className="exchangeAppConverter__input">
                <h3 className="exchangeAppConverter__title">Change</h3>
                <div className="exchangeAppConverter__input-block">
                    <input
                        value={buyInput}
                        placeholder={'Amount'}
                        onChange={(e) => setBuyInput(e.target.value)}
                        className={clsx('simpleInput', error && 'isInvalid')}
                    />
                    <Dropdown
                        options={options}
                        onChange={setFrom}
                        value={from}
                    />
                </div>
            </div>

            <div onClick={flip} className="exchangeAppConverter-switch" />

            <div className="exchangeAppConverter__input">
                <h3 className="exchangeAppConverter__title">Get</h3>
                <div className="exchangeAppConverter__input-block">
                    <input
                        className={'simpleInput'}
                        ref={amountInput}
                        disabled
                    />
                    <Dropdown
                        options={options}
                        onChange={setTo}
                        value={to}
                        placeholder="To"
                    />
                </div>
            </div>

            <div className="exchangeAppConverter__convert">
                <div className="exchangeAppConverter__convert-btn">
                    <ConvertButton disabled={error} func={convert}>
                        Convert
                    </ConvertButton>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.currency.data,
})

export default connect(mapStateToProps)(ExchangeAppConverter)
