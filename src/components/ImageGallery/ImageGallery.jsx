import s from './ImageGallery.module.scss';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { Component } from 'react';
import { getImagesApi } from 'utils/galleryApi';
import Notiflix from 'notiflix';

import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    totalImages: 0,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.query !== this.props.query) {
      this.setState({ images: [], page: 1 });
    }
    if (
      prevState.page !== this.state.page ||
      (prevProps.query !== this.props.query && this.state.page === 1)
    ) {
      // if (this.props.query === '') {
      // this.setState({
      // error: new Error(
      // Notiflix.Notify.info('Please enter your query in query text box.')
      // ),
      // });
      // } else {
      this.getImages();
      // }
    }
    if (prevState.images !== this.state.images && prevState.images.length > 0) {
      window.scrollBy({
        top: window.innerHeight - 55,
        left: 0,
        behavior: 'smooth',
      });
      console.log('kjkjkjhkjh');
      // window.scrollTo({
      //   top: snapshot,
      //   behavior: 'smooth',
      // });
    }
  }

  getSnapshotBeforeUpdate() {
    console.log('kjkjkjhkjh');

    const scrollHeight = document.body.scrollHeight;
    return scrollHeight;
  }

  getImages = () => {
    this.setState({ loading: true, error: null });
    getImagesApi({ q: this.props.query, page: this.state.page })
      .then(({ images, totalImages }) => {
        if (!images.length) {
          throw new Error(
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            )
          );
        }
        this.setState(prev => ({
          images: [...prev.images, ...images],
          totalImages,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleLoadMore = e => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images, loading, error, totalImages } = this.state;
    const { toggleModal } = this.props;
    return (
      <>
        {loading && <Loader />}
        <ul className={s.Gallery}>
          {images.map(img => (
            <ImageGalleryItem key={img.id} img={img} openModal={toggleModal} />
          ))}
        </ul>
        {images.length > 0 && images.length < totalImages && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        {error && <>{error.message}</>}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
