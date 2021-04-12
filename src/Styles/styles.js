
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

export const useStyles = makeStyles((theme) => ({
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
        color: 'white'
    },

}));

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.common.black,
            color: 'white'
        },
    },
}))(TableRow);
