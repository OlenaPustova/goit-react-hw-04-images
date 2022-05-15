import s from './Searchbar.module.scss';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { useState } from 'react';
import Notiflix from 'notiflix';

export default function Searchbar({ changeSearch }) {
  const [query, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value.toLowerCase());
  };

  const onSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return Notiflix.Notify.info('Please enter your query in query text box.');
    }
    changeSearch(query);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.form} onSubmit={onSubmit}>
        <button type="submit" className={s.button}>
          <ImSearch />
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  changeSearch: PropTypes.func.isRequired,
};
