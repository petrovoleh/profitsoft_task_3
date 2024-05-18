import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { Portal } from '@mui/material';
import { deleteOrderById } from 'app/data/order'; // Assuming there's a deleteOrderById function
import { useIntl } from 'react-intl';



export default function DeleteButton({ order, action }) {
    const { formatMessage } = useIntl();

  const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState(formatMessage({ id: "order.delete.confirm.title" }));
    const [alertMessage, setAlertMessage] = React.useState("");

    const orderDeleteHandler = () => {
        setAlertMessage(formatMessage({ id: "order.delete.confirm.question" }) + order.id + " ?");
        setAlertOpen(true);
    };

    const handleCancel = () => {
        setAlertOpen(false);
    };


    const handleOK = (order) => {
        if (order === null) {
            console.log("Unexpected null order!");
            return;
        }
        const success = deleteOrderById(order.id);
        if (success) {
            setAlertOpen(false);
            action();
        } else {
            setAlertMessage(formatMessage({ id: "order.delete.confirm.fail.message" }) + order.id);
            setAlertTitle(formatMessage({ id: "order.delete.confirm.fail.title" }));
        }
    };

    return (
        <>
            <IconButton onClick={orderDeleteHandler}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={alertOpen} onClose={handleCancel}>
                <DialogTitle>{alertTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{alertMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleOK(order)} autoFocus>{formatMessage({ id: "button.ok" })}</Button>
                    <Button onClick={handleCancel}>{formatMessage({ id: "button.cancel" })}</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
