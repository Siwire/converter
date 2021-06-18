import Grid from '@material-ui/core/Grid';
import { makeStyles, Typography } from '@material-ui/core';
import Converter from './Converter'
import { useEffect } from 'react';

export default function Panel({ converter, converterActions }) {

    const { getNewCurrencies, setSelectedCurrencies } = converterActions

    const getCurrentDate = () => {
        const currentTime = new Date()
        const day = currentTime.getDate()
        const month = currentTime.getMonth();
        const monthCorrect = month < 10 ? `0${currentTime.getMonth() + 1}` : currentTime.getMonth() + 1
        const year = currentTime.getFullYear().toString()
        const currentDate = `${day}.${monthCorrect}.${year}`
        return currentDate
    }


    useEffect(() => {
        setSelectedCurrencies()
        getNewCurrencies(converter.selectedCurrencies)

    }, []);

    const panelStyles = useStyles()

    return (<Grid item xs={6} container justify="center" direction="column">
        <Grid container alignItems="flex-start" direction="column">
            <Typography className={panelStyles.title}>Конвертер валют</Typography>
            <Typography className={panelStyles.sub_title}>По курсу НБ РБ</Typography>
            <Typography className={panelStyles.text} >Официальный курс, устанавливаемый Национальным банком Республики Беларусь на {getCurrentDate()}</Typography>

        </Grid>
        <Grid item xs={12}>
            <Converter converter={converter} converterAction={converterActions} />
        </Grid>
    </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "30px",
        color: "#000",
        fontWeight: "bold"
    },
    sub_title: {
        fontSize: "16px",
        color: "#14509c",
        fontWeight: "bold",
    },
    text: {
        fontSize: "14px",
        lineHeight: "17px",
        textAlign: "left",
    }
}))