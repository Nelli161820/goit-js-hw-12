// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { PixabayAPI } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';

const pixabayAPI = new PixabayAPI();
const gallery = document.getElementById('gallery-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const loader = document.getElementById('loading-indicator');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const endMessage = document.getElementById('end-of-results-message');
const lightbox = new SimpleLightbox('.gallery a', {
  nav: true,
  captions: true,
  captionsData: 'alt',
  captionDelay: 150,
});
endMessage.textContent = "We're sorry, but you've reached the end of search results.";
endMessage.style.display = 'none';
loadMoreBtn.style.display = 'none';
let card = 0;



function smoothScrollByCard() {
  const scrollAmount = card * 2;
  window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  console.log(smoothScrollByCard);
}


function showEndMessage() {
  loadMoreBtn.style.display = 'none';
  endMessage.style.display = 'none';
}

async function handleSearchFormSubmit(event) {
  event.preventDefault();
  const search = searchForm.elements.search.value;
  gallery.innerHTML = '';
  loader.style.display = 'block';
  pixabayAPI.resetPage();
  loadMoreBtn.style.display = 'none';
  endMessage.style.display = 'none';
  pixabayAPI.query = searchInput.value.trim();

     if (search === '') {
         iziToast.error({
         title: 'Error',
         message: 'Please enter a search query.',
});
     return;
}
  
  
  async function initialSearchAndDisplayResults() {
       try {
          const data = await searchAndDisplayResults();
               if (data && data.hits.length === 0) {
                   iziToast.error({
                   timeout: 1000,
                   position: 'topRight',
                   message:'Sorry, there are no images matching your search query. Please try again!',
        });
      }
    }
      catch (error) {
          console.error('Error during initial search:', error);
    }
  }
  initialSearchAndDisplayResults();
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}
  
async function searchAndDisplayResults() {
     try {
           const result = await pixabayAPI.fetchPhotosByQuery();
                if (result && result.hits.length > 0) {
                   const firstChild = gallery.firstElementChild;
                       if (firstChild) {
                           card = firstChild.getBoundingClientRect().height;
}
                    gallery.innerHTML += createMarkup(result);
                    lightbox.refresh();
                    smoothScrollByCard();
                            if (result.totalHits <= pixabayAPI.page * pixabayAPI.perPage) {
                                showEndMessage();
                                hideLoadMoreButton();
      }
                }
                else {
                      showEndMessage();
                      hideLoadMoreButton();
    }
     }
     
     finally {
    loader.style.display = 'none';
  }
}

searchForm.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtn.addEventListener('click', async () => {
  loader.style.display = 'block';
  await searchAndDisplayResults();
});