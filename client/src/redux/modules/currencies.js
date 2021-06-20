import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { map, mergeMap  } from 'rxjs/operators';
import { concat, of, from } from 'rxjs';
import {
	FETCH_CURRENCIES, CURRENCIES, FETCH_NEW_CURRENCIES, NEW_CURRENCIES,
	CHANGE_VALUE, HANDLE_CHANGE_VALUE, FETCH_ADD_NEW_CURRENCY, ADD_CURRENCY
} from '../converterTypes';

const fetchCurrenciesFulfilled = payload => ({ type: CURRENCIES, payload });

export const fetchCurrenciesEpic = action$ => action$.pipe(
	ofType(FETCH_CURRENCIES),
	mergeMap(action => ajax.post(`http://localhost:8000/get_currencies`).pipe(
		map(response => fetchCurrenciesFulfilled(response))
	))
);

const fetchNewCurrenciesFulfilled = payload => ({ type: NEW_CURRENCIES, payload });

export const fetchNewCurrenciesEpic = action$ => action$.pipe(
	ofType(FETCH_NEW_CURRENCIES),
	mergeMap(action => ajax.post(`http://localhost:8000/get_new_currencies`, action.payload, { 'Content-Type': 'application/json' }).pipe(
		map(response => fetchNewCurrenciesFulfilled(response))
	))
);

const fetchNewValueCurrenciesFulfilled = payload => ({ type: CURRENCIES, payload });

export const changeInputValueCurrencyEpic = action$ => action$.pipe(
	ofType(HANDLE_CHANGE_VALUE),
	mergeMap(action => concat(
		of({ type: CHANGE_VALUE, payload: action.payload }),
		from(ajax.post(`http://localhost:8000/cur_rate`, action.payload, { 'Content-Type': 'application/json' })).pipe(
			map(response => fetchNewValueCurrenciesFulfilled(response)),
		)
	)),
);

const fetchAddNewCurrencyFulfilled = payload => ({ type: ADD_CURRENCY, payload });

export const addNewCurrencyFulfilledEpic = action$ => action$.pipe(
  ofType(FETCH_ADD_NEW_CURRENCY),
  mergeMap(action => ajax.post(`http://localhost:8000/add_currency`, action.payload, { 'Content-Type': 'application/json' }).pipe(
    map(response => fetchAddNewCurrencyFulfilled(response))
  ))
);