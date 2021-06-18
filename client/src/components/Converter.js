import { Button, Grid, makeStyles } from "@material-ui/core";
import ListСurrency from "./ListСurrency";

export default function Converter({converter, converterAction}) {

    const converterStyles = useStyles()
    return (<Grid className={converterStyles.root} item xs={12}>
        <ListСurrency currencies={converter.currencies} converterActions={converterAction}/>
        <Button className={converterStyles.bttn}>Добавить валюту</Button>
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