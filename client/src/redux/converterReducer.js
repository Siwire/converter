import { NEW_CURRENCIES, CURRENCIES, CHANGE_VALUE } from './converterTypes'

const initialState = {
    currencies: [],
    newCurrencies: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENCIES: {
            state.currencies = action.payload
            return {
                ...state,
            }
        }
        case NEW_CURRENCIES: {
            return {
                ...state,
                newCurrencies: action.payload
            }
        }
        case CHANGE_VALUE: {
            const changeCurr = state.currencies.find(currency => currency.Cur_Abbreviation === action.payload.target)
            changeCurr.Cur_Value = action.payload.value
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