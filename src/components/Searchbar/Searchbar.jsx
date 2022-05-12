import s from './Searchbar.module.scss';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { Component } from 'react';
import Notiflix from 'notiflix';

class Searchbar extends Component {
  state = {
    input: '',
  };

  handleChange = e => {
    this.setState({ input: e.target.value.toLowerCase() });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.input.trim() === '') {
      return Notiflix.Notify.info('Please enter your query in query text box.');
    }
    this.props.changeSearch(this.state.input);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.form} onSubmit={this.onSubmit}>
          <button type="submit" className={s.button}>
            <ImSearch />
            <span className={s.label}>Search</span>
          </button>

          <input
            className={s.input}
            value={this.state.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  changeSearch: PropTypes.func.isRequired,
};
