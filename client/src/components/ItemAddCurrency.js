import { Grid, MenuItem, Typography, makeStyles } from "@material-ui/core";

export default function ItemAddCurrency({ newCurrency, handleAddNewCurrency }) {

    const handleClick = () => {
        handleAddNewCurrency(newCurrency);
    }

    const newCurStyles = useStyles();

    return (<MenuItem onClick={handleClick} className={newCurStyles.root}>
        <Grid container direction="row" alignItems="center" item xs={12}>
            <Grid item sm={2} xs={1}>
                <Typography className={newCurStyles.name}>
                    {newCurrency.Cur_Abbreviation}
                </Typography>
            </Grid>
            <Grid item sm={10} xs={12} >
                <Typography className={newCurStyles.text}>
                    {newCurrency.Cur_Name}
                </Typography>
            </Grid>
        </Grid>
    </MenuItem>)
}

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom: "1px solid #ebebeb",
    },
    name: {
        paddingLeft: "10px",
    },
    text: {
        paddingLeft: "10px",
        paddingRight: "5px"
    }
}))