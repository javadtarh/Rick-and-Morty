import { XCircleIcon } from "@heroicons/react/24/outline";
const Modal = ({ title, children, onClose, open }) => {
    if (!open) return null;
    return (
        <div>
            <div className="backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="modal__header">
                    <h2 className="title">{title}</h2>
                    <button onClick={onClose}>
                        <XCircleIcon className="icon close" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
