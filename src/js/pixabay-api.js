import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


export default class PhotoFetcher {
  constructor() {
    this.search = ' ';
    this.page = 1;
  }

  async fetchPhotos() {
    try {
      const url = `https://pixabay.com/api/?key=42494540-1ca0643de0a334de28e64a581&q=${this.search}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=15`;
      const response = await axios.get(url);

      if (!response.data.hits.length) {
        iziToast.error({
          timeout: 1000,
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }

      this.page += 1;
      console.log('Після запиту, якщо все ок:', this);
      return response.data;
    } catch (error) {
      console.error('Error', error);
    }
  }
}
