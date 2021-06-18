import axios from 'axios';
import { NEW_CURRENCIES, CURRENCIES, CHANGE_VALUE_CURRENCY, CHANGE_VALUE } from './converterTypes';

const urlLocal = 'http://localhost:8000';

export const getNewCurrencies = (selectedCurrencies) => {
    return async (dispatch) => {
        const newCurrencies = await axios.post(`${urlLocal}/get_new_currencies`,{selectedCurrencies})
        dispatch({ type: NEW_CURRENCIES, payload: newCurrencies.data })
    }
}
export const setSelectedCurrencies = () => {
    return async dispatch => {
        const currencies = await axios.post(`${urlLocal}/get_currencies`, )
        dispatch({ type: CURRENCIES, payload: currencies.data })
    }
}
export const getNewValueCurrency = (target, value, currencies) => {
    return async dispatch => {
        dispatch({ type: CHANGE_VALUE, payload: { target, value } })

        const changedCurrencies = await axios.post(`${urlLocal}/cur_rate`, { target, currencies })
        dispatch({type: CURRENCIES, payload: changedCurrencies.data})

        // const startCurrency = {Cur_Abbreviation: "USD", value: 1}
        // dispatch({ type: CURRENCIES, payload: currencies.data })

        // dispatch({type: CHANGE_VALUE_CURRENCY})
        // dispatch({})
    }
}
// const getUSD = newCurrencies.data.find(currency => currency.Cur_Abbreviation === startCurrency)
//         const currencies = await axios.post(`${urlLocal}/cur_rate`, { defaultCurrencies })
//         console.log(getUSD);
//         dispatch({ type: CHANGE_VALUE_CURRENCY, payload: newCurrencies.data })
