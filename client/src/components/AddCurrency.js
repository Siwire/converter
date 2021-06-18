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
        >
            + Добавить валюту
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onClick={handleClose} className={addCurStyles.list} onKeyDown={handleListKeyDown}>
                                {newCurrencies && newCurrencies.map(newCur => {
                                    return <ItemAddCurrency  key={newCur.Cur_Abbreviation} newCur={newCur} currencyBYN={currencyBYN} addNewCurrency={addNewCurrency}/>
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
        maxHeight: "250px",
        overflow: "auto",
    }
}))