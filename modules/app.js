const url = './data/photos.json';
//Create parent element, add class 'gallery-container' and append to body
const parentElement = document.createElement('div');
parentElement.className = 'gallery-container';
document.body.appendChild(parentElement);

//Container for expanded image
const expandedPhotoContainer = document.createElement('div');
expandedPhotoContainer.className = 'expanded-photo-container';
document.body.appendChild(expandedPhotoContainer);

//When user clicks the close button, close expanded view and remove child element
let closePhotoView = () => {
    expandedPhotoContainer.classList.remove('visible');
    let expandedPhoto = document.getElementsByClassName('expanded-photo');
    expandedPhotoContainer.removeChild(expandedPhotoContainer.childNodes[0]);
};

//expandedPhotoContainer.addEventListener("click", closePhotoView, false);

//Create close button for expanded view
const closeBtn = document.createElement("button");
closeBtn.innerHTML = 'Close';
closeBtn.className = 'close-button';
closeBtn.addEventListener("click", closePhotoView, false);

//Fetch data from photos.json
fetch(url)
    .then(response => response.json())
    .then(data => {
        return data.map(function (data) {
            //Create child and add class 'gallery-photo'
            let childElement = document.createElement('div');
            childElement.className = 'gallery-photo';

            //Function for click event listener
            let expandPhotoView = () => {
                //Set photo container visibility
                expandedPhotoContainer.classList.add('visible');
                //Create img element with 'expanded-photo' class
                const expandedImg = document.createElement('img');
                expandedImg.className = 'expanded-photo';
                expandedImg.src = data.urls.regular;
                expandedPhotoContainer.append(expandedImg, closeBtn);
            };

            //Add a click event listener
            childElement.addEventListener("click", expandPhotoView, false);
            parentElement.appendChild(childElement);
            //Create img element
            const img = document.createElement("img");
            //Set image id
            img.id = data.id;
            //Set src to thumbnail url
            img.src = data.urls.thumb;
            //Set alt tag
            img.alt = data.description;
            //If image cannot load, set src attribute to fallback
            img.onerror = () => { 
                img.src = "./images/404.png"; 
                console.log(`Error loading thumbnail:${data.id}`);
            };
            childElement.appendChild(img);
        })
        //If rejected
    }, error => {
        document.body.innerHTML = "Error! Cannot load images!";
    });