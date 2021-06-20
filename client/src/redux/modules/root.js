import { combineEpics } from 'redux-observable';
import { fetchCurrenciesEpic, fetchNewCurrenciesEpic, changeInputValueCurrencyEpic, addNewCurrencyFulfilledEpic } from './currencies';

export const rootEpic = combineEpics(
    fetchCurrenciesEpic,
    fetchNewCurrenciesEpic,
    changeInputValueCurrencyEpic,
    addNewCurrencyFulfilledEpic,
);