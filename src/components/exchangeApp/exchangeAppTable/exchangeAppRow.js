import {useRef, useState} from 'react'
import EditableInput from '../../editableInput/editableInput'
import {roundValue} from '../../../helpers'
import {editData} from '../../../redux/currency/currency.actions'
import {connect} from 'react-redux'


const ExchangeAppRow = ({item, changeData}) => {

    function handleEdit(data, type) {
        if (type === 'buy') {
            changeData({
                ...item,
                buy: data
            })
        }
        else {
            changeData({
                ...item,
                sale: data
            })
        }
    }

    return (
        <tr>
            <td>{`${item.base_ccy} / ${item.ccy}`}</td>
            <td><EditableInput func={handleEdit} type={'buy'} basicValue={roundValue(item.buy)}/></td>
            <td><EditableInput func={handleEdit} type={'sale'} basicValue={roundValue(item.sale)}/></td>
        </tr>
    )
}


const mapDispatchToProps = dispatch => ({
    changeData: item => dispatch(editData(item))
})

export default connect(null, mapDispatchToProps)(ExchangeAppRow)
