import { useEffect } from 'react'

export function roundValue(str) {
    return +Math.round(Number(str) * 100) / 100
}

export function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [ref])
}

export function validateInput(str) {
    // if (str === '' || str.trim() === '') return true
    if (!isNaN(str) && !isNaN(parseFloat(str)) && +str > 0) return true

    // if (typeof str === 'number' && str > 0) return true
    return false
}
