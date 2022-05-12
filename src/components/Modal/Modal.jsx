import s from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  clickBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { modalImg, tags } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={this.clickBackdrop}>
        <div className={s.modal}>
          <img src={modalImg} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  modalImg: PropTypes.string,
  tags: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
