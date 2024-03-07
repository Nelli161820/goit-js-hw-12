import{a as y,S as P,i as d}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&p(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function p(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();y.defaults.baseURL="https://pixabay.com/api/";const b="42494540-1ca0643de0a334de28e64a581";class L{constructor(e){this.page=1,this.query=null,this.perPage=e||15,this.lastPage=null}async fetchPhotosByQuery(){const e=await y.get("",{params:{image_type:"photo",orientation:"horizontal",q:this.query,page:this.page,per_page:this.perPage,key:b,safesearch:!0}});return e.status===200?e.data:(console.error("Error fetching photos:",e.statusText),null)}resetPage(){this.page=1}}function B(s){return s.hits.map(e=>`<li class="image-search">
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
      </li>`).join("")}const o=new L,c=document.getElementById("gallery-container"),r=document.getElementById("load-more-btn"),u=document.getElementById("loading-indicator"),g=document.getElementById("search-form"),E=document.getElementById("search-input"),i=document.getElementById("end-of-results-message"),w=new P(".gallery a",{nav:!0,captions:!0,captionsData:"alt",captionDelay:150});i.textContent="We're sorry, but you've reached the end of search results.";i.style.display="none";r.style.display="none";let m=0;o.page;function h(){const s=m*2;window.scrollBy({top:s,behavior:"smooth"}),console.log(h)}async function x(s){s.preventDefault();const e=g.elements.search.value;if(c.innerHTML="",u.style.display="block",o.resetPage(),r.style.display="none",i.style.display="none",o.query=E.value.trim(),e===""){d.error({title:"Error",message:"Please enter a search query."});return}f()}function I(){r.style.display="none"}async function f(){try{const s=await o.fetchPhotosByQuery();s.hits.length===0&&d.error({timeout:1e3,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});const e=Math.ceil(s.totalHits/o.perPage);if(s.totalHits>o.perPage){const n=c.firstElementChild;n&&(m=n.getBoundingClientRect().height),c.innerHTML+=B(s),w.refresh(),h(),r.style.display="block"}e===o.page&&(I(),i.style.display="block")}finally{u.style.display="none"}}g.addEventListener("submit",x);r.addEventListener("click",async()=>{u.style.display="block",o.page+=1,f()});
//# sourceMappingURL=commonHelpers.js.map
