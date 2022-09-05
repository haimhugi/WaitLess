import React from 'react';
import Modal from '../../shared/components/UIElements/Modal';

const PasswordChangedModal = props => {
    return (
        <Modal onClose={props.onClose}>
            <h2>הסיסמה שונתה בהצלחה!</h2>
        </Modal>
    );
};

export default PasswordChangedModal;