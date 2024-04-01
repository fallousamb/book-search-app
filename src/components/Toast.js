import React, { Fragment } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({added, type, message, position}) => {
    //console.log(type)
    console.log(message)
    console.log(position)
    var displayToast = null;
    switch (type) {
        case 'info':
            displayToast = toast.info(message, {
                position: position,
            })
            break;
    
        default:
            break;
    }

    return (
        added && <Fragment>
            { displayToast }
            <ToastContainer />
        </Fragment>
    )
}

export default Toast
