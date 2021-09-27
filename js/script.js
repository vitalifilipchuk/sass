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