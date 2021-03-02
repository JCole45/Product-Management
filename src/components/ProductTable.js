import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Button } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

import { fetchProduct } from '../actions/productActions'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

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


}));

const ProductTable = () => {

    const dispatch = useDispatch()
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchProduct())
    }, [])

    const [menu, setMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState('')

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')

    const store = useSelector(state => state.product)
    const { products } = store

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const handleClose = () => {
        setMenu(false);
        setAnchorEl(null);
    };

    const handleOpen = () => {
        setOpen(true);
        setState('edit')
    };

    const addProduct = () => {
        setOpen(true)
        setState('add')
    }

    const handleModalClose = () => {
        setOpen(false);
        setTimeout(() => { setState('') }, 1000)
    };

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(Number(e.target.value))
    }

    const handleClick = (event) => {
        setMenu(true);
        setAnchorEl(event.currentTarget)
    };

    const handleSubmit = () => {

    }

    // const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];

    const rows = products.map(item => {
        console.log(item)
        console.log(products)
        return createData(item.name, item.prices)
    })

    return (
        <>
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
                        <h2 id="transition-modal-title">{state === 'add' ? 'Add Item' : 'Edit Item'}</h2>
                        <p id="transition-modal-description">
                            <form onSubmit={handleSubmit}>
                                <Grid item xs={12} sm={6}>
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
                                        type={"text"}
                                        onChange={handlePrice}
                                        value={price}
                                        fullWidth
                                    />
                                </Grid>
                                {state === 'add' ?
                                    <Button type="submit" color="primary" variant="outlined" size="small">
                                        Add
                                    </Button>
                                    :
                                    <Button type="submit" color="primary" variant="outlined" size="small">
                                        Edit
                                    </Button>
                                }
                            </form>
                        </p>
                    </div>
                </Fade>
            </Modal>

            <TableContainer component={Paper}>
                <AddCircleRoundedIcon color="primary" style={{ fontSize: '50px' }} onClick={addProduct} />
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            {/* <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell> */}
                            <StyledTableCell align="right"> Action </StyledTableCell>
                            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell style={{ display: 'flex', flexDirection: 'column' }} align="right">
                                    {/* {row.calories.map((price) => {
                                        return <>
                                            <p>GHC{price.price}</p>
                                            <p>{price.date}</p>
                                        </>
                                    })} */}
                                    <p>{row.calories[0].price.toFixed(2)}</p> <p>{row.calories[0].date}</p>
                                </StyledTableCell>
                                {/* <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
                                <StyledTableCell align="right"> <EditIcon color="primary" onClick={handleOpen} style={{ marginRight: '30px' }} /> <DeleteOutlinedIcon style={{ color: 'red' }} /> </StyledTableCell>
                                {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                            </StyledTableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    )
}

export default ProductTable
