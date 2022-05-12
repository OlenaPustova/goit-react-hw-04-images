import s from './Button.module.scss';
import PropTypes from 'prop-types';

function Button({ handleLoadMore }) {
  return (
    <button type="button" onClick={handleLoadMore} className={s.Button}>
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
