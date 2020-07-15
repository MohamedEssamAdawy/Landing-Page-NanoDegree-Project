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
let timer;
let activeSection = 'section1';
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
let scrollToSection = function(ev){
    event.preventDefault();
    const section = document.querySelector(`#${ev.target.innerHTML}`);
    section.scrollIntoView({behavior : 'smooth'});
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
        const sectionId = section.getAttribute('id');
        const liNavBar = document.createElement('li');
        liNavBar.innerHTML = `<a href= #${sectionId}>${sectionId}</a>`;
        virtualDom.appendChild(liNavBar);
    }
    navBarList.appendChild(virtualDom);
}



// Add class 'active' to section when near top of viewport
let inViewPort = function () {
    let nearTop = [];
    let rect, i;
    i = 0;
    
    // Calaculte top boundry value for each section 
    for (const section of allSections) {
        rect = section.getBoundingClientRect();
        nearTop[i] = Math.abs(rect.top);
        i += 1;
    }
   
    // Delete Class Attribute from the old section
    if(document.querySelector('section.active') != null && document.querySelector('a.active') != null){
        document.querySelector('section.active').removeAttribute('class');
        document.querySelector('a.active').removeAttribute('class');
    }

    // Add Class Attribute to the class near to the top
    let inViewSectionNum = nearTop.indexOf(Math.min(...nearTop));
    let inViewSectionElement = document.querySelectorAll('section')[inViewSectionNum];
    inViewSectionElement.setAttribute('class', 'active');
    document.querySelector(`a[href='#${inViewSectionElement.getAttribute('id')}']`).setAttribute('class', 'active');
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
navBarList.addEventListener('click',scrollToSection);

// Set sections as active
document.addEventListener('scroll', inViewPort);