import{a as m,i as p,S as g}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();class u{constructor(){this.search=" ",this.page=1}async fetchPhotos(){try{const e=`https://pixabay.com/api/?key=42494540-1ca0643de0a334de28e64a581&q=${this.search}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=15`,r=await m.get(e);return r.data.hits.length||p.error({timeout:1e3,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),this.page+=1,console.log("Після запиту, якщо все ок:",this),r.data}catch(e){console.error("Error",e)}}}function f(o){return o.hits.map(e=>`<li class="image-search">
        <a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}"/>
        </a>
        <ul class="gallery-image-info">
          <li class="image-items">
            <p class="image-info"><span class="text">Likes</span>${e.likes}</p>
            <p class="image-info"><span class="text">Views</span>${e.views}</p>
            <p class="image-info"><span class="text">Comments</span>${e.comments}</p>
            <p class="image-info"><span class="text">Downloads</span>${e.downloads}</p>
          </li>
        </ul>
      </li>`).join("")}const a=document.querySelector(".searchForm"),c=document.querySelector(".gallery");document.querySelector(".loadMoreBtn");const l=document.querySelector(".loader"),h=new u;console.log(h);h.fetchPhotos();const d=new g(".gallery a",{nav:!0,captions:!0,captionsData:"alt",captionDelay:150});a.addEventListener("submit",o=>{o.preventDefault(),console.log(a.elements.search.value);const e=a.elements.search.value;if(c.innerHTML="",l.style.display="block",e===""){p.error({message:"Будь ласка, введіть пошуковий запит."});return}u(e).then(r=>{console.log(r),c.innerHTML=f(r),d.refresh()}).then(r=>{l.style.display="none"}).catch(r=>{console.error("Error fetching data!",r)}),a.reset()});
//# sourceMappingURL=commonHelpers.js.map
