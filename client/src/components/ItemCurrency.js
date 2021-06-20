import { Grid, ListItem, Typography, TextField, makeStyles } from "@material-ui/core";

export default function ItemСurrency({ currency, currencies, handleChangeCurrencyInputValue }) {

    const handleChange = (event) => {
        event.preventDefault()
        handleChangeCurrencyInputValue(event.target.name, event.target.value, currencies);
    }

    const itemStyles = useStyles()

    return (<ListItem >
        <Grid container item xs={12} alignItems="center" direction="row">
            <Grid item xs={12} sm={2}>
                <Typography>{currency.Cur_Abbreviation}</Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
                <TextField className={itemStyles.input} onChange={handleChange} name={currency.Cur_Abbreviation} id={currency.Cur_Abbreviation} value={currency.value} variant="outlined" />
            </Grid>
        </Grid>
    </ListItem>)
}

const useStyles = makeStyles((theme) => ({
    input: {
        width: "100%",
    }
}))