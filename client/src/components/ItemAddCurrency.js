import { Grid, MenuItem, Typography, makeStyles } from "@material-ui/core";

export default function ItemAddCurrency({ newCur  }) {

    const newCurStyles = useStyles()
    return (<MenuItem>
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