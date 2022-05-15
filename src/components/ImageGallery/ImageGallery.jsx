import s from './ImageGallery.module.scss';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { getImagesApi } from 'utils/galleryApi';
import Notiflix from 'notiflix';

import PropTypes from 'prop-types';

export default function ImageGallery({ query, toggleModal }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    if (page === 1) {
      getImages();
    }
    setImages([]);
    setPage(1);
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    if ((query !== '' && page === 1) || (query !== '' && page > 1)) {
      getImages();
    }
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (images.length > 12) {
      window.scrollBy({
        top: window.innerHeight - 140,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [images]);

  const getImages = () => {
    setLoading(true);
    setError(null);

    getImagesApi({ q: query, page: page })
      .then(({ images, totalImages }) => {
        if (!images.length) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setImages(prev => [...prev, ...images]);
        setTotalImages(totalImages);
      })
      .catch(error => setError(Notiflix.Notify.failure(error.message)))
      .finally(() => setLoading(false));
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <ul className={s.Gallery}>
        {images.map(img => (
          <ImageGalleryItem key={img.id} img={img} openModal={toggleModal} />
        ))}
      </ul>
      {images.length > 0 && images.length < totalImages && (
        <Button handleLoadMore={handleLoadMore} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
