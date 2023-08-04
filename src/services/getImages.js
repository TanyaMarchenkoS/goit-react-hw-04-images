import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '37024654-012e7b800920ae1335c1ea0cf';

export const getImages = async (inputSearch, page) => {

  const { data } = await axios({
    params: {
      q: inputSearch,
      page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    }
  })

  return data;
}
