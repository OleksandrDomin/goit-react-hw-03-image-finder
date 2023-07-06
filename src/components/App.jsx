import { Component } from 'react';
import { toast } from 'react-toastify';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'services/pixabay-api';
import css from './App.module.css';

const INITIAL_STATE = {
  images: [],
  query: '',
  page: 1,
  perPage: 12,
  showBtn: false,
  loading: false,
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (query === '') {
      toast.info('Please fill out the search field!');
    }

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { query, page, perPage } = this.state;

    this.setState({ loading: true });

    try {
      const { data } = await fetchImages({ query, page, perPage });

      if (data.totalHits === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        showBtn: page < Math.ceil(data.totalHits / perPage),
      }));
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchFormSubmit = inputValue => {
    this.setState({ ...INITIAL_STATE, query: inputValue.trim() });
  };

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, showBtn, loading } = this.state;

    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery images={images} />
        {loading && <Loader />}
        {showBtn && <Button onLoadMoreBtnClick={this.handleLoadMoreBtnClick} />}
      </div>
    );
  }
}
