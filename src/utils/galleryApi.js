import axios from 'axios';

const API_KEY = '27282175-d85a326cf453d8b816a020776';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesApi = ({ q, page }) => {
  axios.defaults.params = {
    q,
    page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };

  return axios
    .get()
    .then(({ data }) => ({ images: data.hits, totalImages: data.totalHits }));
};
