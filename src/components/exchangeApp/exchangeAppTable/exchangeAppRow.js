import EditableInput from '../../editableInput/editableInput'
import { roundValue } from '../../../helpers'
import { editData } from '../../../redux/currency/currency.actions'
import { connect } from 'react-redux'
import '../exchangeApp.scss'

const ExchangeAppRow = ({ item, changeData }) => {
    function handleEdit(data, type) {
        if (type === 'buy') {
            changeData({
                ...item,
                buy: data,
            })
        } else {
            changeData({
                ...item,
                sale: data,
            })
        }
    }

    return (
        <div className="exchangeApp__table-item">
            <h4 className="exchangeApp__table-title">{`${item.base_ccy} / ${item.ccy}`}</h4>
            <div className="exchangeApp__table-row">
                <EditableInput
                    func={handleEdit}
                    type={'buy'}
                    label={'Buy'}
                    basicValue={roundValue(item.buy)}
                />

                <EditableInput
                    func={handleEdit}
                    label={'Sale'}
                    type={'sale'}
                    basicValue={roundValue(item.sale)}
                />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    changeData: (item) => dispatch(editData(item)),
})

export default connect(null, mapDispatchToProps)(ExchangeAppRow)
