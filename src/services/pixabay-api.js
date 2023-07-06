import axios from 'axios';

const API_KEY = '37076691-e6e6e52c23a6009a52c216588';

const pixabayAPI = axios.create({
  baseURL: 'https://pixabay.com',
});

export const fetchImages = async ({ query, page, perPage }) => {
  return pixabayAPI.get('/api/', {
    params: {
      key: API_KEY,
      q: query,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: perPage,
    },
  });
};
