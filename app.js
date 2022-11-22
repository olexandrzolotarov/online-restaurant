import * as flsFunctions from './js_modules/functions.js';
import * as pageFunctions from './js_modules/page-functions.js';

import * as templates from './templates.js';

flsFunctions.isWebp();

const mobileButton = document.querySelector('.interface__mobileBatton');
const mobileMenuButton = document.querySelector('.mobile-menu__image-link');
const searchButton = document.querySelector('.top-search__down');
const cartDigitItem = document.querySelector('.cart__digit-item');
const digitMobileItem = document.querySelector('.digit-mobile-item');
const inputCartData = document.querySelector('.input-cart-data');
const cartDataForm = document.querySelector('.cart-data-form');

const cartItems = document.querySelector('.cart-list__items');
const cartFormBody = document.querySelector('.cart-form__body');

const cartFormFullName = document.querySelector('.cart-form__full-name');
const cartFormAddress = document.querySelector('.cart-form__address');
const cartFormStreet = document.querySelector('.cart-form__street');
const cartFormHouse = document.querySelector('.cart-form__house');
const cartFormApartment = document.querySelector('.cart-form__apartment');
const cartFormEntrance = document.querySelector('.cart-form__entrance');
const cartFormFloor = document.querySelector('.cart-form__floor');
const cartFormIntercom = document.querySelector('.cart-form__intercom');

const cartFormPhone = document.querySelector('.cart-form__phone');
const cartFormEmail = document.querySelector('.cart-form__email');


const buyButtons = document.querySelectorAll('.buy-button');
const buyCartButtons = document.querySelectorAll('.buy-cart-button');
const removeButtons = document.querySelectorAll('.remove-button');
const plusButtons = document.querySelectorAll('.plus-button');
const minusButtons = document.querySelectorAll('.minus-button');


const pickupButton = document.querySelector('.pickup-button');
const deliveryButton = document.querySelector('.delivery-button');
const cartFormAddressRelative = document.querySelector('.cart-form__item_address');
const cartFormStreetRelative = document.querySelector('.cart-form__item_street');
const cartFormHouseRelative = document.querySelector('.cart-form__item_house');
const cartFormApartmentRelative = document.querySelector('.cart-form__item_apartment');
const cartFormEntranceRelative = document.querySelector('.cart-form__item_entrance');
const cartFormFloorRelative = document.querySelector('.cart-form__item_floor');
const cartFormIntercomRelative = document.querySelector('.cart-form__item_intercom');
const checkboxAgree = document.querySelector('.checkbox-agree');
const mainFormButton = document.querySelector('.item-button__button');
const interfaceLogo = document.querySelector('.interface__logo');

const quantityItems = document.querySelectorAll('.cart-list__quantity');
const priceItems = document.querySelectorAll('.cart-list__price_item');
const idItems = document.querySelectorAll('.cart-list__item');

const windowMain = document.querySelector('.window-main');
const windowError = document.querySelector('.window-error');
const windowMainText = document.querySelector('.window-main__text');
const windowCookie = document.querySelector('.window-cookie');
const windowMainButton = document.querySelector('.window-main__button');
const windowCookieButton = document.querySelector('.window-cookie__button');
const windowErrorButton = document.querySelector('.window-error__button');

const searchList = document.querySelector('.search-list__list');
const mobileMenu = document.querySelector('.mobile-menu');
const topSearchInput = document.querySelector('.top-search__input');
const searchPanelInput = document.querySelector('.search-panel__input');
const menuLine = document.querySelector('.menu-line');
const swiperWrapper = document.querySelector('.swiper-wrapper');


