import css from './Button.module.css';

export const Button = ({ onLoadMoreBtnClick }) => {
  return (
    <button className={css.Button} type="button" onClick={onLoadMoreBtnClick}>
      Load more
    </button>
  );
};
