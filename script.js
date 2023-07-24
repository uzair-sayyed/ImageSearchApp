const accessKey = "YL6NQU_P0shIq4yvwc2GdKzj0nciqQul0TVPC600a4g";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
const h3 = document.querySelector("h3");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results

    console.log(results)
    

    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result)=>{

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

    
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    })

    page++;

    if(inputData === ""){
        showMore.style.display = "none";
        h3.style.display = "block";
    }
    else if(page > 1){
        showMore.style.display = "block";
        h3.style.display = "none";
    }
}


formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", ()=>{
    searchImages();
})