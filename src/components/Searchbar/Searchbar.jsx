import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({onSubmit}) => {
  
  const [inputSearch, setInputSearch] = useState('')

  const handleInputChange = e => {
    setInputSearch( e.currentTarget.value.toLowerCase())
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (inputSearch.trim() === '') {
      return toast.error('please fill in the input field');
    }
    onSubmit(inputSearch);
    setInputSearch('');
  }
  
    return (
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchForm}>
          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputSearch}
            onChange={handleInputChange}
          />
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
            <ImSearch/>
          </button>
        </form>
      </header>
    )

}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Searchbar;