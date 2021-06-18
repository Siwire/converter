import axios from 'axios';
import { NEW_CURRENCIES, CURRENCIES, ADD_CURRENCY, CHANGE_VALUE } from './converterTypes';

const urlLocal = 'http://localhost:8000';

export const getNewCurrencies = (selectedCurrencies) => {
    return async (dispatch) => {
        const newCurrencies = await axios.post(`${urlLocal}/get_new_currencies`, { selectedCurrencies })
        dispatch({ type: NEW_CURRENCIES, payload: newCurrencies.data })
    }
}
export const setSelectedCurrencies = () => {
    return async dispatch => {
        const currencies = await axios.post(`${urlLocal}/get_currencies`,)
        dispatch({ type: CURRENCIES, payload: currencies.data })
    }
}
export const getNewValueCurrency = (target, value, currencies) => {
    return async dispatch => {
        dispatch({ type: CHANGE_VALUE, payload: { target, value } })
        if (!(value.split('')[value.split('').length - 1] === ".") && !(value===0)) {
            const changedCurrencies = await axios.post(`${urlLocal}/cur_rate`, { target, currencies })
            dispatch({ type: CURRENCIES, payload: changedCurrencies.data })
        }
    }
}
export const addNewCurrency = (newCurrency, currencyBYN) => {
    return async dispatch => {
        const getNewCurrency = await axios.post(`${urlLocal}/add_currency`, {currencyBYN, newCurrency})
        dispatch({type: ADD_CURRENCY, payload: getNewCurrency.data})
        dispatch({type: NEW_CURRENCIES, payload: []})

    }
}

