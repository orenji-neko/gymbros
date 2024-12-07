import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ show, onClose, children, title }) => {
  const [visible, setVisible] = useState(show);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10); // Small delay to trigger animation
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300); // Delay for animation duration
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className={`bg-white rounded-lg shadow-xl transform transition-all max-w-lg w-full ${animate ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
        <div className="text-white px-4 py-2 flex justify-end items-center">
          <button onClick={onClose} className="text-gray-800 focus:outline-none">
            &times; {/* This is the close (X) button */}
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default Modal;