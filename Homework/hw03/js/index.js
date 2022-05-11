/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */
let currentIndex = 0;
const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
        <li class="card">
            <button class="image" 
                style="background-image:url('${image}')"
                data-index=${idx}"
                aria-label="Displays image ${idx} in the main panel."></button>
        </li>`;
    });
};

initScreen();



const showImage = (ev) => {
    const elem = ev.currentTarget;
    //console.log(elem.style.backgroundImage);
    //console.log(document.querySelector('.featured_image').style.backgroundImage);
    //document.querySelector('.featured_image').style.backgroundImage = elem.style.backgroundImage;
    currentIndex=parseInt(elem.dataset.index);
    display_image();
};

const display_image = () => {
    let image = images[currentIndex];
    document.querySelector('.featured_image').style.backgroundImage = `url('${image}')`;
    console.log("display_image");
    console.log(currentIndex);

}

// const imageElements = document.querySelectorAll('.image');
//     elem.onclick = showImage;
// }



//Hint 2: currentIndex as a global variable:
//let currentIndex = 0;

// create event handler:
//const showImage = (ev) => {
    // const elem = ev.currentTarget;
    //currentIndex = parseInt(elem.dataset.index);
    //console.log("featured_image:", currentIndex);
//};

const showNext = (ev) => {
    currentIndex += 1;
    if (currentIndex >= images.length){currentIndex = 0;};
    display_image();

    //currentIndex = (currentIndex + 1) % length(images);
    //let photo_url = photos [currentIndex];
    //console.log("featured_image:", currentIndex);   
};

const showPrev = (ev) => {
    currentIndex -= 1;
    if (currentIndex < 0){currentIndex = images.length -1;};
    display_image();
};


// attach event handler to all of the image tags 
// (after initScreen() has been invoked).
//const imageElements = document.querySelectorAll('.image');
//for (const elem of imageElements) {
    //elem.onclick = showImage;

const attachEventHandlers = () => {
    const imageElements = document.querySelectorAll('.image');
for (const elem of imageElements) {
    elem.onclick = showImage;
}

document.querySelector('.next').onclick = showNext;
document.querySelector('.prev').onclick = showPrev;
document.querySelector('.featured_image').onclick = showNext;}
attachEventHandlers();


