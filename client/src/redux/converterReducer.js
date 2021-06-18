import { NEW_CURRENCIES, CURRENCIES, CHANGE_VALUE, ADD_CURRENCY } from './converterTypes'

const initialState = {
    currencies: [],
    newCurrencies: [],
    currencyBYN: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENCIES: {
            state.currencies = action.payload
            state.currencyBYN = action.payload.find(currency => currency.Cur_Abbreviation === "BYN")
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
        case ADD_CURRENCY: {
            state.currencies.push(action.payload)
            return {
                ...state,
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