import { useState } from 'react';
import s from './App.module.scss';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

export default function App() {
  const [query, setQuery] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [tags, setTags] = useState('');

  const changeSearch = query => {
    setQuery(query);
  };

  // console.log(query);

  const toggleModal = (modalImg = null, tags = '') => {
    setIsModal(!isModal);
    setModalImg(modalImg);
    setTags(tags);
  };

  return (
    <div className={s.App}>
      <Searchbar changeSearch={changeSearch} />
      <ImageGallery query={query} toggleModal={toggleModal} />

      {isModal && (
        <Modal modalImg={modalImg} closeModal={toggleModal} tags={tags} />
      )}
    </div>
  );
}
