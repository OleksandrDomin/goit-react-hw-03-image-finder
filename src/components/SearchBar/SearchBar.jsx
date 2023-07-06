import { Component } from 'react';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    searchValue: '',
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({ searchValue: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const { searchValue } = this.state;
    this.props.onSubmit(searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.SearchFormBtn}>
            <span className="button-label"></span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
