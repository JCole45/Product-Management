import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import CollapsibleTable from './CollapsibleTable'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { v4 as uuidv4 } from 'uuid';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import {useStyles, StyledTableRow} from '../Styles/styles'
import { fetchProduct, createProduct, updateProduct } from '../actions/productActions'

const ProductTable = () => {

    const dispatch = useDispatch()
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchProduct())
    }, [dispatch])

    const [open, setOpen] = useState(false);
    const [state, setState] = useState('')

    const [showall, setShowAll] = useState(false)
    const [form, setForm] = useState({
      id: '',
      name: '',
      price: '',
    })
    const [show, setShow] = useState({
      state: false,
      changeState: function(){
        alert('working')
        this.state = !this.state
      }
    })

    const store = useSelector(state => state.product)
    const { products } = store

    function createData(name, _prices, _id, visible) {
        return { name, _prices, history: _prices, _id, visible };
    }

    const rows = products.map(item => {
        let a = item.hidden && item.hidden === true ? false : true
        return createData(item.name, item.prices, item.id, a)
    })

    const addProduct = () => {
        setOpen(true)
        setState('add')
    }

    const handleModalClose = () => {
        setOpen(false);
    };

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

    const handleChange  = (e) => {
      let intermediary = {...form}
      intermediary[e.target.name] = e.target.value
      setForm(intermediary)
      console.log(form)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (state === 'add') {
            dispatch(createProduct({
                id: uuidv4(),
                name: form.name,
                prices: [{
                    id: uuidv4(),
                    price: Number(form.price),
                    date: getDate()
                }]
            }))
            setOpen(false);
            setForm({id:'', name:'', price:''})
        }

        if (state === 'edit') {
            dispatch(updateProduct({
                id: form.id,
                name: form.name,
                prices: {
                    id: uuidv4(),
                    price: Number(form.price),
                    date: getDate()
                }
            }))
            setOpen(false);
            setForm({id:'', name:'', price:''})
        }
    }

    const handleShowAll = () => {
        setShowAll(!showall)
    }

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
                        <h2 id="transition-modal-title">{state === 'add' ? 'Add Item' : state === 'edit' ? 'Edit Item' : ''}</h2>
                        <form onSubmit={handleSubmit}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label={"Item name"}
                                    type={"text"}
                                    fullWidth
                                    onChange={handleChange}
                                    value={form.name}
                                />

                                <TextField
                                    id="price"
                                    name="price"
                                    label={"Price"}
                                    type={"number"}
                                    step="any"
                                    onChange={handleChange}
                                    value={form.price}
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

            <TableContainer component={Paper}>
                <div className="head">
                <Tooltip title="Add new item" placement="right" arrow>
                <AddCircleRoundedIcon color="primary" style={{ fontSize: '50px' }} onClick={addProduct} />
                </Tooltip>
                <Button className="button" onClick={handleShowAll}  color="primary" variant="contained" size="small">
                    {showall ? 'Show Current' : 'Show All'}
                </Button>
                </div>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                            <TableCell className={classes.headcolor} />
                            <TableCell className={classes.headcolor}>Name</TableCell>
                            <TableCell className={classes.headcolor} align="right">Price</TableCell>
                            <TableCell className={classes.headcolor} align="center">Date</TableCell>
                            <TableCell className={classes.headcolor} align="right"> Action </TableCell>
                        </StyledTableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => {
                            if(!showall) {
                               return (row.visible &&
                                    <CollapsibleTable visible={row.visible} key={row.id} row={row} />)

                            }
                            if(showall){
                               return <CollapsibleTable visible={row.visible} key={row.id} row={row} />
                            }
                        }
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    )
}

export default ProductTable
