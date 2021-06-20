import Grid from '@material-ui/core/Grid';
import { makeStyles, Typography } from '@material-ui/core';
import Converter from './Converter'
import { useEffect } from 'react';

export default function Panel({ converter, converterActions }) {
    const { fetchCurrencies, fetchNewCurrencies } = converterActions;

    const getCurrentDate = () => {
        const currentTime = new Date();
        const monthCorrect = currentTime.getMonth() < 10 ? `0${currentTime.getMonth() + 1}` : currentTime.getMonth() + 1;
        return `${currentTime.getDate()}.${monthCorrect}.${currentTime.getFullYear()}`;
    }

    useEffect(() => {
        fetchCurrencies();
        fetchNewCurrencies(converter.currencies);
    }, []);

    const panelStyles = useStyles();

    return (
        <Grid item xs={10} sm={6} md={6} lg={4} container justify="center" direction="column">
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
        fontWeight: "bold",
    },
    sub_title: {
        fontSize: "16px",
        color: "#14509c",
        fontWeight: "bold",
        paddingTop: "10px",
    },
    text: {
        fontSize: "14px",
        lineHeight: "17px",
        textAlign: "left",
        padding: "15px 0px",
    }
}))