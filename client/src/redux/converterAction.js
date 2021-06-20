import { FETCH_CURRENCIES, FETCH_NEW_CURRENCIES, FETCH_NEW_VALUE_CURRENCIES, FETCH_ADD_NEW_CURRENCY, HANDLE_CHANGE_VALUE } from './converterTypes';

const urlLocal = 'http://localhost:8000';

export const fetchCurrencies = () => ({ type: FETCH_CURRENCIES });

export const fetchNewCurrencies = (currencies) => ({ type: FETCH_NEW_CURRENCIES, payload: currencies })

export const handleChangeCurrencyInputValue = (target, value, currencies) => ({ type: HANDLE_CHANGE_VALUE, payload: { target, value, currencies } });

export const fetchNewValueCurrencies = (target, value, currencies) => ({ type: FETCH_NEW_VALUE_CURRENCIES, payload: { target, value, currencies } });
export const fetchAddNewCurrency = (newCurrency, currencyBYNValue) => ({ type: FETCH_ADD_NEW_CURRENCY, payload: { currencyBYNValue, newCurrency } });
