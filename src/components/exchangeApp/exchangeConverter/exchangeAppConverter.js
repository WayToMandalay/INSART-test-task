import './exchangeAppConverter.scss'
import {useEffect, useRef, useState} from 'react'
import Dropdown from '../../dropDown/dropDown'
import {connect} from 'react-redux'
import {roundValue} from '../../../helpers'

const ExchangeAppConverter = ({data}) => {

    const [buyInput, setBuyInput] = useState(0)
    // const [saleInput, setSaleInput] = useState(0)
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState('UAH')
    const [to, setTo] = useState('USD')
    const [options, setOptions] = useState([])
    const [error, setError] = useState(null)
    const amountInput = useRef(null)


    useEffect(() => {
        console.log(data)
        const dropOptions = data.map(el => ({value: el.ccy, title: el.ccy.toUpperCase()}))
        dropOptions.push({value: 'UAH', title: 'UAH'})
        setOptions(dropOptions)
    }, [])

    useEffect(() => {
        amountInput.current.value = amount
    }, [amount])

    // useEffect(() => {
    //     console.log(to)
    //     console.log(from)
    // }, [to, from])

    function flip() {
        const temp = {dropV: from, value: +amount || 0}

        setFrom(prev => to)
        setTo(prev => temp.dropV)
        setBuyInput(prev => temp.value)
        setAmount(null)
    }

    function convert() {
        console.log(from)
        if (from === to) {
            setAmount(prev => 'error')
            setError('Please choose different currency')
            return
        }
        setError(null)


        if (from === 'UAH') {
            const saleRate = +data.filter(el => el.ccy === to)[0].sale
            setAmount(prev => roundValue(buyInput / saleRate))
        } else if (to === 'UAH') {
            const buyRate = +data.filter(el => el.ccy === from)[0].buy
            setAmount(prev => roundValue(buyInput * buyRate))
        }
        else {
            const saleRate = +data.filter(el => el.ccy === to)[0].sale
            const buyRate = +data.filter(el => el.ccy === from)[0].buy
            const calcRate = buyRate / saleRate
            setAmount(prev => roundValue(buyInput * calcRate))
        }

    }

    return (
        <div className={'exchangeAppConverter__container'}>
            <div className="exchangeAppConverter__top">
                <div className="exchangeAppConverter__input">
                    <h3>Change</h3>
                    <input
                        value={buyInput}
                        min={0}
                        type={'number'}
                        placeholder="Enter the amount"
                        onChange={(e) => setBuyInput(+e.target.value)} />
                </div>
                <div className="exchangeAppConverter__middle">
                    <h3>From</h3>

                    <Dropdown options={options}
                              onChange={setFrom}
                              value={from} placeholder="From" />
                </div>
                <div className="switch">
                    <button onClick={flip}>switch</button>
                </div>
                <div className="exchangeAppConverter__input">
                    <h3>Amount</h3>
                    <input
                        ref={amountInput}
                        disabled/>
                </div>
                <div className="right">
                    <h3>To</h3>

                    <Dropdown options={options}
                              onChange={setTo}
                              value={to} placeholder="To" />
                </div>
            </div>
            <div className="exchangeAppConverter__bottom">
                <div className="exchangeAppConverter__result">
                    <button onClick={convert}>Convert</button>
                    {error ? <div>{error}</div> : <div>{amount}</div>}


                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    data: state.currency.data
})

export default connect(mapStateToProps)(ExchangeAppConverter)
