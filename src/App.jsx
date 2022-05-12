import { Component } from 'react';
import s from './App.module.scss';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    query: '',
    isModal: false,
    modalImg: null,
    tags: '',
  };

  changeSearch = query => {
    this.setState({ query: query });
  };

  toggleModal = (modalImg = null, tags = '') => {
    this.setState(prev => ({ isModal: !prev.isModal, modalImg, tags }));
  };

  render() {
    const { query, isModal, modalImg, tags } = this.state;
    return (
      <div className={s.App}>
        <Searchbar changeSearch={this.changeSearch} />
        <ImageGallery query={query} toggleModal={this.toggleModal} />

        {isModal && (
          <Modal
            modalImg={modalImg}
            closeModal={this.toggleModal}
            tags={tags}
          />
        )}
      </div>
    );
  }
}

export default App;