const menuLink = document.querySelectorAll('.menu__link');
menuLink.forEach(element => {
  element.addEventListener('click', () => {
    let newId = element.getAttribute('data-id');

    let currentElMob = document.querySelector('.mobile-menu__sub-title_active');
    currentElMob.classList.remove('mobile-menu__sub-title_active');
    let newElMob = document.querySelector(`.mobile-menu__sub-title_${newId}`);
    newElMob.classList.add('mobile-menu__sub-title_active')

    let currentEl = document.querySelector('.menu__link_active');
    currentEl.classList.remove('menu__link_active');
    let newEl = document.querySelector(`.menu__link_${newId}`);
    newEl.classList.add('menu__link_active')

    let sectionItems = document.querySelector('.section-items');
    switch (+newId) {
      case 1:
        sectionItems.innerHTML = templates.firstTemplate;
        break;
      case 2:
        sectionItems.innerHTML = templates.secondTemplate;
        break;
      case 3:
        sectionItems.innerHTML = templates.thirdTemplate;
        break;
      case 4:
        sectionItems.innerHTML = templates.fourthTemplate;
        break;
      case 5:
        sectionItems.innerHTML = templates.fifthTemplate;
        break;
      case 6:
        sectionItems.innerHTML = templates.sixthTemplate;
        break;
      case 7:
        sectionItems.innerHTML = templates.seventhTemplate;
        break;
      case 8:
        sectionItems.innerHTML = templates.eighthTemplate;
        break;
      case 9:
        sectionItems.innerHTML = templates.ninethTemplate;
        break;
      case 10:
        sectionItems.innerHTML = templates.tenthTemplate;
        break;
      case 11:
        sectionItems.innerHTML = templates.eleventhTemplate;
        break;
    }
  })
})

const mobileMenuLink = document.querySelectorAll('.mobile-menu__sub-title');
mobileMenuLink.forEach(element => {
  element.addEventListener('click', () => {
    let newId = element.getAttribute('data-id');

    let currentEl = document.querySelector('.menu__link_active');
    currentEl.classList.remove('menu__link_active');
    let newEl = document.querySelector(`.menu__link_${newId}`);
    newEl.classList.add('menu__link_active')

    let currentElMob = document.querySelector('.mobile-menu__sub-title_active');
    currentElMob.classList.remove('mobile-menu__sub-title_active');
    let newElMob = document.querySelector(`.mobile-menu__sub-title_${newId}`);
    newElMob.classList.add('mobile-menu__sub-title_active')

    let sectionItems = document.querySelector('.section-items');
    switch (+newId) {
      case 1:
        sectionItems.innerHTML = templates.firstTemplate;
        break;
      case 2:
        sectionItems.innerHTML = templates.secondTemplate;
        break;
      case 3:
        sectionItems.innerHTML = templates.thirdTemplate;
        break;
      case 4:
        sectionItems.innerHTML = templates.fourthTemplate;
        break;
      case 5:
        sectionItems.innerHTML = templates.fifthTemplate;
        break;
      case 6:
        sectionItems.innerHTML = templates.sixthTemplate;
        break;
      case 7:
        sectionItems.innerHTML = templates.seventhTemplate;
        break;
      case 8:
        sectionItems.innerHTML = templates.eighthTemplate;
        break;
      case 9:
        sectionItems.innerHTML = templates.ninethTemplate;
        break;
      case 10:
        sectionItems.innerHTML = templates.tenthTemplate;
        break;
      case 11:
        sectionItems.innerHTML = templates.eleventhTemplate;
        break;
    }
  })
})



if (searchButton) { searchButton.addEventListener('click', () => searchList.classList.toggle('search-list__list_active')) };
if (mobileButton) { mobileButton.addEventListener('click', () => mobileMenu.classList.add('mobile-menu_open')) };
if (mobileMenuButton) { mobileMenuButton.addEventListener('click', () => mobileMenu.classList.remove('mobile-menu_open')) };

let timeNow = 0;
let priceLimit = 0;
let deliveryCost = 0;
let timeStartWork = 0;
let timeFinishWork = 0;

