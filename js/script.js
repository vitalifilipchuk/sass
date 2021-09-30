//function that places hover element under specific menu item
function hoverMenu() {
    let elementWidth = this.offsetWidth;
    let elementPosition = this.offsetLeft;
    let hoverElement = this.closest('.main-nav').querySelector('.main-nav__hover-element');
    hoverElement.style.width = elementWidth + 'px';
    hoverElement.style.left = elementPosition + 'px'; 
}

//smooth scrolling to block on link click
function scrollToBlock(e) {
    e.preventDefault();
    let attrBlock = document.querySelector(this.getAttribute('href'));
    let pageContentOffset = parseInt(window.getComputedStyle(document.querySelector('.page-content')).getPropertyValue('padding-top'));
    let cordBlock = attrBlock.getBoundingClientRect().top + scrollY - pageContentOffset;
    window.scrollTo({
      top: cordBlock,
      behavior: 'smooth'
    });
  }

function throttle(callback, timelimit) {
    let wait = false;   //cache wait flag via closure              
    return function () {               
        if (!wait) {                   
            callback.call();           
            wait = true;               
            setTimeout(function () {   
                wait = false;          
            }, timelimit);
        }
    }
}

function initMenu() {
    let topMenuItems = document.querySelectorAll('.main-nav .header__menu-item a');
    topMenuItems.forEach(item => {
        //binding hover function to each menu item
        item.addEventListener('mouseover', hoverMenu.bind(item));
        //hiding hover element if user mouse leaves menu
        item.addEventListener('mouseleave', function() {
            let hoverElement = document.querySelector('.main-nav .main-nav__hover-element');
            hoverElement.style.width = "0px";
        });
        item.addEventListener('click', scrollToBlock.bind(item));
    });
}

initMenu();

function isScrolledIntoView(el) {
    let elemTop = el.getBoundingClientRect().top;
    let elemBottom = el.getBoundingClientRect().bottom;
    let isVisible = (elemTop >= 0) && ((elemTop + ((elemBottom - elemTop)/2)) <= window.innerHeight);

    return isVisible;
}

function scrollEventHandler() {
    console.log(12);
    let aboutUsImg = document.querySelector('.about-block .about-block__image');
    if (aboutUsImg) {
        if (isScrolledIntoView(aboutUsImg)) {
            aboutUsImg.classList.add('active');
        }
    }
}

throttledScrollFunc = throttle(scrollEventHandler, 250);

document.addEventListener('scroll', function() {
    throttledScrollFunc();
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    scrollEventHandler();
  });