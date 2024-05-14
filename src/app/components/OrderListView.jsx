import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Container, Grid, TextField, Fab, InputLabel, Select, MenuItem } from '@mui/material';
import { getAllOrders } from 'app/data/order';
import { useNavigate } from 'react-router-dom';
import * as client from "../data/client";
import {getClientById} from "../data/client";
import DeleteButton from "./DeleteButton";

const PAGE_PARAMETER = "PAGE";
const ROWS_PER_PAGE_PARAMETER = "ROWS_PER_PAGE";
const FILTER_PARAMETER = "FILTER";

const FIRST_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 10;

export default function OrderListView() {
    const [page, setPage] = React.useState(FIRST_PAGE_NUMBER);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_PAGE_SIZE);
    const [filter, setFilter] = React.useState({});
    const [data, setData] = React.useState(getAllOrders(filter));
    const [isHovered, setIsHovered] =  React.useState(false);

    const navigate = useNavigate();

    const [orderStatus, setOrderStatus] = React.useState("");
    const [orderDateStart, setOrderDateStart] = React.useState("");
    const [orderDateEnd, setOrderDateEnd] = React.useState("");

    const orderSelectionHandler = (order) => {
        navigate(`/orders/${order.id}`);
    }

    const pageChangeHandler = (event, newPage) => {
        setPage(newPage);
    };

    const rowsPerPageChangeHandler = (event) => {
        const rowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(rowsPerPage);
        setPage(FIRST_PAGE_NUMBER);
    };

    const clearFilterHandler = () => {
        setOrderStatus("");
        setOrderDateStart("");
        setOrderDateEnd("");
        setFilter({});
        setData(getAllOrders({}));
        setPage(FIRST_PAGE_NUMBER);
    };

    const setFilterHandler = () => {
        const newFilter = {
            status: orderStatus,
            dateStart: orderDateStart,
            dateEnd: orderDateEnd,
        };
        setFilter(newFilter);
        setData(getAllOrders(newFilter));
        setPage(FIRST_PAGE_NUMBER);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Container maxWidth="xl" sx={{ marginTop: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} alignItems="left">
                        <Grid item xs={2}>
                            <InputLabel id="status">Order Status</InputLabel>
                            <Select
                                id="status"
                                value={orderStatus}
                                label="Order Status"
                                onChange={(event) => setOrderStatus(event.target.value)}
                                fullWidth
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="COMPLETED">Completed</MenuItem>
                                <MenuItem value="CANCELLED">Cancelled</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="date-start"
                                label="Order Date Start"
                                type="date"
                                value={orderDateStart}
                                onChange={(event) => setOrderDateStart(event.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="date-end"
                                label="Order Date End"
                                type="date"
                                value={orderDateEnd}
                                onChange={(event) => setOrderDateEnd(event.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Fab color="secondary" variant="extended" size="small" onClick={setFilterHandler}>
                                Apply Filter
                            </Fab>
                        </Grid>
                        <Grid item xs={2}>
                            <Fab color="secondary" variant="extended" size="small" onClick={clearFilterHandler}>
                                Clear Filter
                            </Fab>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} alignItems="left">
                <Grid item xs={12}>
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table sx={{ minWidth: 200 }} size="small" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Order ID</TableCell>
                                    <TableCell align="center">Customer</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(order => (
                                    <TableRow
                                        key={order.id}
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        onClick={() => orderSelectionHandler(order)}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <TableCell align="center">{order.id}</TableCell>
                                        <TableCell align="center">{getClientById(order.clientId).name}</TableCell>
                                        <TableCell align="center">{order.date}</TableCell>
                                        <TableCell align="center">{order.status}</TableCell>
                                        <TableCell align="center">{order.total}</TableCell>
                                        <TableCell align="center">
                                            {isHovered && (
                                                <DeleteButton order={order} />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20, 50]}
                            colSpan={3}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            labelRowsPerPage="Rows per page"
                            onPageChange={pageChangeHandler}
                            onRowsPerPageChange={rowsPerPageChangeHandler}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
    const theme = useTheme();

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={(event) => onPageChange(event, 0)}
                disabled={page === 0}
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={(event) => onPageChange(event, page - 1)}
                disabled={page === 0}
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={(event) => onPageChange(event, page + 1)}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={(event) => onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