if (interfaceLogo) {
  timeNow = interfaceLogo.getAttribute('data-time');
  priceLimit = interfaceLogo.getAttribute('data-price-limit');
  deliveryCost = interfaceLogo.getAttribute('data-delivery-cost');
  timeStartWork = interfaceLogo.getAttribute('data-time-start-work');
  timeFinishWork = interfaceLogo.getAttribute('data-time-finish-work');
}

pageFunctions.setPriceLimit(priceLimit);
pageFunctions.setDeliveryCost(deliveryCost);
pageFunctions.setTimeStartWork(timeStartWork);
pageFunctions.setTimeFinishWork(timeFinishWork);

let cart = 0;


buyButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    cart++;
    cartDigitItem.textContent = cart;
    digitMobileItem.textContent = cart;
  });
});

buyCartButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    pageFunctions.addTopping(btn, cartItems, cartDigitItem, inputCartData, cartDataForm, timeNow, digitMobileItem, windowMain, windowMainText, cartItems);
  });
});

removeButtons.forEach((btn) => {
  btn.addEventListener('click', () => pageFunctions.removeFromCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem, cartItems));
});

plusButtons.forEach((btn) => {
  btn.addEventListener('click', () => pageFunctions.plusToCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem, cartItems));
});

minusButtons.forEach((btn) => {
  btn.addEventListener('click', () => pageFunctions.minusFromCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem, cartItems));
});

if (pickupButton) {
  pageFunctions.addDelivery();
  pageFunctions.updateMainPriceReload(quantityItems, priceItems);
}

if (pickupButton && idItems.length == 0) {
  localStorage.clear();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!swiperWrapper) {
    pageFunctions.scrollFunction(menuLine);
  }
  pageFunctions.loadCart(cartDigitItem, inputCartData, quantityItems, idItems, cartDataForm, digitMobileItem);
  pageFunctions.showElement(cartDigitItem);
  pageFunctions.showElement(digitMobileItem);
  pageFunctions.addDelivery();
  pageFunctions.updateMainPriceReload(quantityItems, priceItems);
  pageFunctions.emptyCart();
});

if (pickupButton && cartFormAddress) {
  pickupButton.addEventListener('change', (e) => {
    pageFunctions.disableElement(e, cartFormStreet, cartFormStreetRelative);
    pageFunctions.disableElement(e, cartFormHouse, cartFormHouseRelative);
    pageFunctions.disableElement(e, cartFormApartment, cartFormApartmentRelative);
    pageFunctions.disableElement(e, cartFormEntrance, cartFormEntranceRelative);
    pageFunctions.disableElement(e, cartFormFloor, cartFormFloorRelative);
    pageFunctions.disableElement(e, cartFormIntercom, cartFormIntercomRelative);
    pageFunctions.setCoef(0);
    pageFunctions.updateMainPrice();
    pageFunctions.addDelivery();
    let receivingTitle = document.querySelector('.receiving-title');
    if (receivingTitle) {
      receivingTitle.textContent = 'Самовывоз';
    }
  })
} else if (pickupButton) {
  pickupButton.addEventListener('change', () => {
    pageFunctions.setCoef(0);
    pageFunctions.updateMainPrice();
    pageFunctions.addDelivery();
    let receivingTitle = document.querySelector('.receiving-title');
    if (receivingTitle) {
      receivingTitle.textContent = 'Самовывоз';
    }
  })
}

if (deliveryButton && cartFormAddress) {
  deliveryButton.addEventListener('change', (e) => {
    pageFunctions.enableElement(e, cartFormStreet, cartFormStreetRelative);
    pageFunctions.enableElement(e, cartFormHouse, cartFormHouseRelative);
    pageFunctions.enableElement(e, cartFormApartment, cartFormApartmentRelative);
    pageFunctions.enableElement(e, cartFormEntrance, cartFormEntranceRelative);
    pageFunctions.enableElement(e, cartFormFloor, cartFormFloorRelative);
    pageFunctions.enableElement(e, cartFormIntercom, cartFormIntercomRelative);
    pageFunctions.setCoef(1);
    pageFunctions.updateMainPrice();
    pageFunctions.addDelivery();
    let receivingTitle = document.querySelector('.receiving-title');
    if (receivingTitle) {
      receivingTitle.textContent = 'Доставка';
    }
  })
} else if (deliveryButton) {
  deliveryButton.addEventListener('change', () => {
    pageFunctions.setCoef(1);
    pageFunctions.updateMainPrice();
    pageFunctions.addDelivery();
    let receivingTitle = document.querySelector('.receiving-title');
    if (receivingTitle) {
      receivingTitle.textContent = 'Доставка';
    }
  })
}

