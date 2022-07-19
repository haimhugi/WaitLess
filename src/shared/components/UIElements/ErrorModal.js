import React from 'react';

import ModalNew from './ModalNew';
import { Button } from 'antd';

const ErrorModal = props => {
    return (
        <ModalNew
            onCancel={props.onClear}
            header="An Error Occurred!"
            show={!!props.error}
            footer={<Button onClick={props.onClear}>Okay</Button>}
        >
            <p>{props.error}</p>
        </ModalNew>
    );
};

export default ErrorModal;
