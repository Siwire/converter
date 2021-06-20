import { NEW_CURRENCIES, CURRENCIES, CHANGE_VALUE, ADD_CURRENCY } from './converterTypes'

const initialState = {
    currencies: [],
    allCurrencies: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENCIES: {
            state.currencies = action.payload.response
            return {
                ...state,
            }
        }
        case NEW_CURRENCIES: {
            return {
                ...state,
                allCurrencies: action.payload.response
            }
        }
        case ADD_CURRENCY: {
            state.currencies.push(action.payload.response)
            return {
                ...state,
            }
        }
        case CHANGE_VALUE: {
            const changeCurr = state.currencies.find(currency => currency.Cur_Abbreviation === action.payload.target);
            if (changeCurr) {
                changeCurr.Cur_Value = action.payload.value
            }
            return {
                ...state
            }
        }
        default:
            return {
                ...state,
            }
    }
}

export default reducer;