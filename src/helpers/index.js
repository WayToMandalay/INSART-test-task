import {useEffect} from 'react'

export function roundValue(str) {
    return Math.round(Number(str) * 100) / 100
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
