import s from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal');

export default function Modal({ modalImg, tags, closeModal }) {
  const handleEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
    // eslint-disable-next-line
  }, []);

  const clickBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={clickBackdrop}>
      <div className={s.modal}>
        <img src={modalImg} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  modalImg: PropTypes.string,
  tags: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
