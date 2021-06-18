import { Grid, List } from "@material-ui/core";
import ItemСurrency from "./ItemCurrency";

export default function ListСurrency({ currencies, converterActions}) {
    return (<Grid item xs={12}>
        <List>
            {
                currencies && currencies.map((currency, index) => {
                    return <ItemСurrency key={index} currency={currency} currencies={currencies} getNewValueCurrency={converterActions.getNewValueCurrency}/>
                })
            }
        </List>
    </Grid>)
}