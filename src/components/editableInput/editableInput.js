import './editableInput.scss'
import {useEffect, useRef, useState} from 'react'
import clsx from 'clsx'
import {editData} from '../../redux/currency/currency.actions'
import {connect} from 'react-redux'

const EditableInput = ({basicValue, type, func}) => {

    const [inputValue, setInputValue] = useState(+basicValue)
    const [inputTempValue, setInputTempValue] = useState(+basicValue)
    const [isValid, setIsValid] = useState(true)
    const [isActive, setIsActive] = useState(false)
    const inputRef = useRef(null)


    useEffect(() => {
        setIsValid(checkValidity(inputTempValue))
    }, [inputTempValue])

    function checkValidity(value) {
        if (value <= 0) return false

        if (/^-?\\d/.test(value)) return false

        const min = inputValue - inputValue / 10
        const max = inputValue + inputValue / 10
        return value >= min && value <= max;
    }

    function handleInput(e) {
        e.preventDefault()
        const value = e.target.value

        setInputTempValue(prev => value)
    }

    function handleReset() {
        setInputTempValue(prev => inputValue)
        inputRef.current.value = inputValue
        setIsActive(false)
    }

    function handleEditData() {
        func(inputTempValue, type)
        setInputTempValue(prev => inputTempValue)

        setIsActive(false)
    }

    return (
        <div className={clsx('editableInput__container', isActive && 'active')}>
            <input
                ref={inputRef}
                onFocus={() => setIsActive(true)}
                onChange={handleInput}
                defaultValue={inputTempValue}
                className={clsx('editableInput', isValid && 'isValid')}/>
            <span/>
            {isActive &&
                <div className={'editableInput__btnBlock'}>
                    <button onClick={handleEditData} disabled={!isValid}>++</button>
                    <button onClick={handleReset}>xx</button>
                </div>
            }
        </div>
    )
}


export default EditableInput
