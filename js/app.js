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
const headerElement = document.querySelector('.page__header');
const topButton = document.querySelector('#backTop');
let perviousScroll = 0;
let isScrollingStopped;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/* hideHeader helper function to hide the navigation bar */
let hideHeader = function () {
    headerElement.style.visibility = 'hidden';
}

/* showBackTopButton helper function to detect if page not on the top */
let showBackTopButton = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

/* goToTop is the onclick function for the backTop button */
let goToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/* build the nav */
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

/* Add class 'active' to section when near top of viewport */
let inViewPort = function () {
    let nearTop = [];
    let rect, i;
    i = 0;

    /* Calaculte top boundry value for each section */
    for (const section of allSections) {
        rect = section.getBoundingClientRect();
        nearTop[i] = Math.abs(rect.top);
        i += 1;
    }

    /* Delete Class Attribute from the old section */
    if (document.querySelector('section.active') != null && document.querySelector('a.active') != null) {
        document.querySelector('section.active').classList.remove('active');
        document.querySelector('a.active').classList.remove('active');
    }

    /* Add Class Attribute to the class near to the top */
    let inViewSectionNum = nearTop.indexOf(Math.min(...nearTop));
    let inViewSectionElement = document.querySelectorAll('section')[inViewSectionNum];
    inViewSectionElement.setAttribute('class', 'active');
    document.querySelector(`a[href='#${inViewSectionElement.getAttribute('id')}']`).setAttribute('class', 'active');
}

/* Scroll to anchor ID using scrollTO event */
let scrollToSection = function (ev) {
    ev.preventDefault();
    const section = document.querySelector(`#${ev.target.innerHTML}`);
    section.scrollIntoView({ behavior: 'smooth' });
}

/**
 * End Main Functions
 * Begin Events
 *
*/

/* Build menu */
document.addEventListener('DOMContentLoaded', buildNavigationMenu);

/* Scroll to section on link click */
navBarList.addEventListener('click', scrollToSection);

/* Set sections as active and hide the navigation bar if not scrolling */
document.addEventListener('scroll', function () {
    clearTimeout(isScrollingStopped);
    inViewPort();
    showBackTopButton();
    // Detect Scroll Down;
    let currnetScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currnetScroll > perviousScroll) {
        isScrollingStopped = setTimeout(hideHeader, 100);
    } else {
        headerElement.style.visibility = 'visible';
    }
    perviousScroll = currnetScroll <= 0 ? 0 : currnetScroll;
});