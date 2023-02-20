import './editableInput.scss'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

const EditableInput = ({ basicValue, type, func, label }) => {
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
        return value >= min && value <= max
    }

    function handleInput(e) {
        e.preventDefault()
        const value = e.target.value

        setInputTempValue((prev) => value)
    }

    function handleReset() {
        setInputTempValue((prev) => inputValue)
        inputRef.current.value = inputValue
        setIsActive(false)
    }

    function handleEditData() {
        func(inputTempValue, type)
        setInputTempValue((prev) => inputTempValue)

        setIsActive(false)
    }

    return (
        <div
            data-testid={'input-1'}
            className={clsx('editableInput__container', isActive && 'active')}
        >
            <label>
                {label}
                <input
                    data-testid={'input-2'}
                    ref={inputRef}
                    onFocus={() => setIsActive(true)}
                    onChange={handleInput}
                    defaultValue={inputTempValue}
                    className={clsx('editableInput', !isValid && 'isInvalid')}
                />
                <span />
            </label>

            {isActive && (
                <div className={'editableInput__btnBlock'}>
                    <button
                        className="editableInput__btn editableInput__btn-approve"
                        onClick={handleEditData}
                        disabled={!isValid}
                    />

                    <button
                        className="editableInput__btn editableInput__btn-cancel"
                        onClick={handleReset}
                    />
                </div>
            )}
        </div>
    )
}

export default EditableInput
