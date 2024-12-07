import PropTypes from "prop-types";
import Modal from "./Modal";
import { Button } from "../buttons";

const ConfirmDialog = ({ show = false, onClose = () => {}, onConfirm = () => {}, message = "Proceed?" }) => {

  return (
    <Modal show={show} onClose={onClose}>
      <div>
        { message }
      </div>
      <Button onClick={onConfirm}> Confirm </Button>
    </Modal>
  );
}
ConfirmDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string
};

export default ConfirmDialog;