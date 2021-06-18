import { Grid, makeStyles } from "@material-ui/core";
import ListСurrency from "./ListСurrency";
import AddCurrency from "./AddCurrency";

export default function Converter({ converter, converterAction }) {

    const converterStyles = useStyles()
    return (<Grid className={converterStyles.root} item xs={12}>
        <ListСurrency currencies={converter.currencies} converterActions={converterAction} />
        <AddCurrency currencies={converter.currencies} currencyBYN={converter.currencyBYN}
            newCurrencies={converter.newCurrencies} getNewCurrencies={converterAction.getNewCurrencies}
            addNewCurrency={converterAction.addNewCurrency}
        />
    </Grid>)
}

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: "3px",
        backgroundColor: "#EBF6FB",
    },
    bttn: {
        backgroundColor: "red"
    }
}))