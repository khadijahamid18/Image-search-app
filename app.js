const accessKey = "qdSOrdpOoyIJH6niyFzxZ4v8SkMZcUD3R8hKtONte3I";

const input = document.getElementById('myInput');
const form = document.querySelector('form');
const searchRes = document.querySelector('#search');
const showMore = document.getElementById('showMore');

let inputData = "";
let page = 1;

async function searchImage() {
    inputData = input.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);   // this will fetch data from api
    const data = await response.json();   // this will convert data in json format
    const results = data.results;          // this will contain all the data from api

    if (page === 1) {
        searchRes.innerHTML = "";
    }

    results.map((result) => {               // api ka data result mn hy to zayada hy to sai use k liye map krty

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add('searchResult');
        imageWrapper.style.display = 'flex';
        imageWrapper.style.flexDirection = 'column';
        imageWrapper.style.alignItems = 'center';
        // imageWrapper.style.objectFit = 'cover';


        const image = document.createElement('img');
        image.src = result.urls.small;  // small is for thumbnail type images
        image.alt = result.alt_description;
        image.style.width = '90%';
        image.style.heigth = '90%';
        image.style.boxShadow = '0 0 6px rgba(0, 0, 0, 0.5)';


        const imgLink = document.createElement('a');
        imgLink.href = result.links.html;
        imgLink.target = '_blank';
        imgLink.textContent = result.alt_description;
        imgLink.style.textDecoration = 'none';
        imgLink.style.fontFamily = 'Cambria, Cochin, Georgia, Times, Times New Roman, serif';
        imgLink.style.color = '#333';
        imgLink.style.display = 'block';
        imgLink.style.padding = '10px';
        // imgLink.style.textTransform = 'capitalize';


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imgLink);
        searchRes.appendChild(imageWrapper);

    });

    page++;

    if (page > 1) {
        showMore.style.display = "block";
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});

showMore.addEventListener('click', () => {
    searchImage();
});

