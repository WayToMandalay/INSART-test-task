import {useEffect, useRef, useState} from 'react'
import clsx from 'clsx'
import './dropDown.scss'
import {useOutsideAlerter} from '../../helpers'

const Dropdown = ({options, value, onChange = () => {}}) => {

    const [answer, setAnswer] = useState(value)
    const [showDropdown, setShowDropdown] = useState(false)
    const selectWrapper = useRef(null)

    useEffect(() => {
        selectValue(value)
    }, [value])


    function selectValue(e) {
        onChange(e)
        setAnswer(e)
        setShowDropdown(false)
    }

    useOutsideAlerter(selectWrapper, () => {
        setShowDropdown(false)
    })

    const optionsList = options.map(({value: v, title}, i) => v !== answer ?
        <div key={i} className={'selectDropdownItem'} onClick={() => selectValue(v)}>{title}</div> : null
    )

    return (
        <div>
            <div ref={selectWrapper} className={clsx('select')} onClick={() => setShowDropdown(!showDropdown)}>
                {/*<div className={clsx(styles.selectLabel, {[styles.selectLabelFilled]: !!answer})}>{placeholder}</div>*/}
                <div className={'selectValue'}>{answer}</div>
                <div className={clsx('selectDropdown', showDropdown && 'selectDropdownActive')}>
                    {optionsList}
                </div>
            </div>
            {/*{invalid && <span className={styles.error}>{error}</span>}*/}
        </div>
    )
}

export default Dropdown
