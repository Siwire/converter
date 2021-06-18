import { useState, useRef } from 'react';
import { Button, Grid, Popper, Grow, Paper, MenuList, ClickAwayListener, makeStyles } from "@material-ui/core";
import ItemAddCurrency from './ItemAddCurrency'



export default function AddCurrency({ currencies, newCurrencies, currencyBYN, getNewCurrencies, addNewCurrency }) {

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        getNewCurrencies(currencies)
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const prevOpen = useRef(open);

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
                                {newCurrencies && newCurrencies.map(newCur => {
                                    return <ItemAddCurrency key={newCur.Cur_Abbreviation} newCur={newCur} currencyBYN={currencyBYN} addNewCurrency={addNewCurrency} />
                                })}
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
    paper: {
        // width: "95%",
        // display: "block",
        // marginLeft: "auto",
        // marginRight: "auto",
    },
    bttn: {
        padding: "10px",
        textTransform: "none",
        marginBottom: "20px",
        '& .MuiButton-root': {

        },
    }
}))