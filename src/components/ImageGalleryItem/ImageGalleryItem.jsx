import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { showModal } = this.state;
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            className={css.ImageGalleryItemImg}
            src={webformatURL}
            alt={tags}
            onClick={this.toggleModal}
          />
        </li>

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}
