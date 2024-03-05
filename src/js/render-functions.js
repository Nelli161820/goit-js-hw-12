export function createMarkup(data) {
  return data.hits
    .map(
      data =>
        `<li class="image-search">
        <a class="gallery-link" href="${data.largeImageURL}">
        <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"/>
        </a>
        <ul class="gallery-image-info">
          <li class="image-items">
            <p class="image-info"><span class="text">Likes</span>${data.likes}</p>
            <p class="image-info"><span class="text">Views</span>${data.views}</p>
            <p class="image-info"><span class="text">Comments</span>${data.comments}</p>
            <p class="image-info"><span class="text">Downloads</span>${data.downloads}</p>
          </li>
        </ul>
      </li>`
    )
    .join('');
}
