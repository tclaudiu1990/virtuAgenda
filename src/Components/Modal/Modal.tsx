import React from "react"
import './Modal.scss'

interface ModalProps {
    children: React.ReactNode;
}

const Modal:React.FC<ModalProps> = (props) => {

    return(
        <div className="modal">
            <div className="modal-overlay"></div>
            <div className="modal-content">
                {props.children}
            </div>
        </div>
    )
}

export default Modal;