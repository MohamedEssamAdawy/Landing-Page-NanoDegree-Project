/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const bodyElement = document.querySelector('body');
const allSections = document.getElementsByTagName('section');
const navBarList = document.getElementById('navbar__list');

let activeSection = 'section1';
let isScrolling;
let nearTop = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
let isInViewPort = function (element) {
    let sectionNum = element.getAttribute('id').slice(-1);
    const rect = element.getBoundingClientRect();
    nearTop[sectionNum - 1] = Math.abs(rect.top);
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
let buildNavigationMenu = function () {
    const virtualDom = document.createDocumentFragment();
    for (const section of allSections) {
        const liNavBar = document.createElement('li');
        if (section.getAttribute('class') == 'active') {
            liNavBar.innerHTML = `<a href= #${section.getAttribute('id')} class= 'active'>${section.getAttribute('id')}</a>`;
        } else {
            liNavBar.innerHTML = `<a href= #${section.getAttribute('id')}>${section.getAttribute('id')}</a>`;
        }

        virtualDom.appendChild(liNavBar);
    }
    navBarList.appendChild(virtualDom);
}



// Add class 'active' to section when near top of viewport
let checkSectionInView = function () {
    for (const section of allSections) {
        isInViewPort(section);
        section.removeAttribute('class');
        document.querySelector(`a[href='#${section.getAttribute('id')}']`).removeAttribute('class');
    }
    let inViewSectionNum = nearTop.indexOf(Math.min(...nearTop)) + 1;
    let inViewSectionElement = document.querySelector(`#section${inViewSectionNum}`);
    inViewSectionElement.setAttribute('class', 'active');
    document.querySelector(`a[href='#section${inViewSectionNum}']`).setAttribute('class','active');
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNavigationMenu);
// Scroll to section on link click
navBarList.addEventListener('click',checkSectionInView);
// Set sections as active

window.addEventListener('scroll',checkSectionInView);


