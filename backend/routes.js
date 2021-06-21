const axios = require('axios');
require('dotenv').config();

const convert = (valueBYN, currRate, currScale) => {
    return valueBYN / currRate * currScale
}

const defaultCurrencies = ["USD", "EUR", "RUB"];
module.exports = function (app) {
    app.post('/get_new_currencies', async (req, res) => {
        const selectedCurrencies = req.body;
        const currencies = await axios.get(`${process.env.GET_ALL_CURRENCIES}`);
        const getNewCurrencies = currencies.data.filter(currency => {
            if (!(selectedCurrencies.find(selectedCurrency => selectedCurrency.Cur_Abbreviation === currency.Cur_Abbreviation))) {
                return currency;
            }
        });
        res.send(getNewCurrencies);
    });

    app.get('/get_currencies', async (req, res) => {
        const currencies = await axios.get(`${process.env.GET_ALL_CURRENCIES}`)
        const getDefaultCurrencies = currencies.data.filter(currency => defaultCurrencies.find(startCurrency => startCurrency === currency.Cur_Abbreviation));
        const currencyUSD = getDefaultCurrencies.find((currency) => currency.Cur_Abbreviation === "USD");
        const defaultUSDInBYN = currencyUSD.Cur_OfficialRate;

        const response = getDefaultCurrencies.map((defaultCurrency) => {
            const value = convert(defaultUSDInBYN, defaultCurrency.Cur_OfficialRate, defaultCurrency.Cur_Scale);
            return { ...defaultCurrency, value: +value.toFixed(4) };
        });
        response.push({ Cur_Abbreviation: "BYN", Cur_Name: "Белорусский рубль", value: defaultUSDInBYN, Cur_OfficialRate: 1, Cur_Scale: 1 });
        res.send(response);
    });

    app.post('/cur_rate', async (req, res) => {
        const { target, value, currencies } = req.body;
        const changedCurrency = currencies.find((cur) => cur.Cur_Abbreviation === target);
        const changedCurrencyInBYN = changedCurrency.Cur_OfficialRate * value / changedCurrency.Cur_Scale;

        const response = currencies.map((currency) => {
            if (currency.Cur_Abbreviation === target) {
                return { ...currency, value };
            }
            else {
                const value = convert(changedCurrencyInBYN, currency.Cur_OfficialRate, currency.Cur_Scale);
                return { ...currency, value: value !== 0 ? +value.toFixed(4) : 0 };
            }
        });

        res.send(response);
    });

    app.post('/add_currency', async (req, res) => {
        const { newCurrency, currencyBYNValue } = req.body;
        const value = convert(currencyBYNValue, newCurrency.Cur_OfficialRate, newCurrency.Cur_Scale)

        res.send({ ...newCurrency, value: +value.toFixed(4) });
    });
}