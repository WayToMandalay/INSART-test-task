import './convertButton.scss'

const ConvertButton = ({ disabled = false, func = () => {}, children }) => {
    return (
        <button
            className={'convertButton'}
            disabled={disabled}
            onClick={() => func()}
        >
            {children}
        </button>
    )
}

export default ConvertButton
