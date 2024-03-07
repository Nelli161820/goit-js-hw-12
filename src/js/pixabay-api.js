import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '42494540-1ca0643de0a334de28e64a581';

export class PixabayAPI {
  constructor(perPage) {
    this.page = 1;
    this.query = null;
    this.perPage = perPage || 15;
    this.lastPage = null;
  }

  async fetchPhotosByQuery() {
    const response = await axios.get('', {
      params: {
        image_type: 'photo',
        orientation: 'horizontal',
        q: this.query,
        page: this.page,
        per_page: this.perPage,
        key: API_KEY,
        safesearch: true,
      },
    });

    if (response.status === 200) {
      this.page++;
      console.log('API Response:', response.data);
      return response.data;
    } else {
      console.error('Error fetching photos:', response.statusText);
      return null;
    }
  }
  
  resetPage() {
    this.page = 1;
  }
}
