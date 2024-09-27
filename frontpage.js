var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
// let currentSlide = 0;

// const imagesData = [
//     {
//         title: "PRIMALUNA SOUNDS",
//         src: "Produktbilleder/pladespillere/Pro_ject_Debut_III_red_1.jpg"
//     },
//     {
//         title: "Other Audio Device",
//         src: "Produktbilleder/pladespillere/Pro_ject_Debut_3_bl.jpg"
//     },
//     {
//         title: "More Devices",
//         src: "Produktbilleder/pladespillere/Pro_ject_Debut_III_yellow_1.jpg"
//     }
// ];

// function renderSlides() {
//     const slidesContainer = document.querySelector('.slides');
//     const titleContainer = document.getElementById('image-title');
    
//     slidesContainer.innerHTML = imagesData.map((image, index) => `
//         <div class="slide">
//             <img src="${image.src}" alt="${image.title}">
//         </div>
//     `).join('');

//     updateTitle();
// }

// function updateTitle() {
//     const titleContainer = document.getElementById('image-title');
//     titleContainer.innerText = imagesData[currentSlide].title;
// }

// function changeSlide(direction) {
//     currentSlide += direction;

//     if (currentSlide >= imagesData.length) {
//         currentSlide = 0;
//     } else if (currentSlide < 0) {
//         currentSlide = imagesData.length - 1;
//     }

//     const slidesContainer = document.querySelector('.slides');
//     slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

//     updateTitle();
// }

// document.addEventListener('DOMContentLoaded', renderSlides);