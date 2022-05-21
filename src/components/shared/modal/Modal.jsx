import "./Modal.css";

import Button from "../button/Button";

import CloseIcon from "../../svgs/CloseIcon";

const Modal = (props) => {
  const { isModalVisible, hideModal, children } = props;

  return (
    <div
      className={
        isModalVisible
          ? "modal-container showModal"
          : "modal-container hideModal"
      }
    >
      <div className="modal">
        <Button
          label=""
          icon={<CloseIcon />}
          backgroundStyle="close"
          action={hideModal}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
