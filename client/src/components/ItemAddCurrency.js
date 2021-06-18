import { Grid, MenuItem, Typography, makeStyles } from "@material-ui/core";

export default function ItemAddCurrency({ newCur, currencyBYN, addNewCurrency, onClick }) {

    const handleClick = () => {
        addNewCurrency(newCur, currencyBYN)
    }

    const newCurStyles = useStyles()
    return (<MenuItem onClick={handleClick}>
        <Grid container direction="row">
            <Typography>
                {newCur.Cur_Abbreviation}
            </Typography>
            <Typography className={newCurStyles.text}>
                {newCur.Cur_Name}
            </Typography>
        </Grid>
    </MenuItem>)
}

const useStyles = makeStyles((theme) => ({
    text: {
        paddingLeft: "15px",
    }
}))