if (checkboxAgree) {
  checkboxAgree.addEventListener('change', () => {
    if (checkboxAgree.checked) {
      mainFormButton.removeAttribute('disabled')
      mainFormButton.classList.remove('item-button__button_hide');
    } else {
      mainFormButton.setAttribute('disabled', true)
      mainFormButton.classList.add('item-button__button_hide');
    }
  })
}

if (mainFormButton && cartFormFullName) {
  mainFormButton.addEventListener('click', () => {
    if (deliveryButton.checked) {
      if (
        // cartFormFullName.value.length > 0 &&
        cartFormStreet.value.length > 0 &&
        cartFormHouse.value.length > 0 &&
        cartFormPhone.value.length > 5
        // &&
        // cartFormEmail.value.length > 5
      ) {
        pageFunctions.mainButton(cartFormBody, timeNow, windowMain, windowMainText);
      } else {
        windowMainText.textContent = 'Заполните все поля';
        windowMain.classList.remove('window-main_hide');
      }
    } else {
      if (
        // cartFormFullName.value.length > 0 &&
        cartFormPhone.value.length > 5
        // &&
        // cartFormEmail.value.length > 5
      ) {
        pageFunctions.mainButton(cartFormBody, timeNow, windowMain, windowMainText);
      } else {
        windowMainText.textContent = 'Заполните все поля';
        windowMain.classList.remove('window-main_hide');
      }
    }
  })
}

if (mainFormButton && !cartFormFullName) {
  mainFormButton.addEventListener('click', () => {
    pageFunctions.mainButton(cartFormBody, timeNow, windowMain, windowMainText);
  })
}

if (topSearchInput) {
  topSearchInput.addEventListener('input', () => {
    let carrentValue = topSearchInput.value;
    function loadList() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          pageFunctions.showList(this.response, searchList, cartDigitItem, inputCartData, cartDataForm, timeNow, digitMobileItem, windowMain, windowMainText)
        }
      };
      xhttp.open("POST", "/search-form", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(`value=${carrentValue}`);
    }
    loadList();
  })
}

if (searchPanelInput) {
  searchPanelInput.addEventListener('input', () => {
    let carrentValue = searchPanelInput.value;
    function loadList() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          pageFunctions.showList(this.response, searchList, cartDigitItem, inputCartData, cartDataForm, timeNow, digitMobileItem, windowMain, windowMainText)
        }
      };
      xhttp.open("POST", "/search-form", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(`value=${carrentValue}`);
    }
    loadList();
  })
}

if (windowMainButton) {
  windowMainButton.addEventListener('click', () => {
    windowMain.classList.add('window-main_hide');
  })
}

if (windowErrorButton) {
  windowErrorButton.addEventListener('click', () => {
    windowError.classList.add('window-error_hide');
  })
}

if (windowCookieButton) {
  windowCookieButton.addEventListener('click', () => {
    function sendCookieRequest() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          windowCookie.classList.add('window-cookie_hide');
        }
      };
      xhttp.open("POST", "/cookie-form", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(`value=true`);
    }
    sendCookieRequest();
  })
}

window.addEventListener('error', function (event) {
  windowMainText.textContent = 'Произошла ошибка, попробуйте перейти на главную страницу и повторить попытку';
  windowMain.classList.remove('window-main_hide');
})













