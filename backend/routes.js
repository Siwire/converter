const axios = require('axios');

const convert = (valueBYN, currRate, currScale) => {
    return valueBYN / currRate * currScale
}
const convertToBYN = (valueCurr, currRate, currScale) => {
    return valueCurr * currRate / currScale
}

const defaultCurrencies = ["USD", "EUR", "RUB"];
module.exports = function (app) {
    app.post('/get_new_currencies', async (req, res) => {
        const selectedCurrencies = req.body.selectedCurrencies
        const currencies = await axios.get("https://www.nbrb.by/API/ExRates/Rates?Periodicity=0")
        const getNewCurrencies = currencies.data.filter(currency => {
            if (!selectedCurrencies.find(selectedCurrency => selectedCurrency.Cur_Abbreviation === currency.Cur_Abbreviation)) {
                return currency
            }

        })
        res.send(getNewCurrencies)
    })
    app.post('/get_currencies', async (req, res) => {
        const startCurrencies = defaultCurrencies
        const currencies = await axios.get("https://www.nbrb.by/API/ExRates/Rates?Periodicity=0")
        const getDefaultCurrencies = currencies.data.filter(currency => {
            if (startCurrencies.find(startCurrency => startCurrency === currency.Cur_Abbreviation)) {
                return currency
            }
        })
        const currUSD = getDefaultCurrencies.find(currency => {
            if (currency.Cur_Abbreviation === "USD") {
                return currency
            }
        })

        const valueBYN = +currUSD.Cur_OfficialRate
        const getRateCurrencies = getDefaultCurrencies.map(currency => {
            const value = convert(valueBYN, currency.Cur_OfficialRate, currency.Cur_Scale)
            const roundValue = (value) => {
                return +value.toFixed(4);;
            }
            return { ...currency, Cur_Value: roundValue(value) }
        })
        getRateCurrencies.push({ Cur_Abbreviation: "BYN", Cur_Name: "Белорусский рубль", Cur_Value: valueBYN, Cur_OfficialRate: 1, Cur_Scale: 1 });
        res.send(getRateCurrencies)

    })
    app.post('/cur_rate', async (req, res) => {
        const selectedCurrencies = req.body.currencies
        const changedCurrencyName = req.body.target
        const changedCurrency = selectedCurrencies.find(currency => {
            if (currency.Cur_Abbreviation === changedCurrencyName) {
                return currency
            }
        })
        const valueBYN = convertToBYN(changedCurrency.Cur_Value, changedCurrency.Cur_OfficialRate, changedCurrency.Cur_Scale)
        const getNewValueCurrencies = selectedCurrencies.map(currency => {
            const value = convert(valueBYN, currency.Cur_OfficialRate, currency.Cur_Scale)
            const roundValue = (value) => {
                return +value.toFixed(4);;
            }
            return { ...currency, Cur_Value: roundValue(value) }
        })
        const changeValueBYN = getNewValueCurrencies.find(currency => currency.Cur_Abbreviation === "BYN").Cur_Value = valueBYN
        res.send(getNewValueCurrencies)
    })


}