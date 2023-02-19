export const editCurrency = (data, arr) => {
    return arr.map(el => {
        if (el.id === data.id) return data
        return el
    })
}
