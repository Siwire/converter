import { useState, useRef } from 'react';
import { Button, Grid, Popper, Grow, Paper, MenuList, ClickAwayListener, makeStyles } from "@material-ui/core";
import ItemAddCurrency from './ItemAddCurrency'



export default function AddCurrency({ currencies, allCurrencies, fetchAddNewCurrency }) {

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleAddNewCurrency = (newCurrencyAbbr) => {
        const currencyBYN = currencies.find((currency) => currency.Cur_Abbreviation === 'BYN');
        fetchAddNewCurrency(newCurrencyAbbr, currencyBYN.value);
    }

    const addCurStyles = useStyles()

    return (<Grid>
        <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className={addCurStyles.bttn}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="24" viewBox="-5 0 50 25"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" /></svg>  Добавить валюту
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper className={addCurStyles.paper}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onClick={handleClose} className={addCurStyles.list} onKeyDown={handleListKeyDown}>
                                {
                                    allCurrencies && allCurrencies
                                        .filter((currency) => !currencies.find((item) => item.Cur_Abbreviation === currency.Cur_Abbreviation))
                                        .map((newCurrency) => (<ItemAddCurrency key={newCurrency.Cur_Abbreviation} newCurrency={newCurrency} handleAddNewCurrency={handleAddNewCurrency} />))
                                }
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    list: {
        maxHeight: "200px",
        overflow: "auto",

    },
    bttn: {
        padding: "10px",
        textTransform: "none",
        marginBottom: "20px",
        '& .MuiButton-root': {

        },
    }
}))