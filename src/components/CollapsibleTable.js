import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { v4 as uuidv4 } from 'uuid';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

import { createProduct, updateProduct, deleteProduct, restoreProduct } from '../actions/productActions'

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    dropdownLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
        color: 'black !important',
        fontSize: '0.905rem '
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '60%',
    },
    headcolor: {
        color:'white'
    },
    cellshadevisible: {
        color: 'black'
    },
    cellshadehidden: {
        color: 'grey'
    },
}));

const CollapsibleTable = (props) => {
    const { row, visible } = props;
    const [open_history, setOpenHistory] = React.useState(false);
    const classes_ = useRowStyles();

    const dispatch = useDispatch()
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [state, setState] = useState('')

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const editProduct = (item) => {
        setOpen(true);
        setState('edit')
        setName(item.name)
        setPrice(item._prices[0].price)
        setId(item._id)
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
    }

    const getDate = () => {
        Date.prototype.toIsoString = function () {
            var tzo = -this.getTimezoneOffset(),
                dif = tzo >= 0 ? '+' : '-',
                pad = function (num) {
                    var norm = Math.floor(Math.abs(num));
                    return (norm < 10 ? '0' : '') + norm;
                };
            return this.getFullYear() +
                '-' + pad(this.getMonth() + 1) +
                '-' + pad(this.getDate()) +
                'T' + pad(this.getHours()) +
                ':' + pad(this.getMinutes()) +
                ':' + pad(this.getSeconds()) +
                dif + pad(tzo / 60) +
                ':' + pad(tzo % 60);
        }

        let date = new Date()

        return date.toIsoString()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (state === 'add') {
            dispatch(createProduct({
                id: uuidv4(),
                name: name,
                prices: [{
                    id: uuidv4(),
                    price: Number(price),
                    date: getDate()
                }]
            }))
            setOpen(false);
            setName('')
            setPrice()
        }

        if (state === 'edit') {
            dispatch(updateProduct({
                id: id,
                name: name,
                prices: {
                    id: uuidv4(),
                    price: Number(price),
                    date: getDate()
                }
            }))
            setOpen(false);
            setName('')
            setPrice()
        }
    }

    const sortbyDate = (array) => {
        return array.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date)
        })
    }

    const handleRestore = (id) => {
       dispatch(restoreProduct(id))
    }

    const rowshade = visible ? classes.cellshadevisible : classes.cellshadehidden

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">{state === 'add' ? 'Add Item' : state === 'edit' ? 'Edit Item' : ''}</h2>
                        <form onSubmit={handleSubmit}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label={"Drug name"}
                                    type={"text"}
                                    fullWidth
                                    onChange={handleName}
                                    value={name}
                                />

                                <TextField
                                    id="price"
                                    name="price"
                                    label={"Price"}
                                    type={"number"}
                                    onChange={handlePrice}
                                    value={price}
                                    fullWidth
                                />
                            </Grid>
                            {state === 'add' ?
                                <Button className="button" type="submit" color="primary" variant="outlined" size="small">
                                    Add
                                </Button>
                                :

                                state === 'edit' ?
                                    <Button className="button" type="submit" color="primary" variant="outlined" size="small">
                                        Edit
                                    </Button>
                                    :
                                    ''
                            }
                        </form>
                    </div>
                </Fade>
            </Modal>

            <TableRow className={classes_.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpenHistory(!open_history)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className={rowshade} component="th" scope="row">
                    {row.name}
                </TableCell>
                {/* <TableCell align="right">{row.name}</TableCell> */}
                <TableCell className={rowshade} align="right">GH&cent; {sortbyDate(row._prices)[0].price.toFixed(2)}</TableCell>
                <TableCell className={rowshade} align="right">{new Date(sortbyDate(row._prices)[0].date).toString()}</TableCell>
                <TableCell className={rowshade} align="right">
                    {visible ?
                    <>
                    <EditIcon color="primary" rowshade="icon-edit" onClick={() => editProduct(row)} />
                    <DeleteOutlinedIcon className="icon-delete" onClick={() => handleDelete(row._id)} />
                    </>
                    :
                    <Button onClick={()=> handleRestore(row._id)}  color="primary" variant="contained" size="small">
                        Restore
                    </Button>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open_history} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Price History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell>GH&cent;{historyRow.price}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {new Date(historyRow.date).toString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default CollapsibleTable
