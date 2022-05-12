import s from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

function ImageGalleryItem({ img, openModal }) {
  const { webformatURL, largeImageURL, tags } = img;
  const handleClick = modalImg => {
    openModal(modalImg, tags);
  };
  return (
    <li className={s.item} onClick={() => handleClick(largeImageURL, tags)}>
      <img src={webformatURL} alt={tags} className={s.image} />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  img: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};
