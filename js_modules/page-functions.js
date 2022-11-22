export let priceLimit = 600;
export let deliveryCost = 300;
export let timeStartWork = 5;
export let timeFinishWork = 24;

export let deliveryCoef = 1;
export let cart = {};
export let cartCounter = 0;
export let mainPrice = 0;

export function mainButton(cartFormBody, timeNow, windowMain, windowMainText) {
  if (timeNow >= timeStartWork && timeNow < timeFinishWork) {
    if (cartCounter > 0) {
      localStorage.clear();
      cart = {};
      cartCounter = 0;
      cartFormBody.submit();
    } else {
      windowMainText.textContent = 'В вашей корзине нет товаров';
      windowMain.classList.remove('window-main_hide');
    }
  } else {
    windowMainText.textContent = `В данный момент наши повара отдыхают, чтобы завтра приготовить для вас вкусную еду. Мы работаем с ${timeStartWork}:00 до ${timeFinishWork}:00`;
    windowMain.classList.remove('window-main_hide');
  }
}

export function addToCart(btn, cartDigitItem, inputCartData, cartDataForm, timeNow, digitMobileItem, windowMain, windowMainText) {
  if (timeNow >= timeStartWork && timeNow < timeFinishWork) {
    cartCounter++
    let carrentItem = +(btn.getAttribute('data-id'));
    if (cart[carrentItem] == undefined) {
      cart[carrentItem] = 1;
    } else {
      cart[carrentItem]++
    }
    showElement(cartDigitItem);
    showElement(digitMobileItem);
    saveData('cart', cart);
    saveData('cartCounter', cartCounter);
    addDelivery();
    saveInput(inputCartData);
    if (cartDataForm) {
      saveCartDataForm(cartDataForm);
    }
  } else {
    windowMainText.textContent = `В данный момент наши повара отдыхают, чтобы завтра приготовить для вас вкусную еду. Мы работаем с ${timeStartWork}:00 до ${timeFinishWork}:00`;
    windowMain.classList.remove('window-main_hide');
  }
};

export function addTopping(btn, cartItems, cartDigitItem, inputCartData, cartDataForm, timeNow, digitMobileItem, windowMain, windowMainText) {
  if (timeNow >= timeStartWork && timeNow < timeFinishWork) {
    let carrentItem = +(btn.getAttribute('data-id'));

    let willCreatedItem = document.querySelector(`#cart-item__${carrentItem}`);
    if (!willCreatedItem) {

      const ordersSubTitle = document.querySelector('.orders__sub-title');
      if (ordersSubTitle) {
        const cartListTotal = document.querySelector('#cart-list__total');
        cartListTotal.classList = 'cart-list__total';
        ordersSubTitle.parentNode.removeChild(ordersSubTitle);
      }


      let contentItem = document.querySelector(`#toppings__sub-title__${carrentItem}`);
      let weightItem = document.querySelector(`#toppings__sub-weight__${carrentItem}`);
      let priceItem = document.querySelector(`#toppings__sub-price__${carrentItem}`);
      let content = contentItem.getAttribute('data-title');
      let weight = weightItem.getAttribute('data-weight');
      let price = priceItem.getAttribute('data-price');

      let toppingItem = document.createElement('div');
      toppingItem.classList = 'cart-list__item';
      toppingItem.setAttribute("data-id", carrentItem);
      toppingItem.id = `cart-item__${carrentItem}`;
      toppingItem.innerHTML = `
    <div class="cart-list__image">
      <img src="../img/food__${carrentItem}.png" onError="this.src='../img/food__empty.jpg'" alt="food__${carrentItem}">
    </div>
    <div class="cart-list__info">

      <a class="cart-list__title"  href="/menu-item/${carrentItem}">
        <h1>${content}</h1>
      </a>
      <h2 class="cart-list__price cart-list__price_item" data-price="${price}" id="cart-price__${carrentItem}">${price} ₽</h2>
      <h4 class="cart-list__weight">${weight} г.</h4>
    </div>
    <div class="cart-list__buttons">
      <button class="cart-list__minus  minus-button" type="button" data-id="${carrentItem}" id="minus-button__${carrentItem}">
        <img class="cart-list__buttons-image" src="../img/minus.png" alt="minus">
      </button>
      <h2 class="cart-list__quantity" data-quantity="1" id="cart-quantity__${carrentItem}">1шт</h2>
      <button class="cart-list__plus  plus-button" type="button" data-id="${carrentItem}" id="plus-button__${carrentItem}">
        <img class="cart-list__buttons-image" src="../img/plus.png" alt="plus">
      </button>
      <button class="cart-list__delete remove-button" type="button" data-id="${carrentItem}" id="remove-button__${carrentItem}">
        <img class="cart-list__buttons-image" src="../img/delete.png" alt="delete">
      </button>
    </div>
      `;
      cartItems.appendChild(toppingItem);

      cartCounter++
      cart[carrentItem] = '1';
      showElement(cartDigitItem);
      showElement(digitMobileItem);
      saveData('cart', cart);
      saveData('cartCounter', cartCounter);
      updateMainPrice();
      addDelivery();
      saveInput(inputCartData);
      if (cartDataForm) {
        saveCartDataForm(cartDataForm);
      }

      let removeButton = document.querySelectorAll(`#remove-button__${carrentItem}`);
      let plusButton = document.querySelectorAll(`#plus-button__${carrentItem}`);
      let minusButton = document.querySelectorAll(`#minus-button__${carrentItem}`);

      removeButton.forEach((btn) => {
        btn.addEventListener('click', () => removeFromCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem));
      });

      plusButton.forEach((btn) => {
        btn.addEventListener('click', () => plusToCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem));
      });

      minusButton.forEach((btn) => {
        btn.addEventListener('click', () => minusFromCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem));
      });
    } else {
      plusToCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem)
    }
  } else {
    windowMainText.textContent = `В данный момент наши повара отдыхают, чтобы завтра приготовить для вас вкусную еду. Мы работаем с ${timeStartWork}:00 до ${timeFinishWork}:00`;
    windowMain.classList.remove('window-main_hide');
  }
}

export function addDelivery() {
  function isEmptyObject(obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }

  let cartItems = document.querySelector('.cart-list__items');
  let cartListItemDelivery = document.querySelector('.cart-list__item_delivery');
  let fullPrice = 0;
  if (localStorage.fullPriceStorage) {
    fullPrice = localStorage.fullPriceStorage;
  }



  if (cartItems && !isEmptyObject(cart)) {
    if (cartListItemDelivery) {
      cartListItemDelivery.remove();
    }

    let price = 0;
    if (+fullPrice < +priceLimit) {
      price = deliveryCost * deliveryCoef;
    } else {
      price = 0;
    }

    let deliveryItem = document.createElement('div');
    let titleType = '';
    if (deliveryCoef == 1) {
      titleType = 'Доставка';
    } else {
      titleType = 'Самовывоз';
    }
    deliveryItem.classList = 'cart-list__item cart-list__item_delivery';
    deliveryItem.innerHTML = `
      <div class="cart-list__image"></div>
      <div class="cart-list__info">
        <div class="cart-list__title">
          <h1 class="receiving-title">${titleType}</h1>
        </div>
        <h2 class="cart-list__price cart-list__price_item cart-list__price_item-delivery">${price} ₽</h2>
        <h4 class="cart-list__weight"></h4>
      </div>
      <div class="cart-list__buttons">

      </div>
    `;
    cartItems.appendChild(deliveryItem);
  } else {
    if (cartListItemDelivery) {
      cartListItemDelivery.remove();
    }
  }
}

export function plusToCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem) {
  if (saveCartDataForm.length > 0) {

  }
  cartCounter++
  let carrentItem = +(btn.getAttribute('data-id'));
  cart[carrentItem]++
  let thisElement = document.querySelector(`#cart-quantity__${carrentItem}`);
  let thisPriceElement = document.querySelector(`#cart-price__${carrentItem}`);
  let carrentPrice = thisPriceElement.getAttribute('data-price');

  let fullPrice = carrentPrice * cart[carrentItem]
  showElement(cartDigitItem);
  showElement(digitMobileItem);
  showCartElement(thisElement, carrentItem);
  showPriceElement(thisPriceElement, fullPrice);
  updateMainPrice();
  addDelivery();
  saveData('cart', cart);
  saveData('cartCounter', cartCounter);
  saveInput(inputCartData);
  if (cartDataForm) {
    saveCartDataForm(cartDataForm);
  }
};

export function minusFromCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem) {
  let carrentItem = +(btn.getAttribute('data-id'));

  if (cart[carrentItem] > 1) {
    cartCounter--
    cart[carrentItem]--
    let thisElement = document.querySelector(`#cart-quantity__${carrentItem}`);
    let thisPriceElement = document.querySelector(`#cart-price__${carrentItem}`);
    let carrentPrice = thisPriceElement.getAttribute('data-price');
    let fullPrice = carrentPrice * cart[carrentItem]
    showElement(cartDigitItem);
    showElement(digitMobileItem);
    showCartElement(thisElement, carrentItem);
    showPriceElement(thisPriceElement, fullPrice);
    updateMainPrice();
    addDelivery();
    saveData('cart', cart);
    saveData('cartCounter', cartCounter);
    saveInput(inputCartData);
    if (cartDataForm) {
      saveCartDataForm(cartDataForm);
    }
  } else {
    removeFromCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem);
    updateMainPrice();
    addDelivery();
    saveData('cart', cart);
    saveData('cartCounter', cartCounter);
    saveInput(inputCartData);
    if (cartDataForm) {
      saveCartDataForm(cartDataForm);
    }
  }
};

export function removeFromCart(btn, cartDigitItem, inputCartData, cartDataForm, digitMobileItem) {
  let carrentItem = btn.getAttribute('data-id');

  let quantity = cart[carrentItem]
  delete cart[carrentItem];
  cartCounter = cartCounter - quantity;

  showElement(cartDigitItem);
  showElement(digitMobileItem);
  let thisElement = document.querySelector(`#cart-item__${carrentItem}`);
  thisElement.parentNode.removeChild(thisElement);
  saveData('cart', cart);
  saveData('cartCounter', cartCounter);
  updateMainPrice();
  addDelivery();
  saveInput(inputCartData);
  if (cartDataForm) {
    saveCartDataForm(cartDataForm);
  }
};

export function showElement(element) {
  if (element) {
    element.textContent = cartCounter;
  }
};

export function scrollFunction(element) {
  var position = element.getBoundingClientRect();
  window.scrollTo(0, (position.top - 79));
};

export function showCartElement(element, carrentItem) {
  if (element && carrentItem) {
    element.textContent = `${cart[carrentItem]}шт`;
  }
};

export function showPriceElement(element, fullPrice) {
  if (element && fullPrice) {
    element.textContent = `${fullPrice} ₽`;
  }
};

export function updateMainPrice() {
  function isEmptyObject(obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }

  let fullPrice = 0;
  let fullPriceStorage = 0;

  if (!isEmptyObject(cart)) {
    for (let key in cart) {
      let thisPriceElement = document.querySelector(`#cart-price__${key}`);
      let carrentPrice = +(thisPriceElement.getAttribute('data-price'));
      let quantityItem = cart[key];
      let fullItemPrice = quantityItem * carrentPrice;
      fullPrice += fullItemPrice;
    }
    fullPriceStorage = fullPrice;
    if (fullPrice < priceLimit) {
      fullPrice += deliveryCost * deliveryCoef
    }
    let fullPriceElement = document.querySelector('.total-price');
    if (fullPriceElement) {
      saveData('fullPriceStorage', fullPriceStorage);
      fullPriceElement.textContent = `${fullPrice} ₽`;
    }

  } else {
    let fullPriceElement = document.querySelector('.total-price');
    if (fullPriceElement) {
      saveData('fullPriceStorage', fullPriceStorage);
      fullPriceElement.textContent = `${fullPrice} ₽`;
    }
  }
}

export function updateMainPriceReload(quantityItems = 0, priceItems = 0) {
  function isEmptyObject(obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }

  let fullPrice = 0;
  let fullPriceStorage = 0;

  if (quantityItems) {
    let priceArray = [];
    let quantityArray = [];

    priceItems.forEach(element => {
      priceArray.push(element.getAttribute('data-price'));
    });
    quantityItems.forEach(element => {
      quantityArray.push(element.getAttribute('data-quantity'));
    });

    for (let i = 0; i < priceArray.length; i++) {
      fullPrice += priceArray[i] * quantityArray[i];
    }

    fullPriceStorage = fullPrice;
    if (fullPrice < priceLimit) {
      fullPrice += deliveryCost;
    }

    let fullPriceElement = document.querySelector('.total-price');
    if (fullPriceElement) {
      saveData('fullPriceStorage', fullPriceStorage);
      fullPriceElement.textContent = `${fullPrice} ₽`;
    }
  } else if (!isEmptyObject(cart)) {
    for (let key in cart) {
      let thisPriceElement = document.querySelector(`#cart-price__${key}`);
      let carrentPrice = +(thisPriceElement.getAttribute('data-price'));
      let quantityItem = cart[key];
      let fullItemPrice = quantityItem * carrentPrice;
      fullPrice += fullItemPrice;
    }
    let fullPriceElement = document.querySelector('.total-price');
    if (fullPriceElement) {
      saveData('fullPriceStorage', fullPriceStorage);
      fullPriceElement.textContent = `${fullPrice} ₽`;
    }

  } else {
    let fullPriceElement = document.querySelector('.total-price');
    if (fullPriceElement) {
      saveData('fullPriceStorage', fullPriceStorage);
      fullPriceElement.textContent = `${fullPrice} ₽`;
    }
  }
}

export function saveData(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
};

export function saveInput(inputCartData) {
  inputCartData.value = localStorage.cart;
};

export function saveCartDataForm(cartDataForm) {
  cartDataForm.value = localStorage.cart;
};

export function loadCart(cartDigitItem, inputCartData, quantityItems = 0, idItems = 0, cartDataForm, digitMobileItem) {
  if (quantityItems.length > 0) {
    let quantity = 0;
    quantityItems.forEach(element => {
      let carrentQuantity = +(element.getAttribute('data-quantity'));
      quantity += carrentQuantity;
    });
    cartCounter = quantity;

    let quantityArray = [];
    let idArray = [];
    let resultObject = {};

    idItems.forEach(element => {
      idArray.push(element.getAttribute('data-id'));
    });
    quantityItems.forEach(element => {
      quantityArray.push(element.getAttribute('data-quantity'));
    });

    for (let i = 0; i < idArray.length; i++) {
      let objKey = idArray[i]
      resultObject[objKey] = quantityArray[i]
    }

    cart = resultObject;

    saveData('cart', cart);
    saveData('cartCounter', cartCounter);
    saveInput(inputCartData);
    showElement(cartDigitItem);
    showElement(digitMobileItem);
    if (cartDataForm) {
      saveCartDataForm(cartDataForm);
    }
  } else if (localStorage.getItem('cartCounter')) {
    cartCounter = JSON.parse(localStorage.getItem('cartCounter'));
    cart = JSON.parse(localStorage.getItem('cart'));
    showElement(cartDigitItem);
    showElement(digitMobileItem);
    saveInput(inputCartData);
    if (cartDataForm) {
      saveCartDataForm(cartDataForm);
    }
  }
}

export function emptyCart() {
  const cartListItems = document.querySelector('.cart-list__items');
  const cartListItem = document.querySelector('.cart-list__item');
  if (cartListItem !== true && cartListItems !== null && cartCounter == 0) {
    const cartListTotal = document.querySelector('#cart-list__total');
    cartListTotal.classList = 'cart-list__total_hide';
    let ordersSubTitle = document.createElement('h1');
    ordersSubTitle.classList = 'orders__sub-title';
    ordersSubTitle.innerHTML = `
      <h2>КОРЗИНА ПУСТА</h2>
    `
    cartListItems.appendChild(ordersSubTitle);
    ;
  }
}

export function enableElement(element, changedElement, relative) {
  if (element.target.checked) {
    changedElement.removeAttribute('disabled')
    relative.classList.remove(`relative-hide`)
  }
}

export function disableElement(element, changedElement, relative) {
  if (element.target.checked) {
    changedElement.setAttribute('disabled', true)
    relative.classList.add(`relative-hide`)
  }
}

export function showList(data, place, cartDigitItem, inputCartData, cartDataForm, timeNow, digitMobileItem, windowMain, windowMainText) {
  removeList('.search-list__item');
  if (data) {
    let jsData = JSON.parse(data);
    let goodsData = jsData[0];
    let groupsData = jsData[1];
    if (goodsData.length > 0) {
      goodsData.forEach(element => {
        let group_name;
        groupsData.forEach(group => {
          if (group['group_id'] == element['group_id']) {
            group_name = group['group_name'];
          }
        });
        let listItem = document.createElement('div');
        listItem.classList = `search-list__item`;
        listItem.setAttribute("data-id", element['product_id']);
        listItem.id = `search-list-item__${element['product_id']}`;
        if (element['group_id'] == '15') {
          listItem.innerHTML = `
            <a class="search-list__name" href="/action-buy/${element['product_id']}">
              <h4>${element['product_name']}</h4>
            </a>
            <h4 class="search-list__price">${element['product_price']} ₽</h4>
            <button type="button" class="search-list__picture search-list__picture_${element['product_id']} buy-button-search_${element['product_id']}">
              <img src="../img/cartWithBird.png" alt="cartWithBird">
            </button>
            <h4 class="search-list__category">${group_name}</h4>
            <h4 class="search-list__weight">${element['product_weight']}г</h4>
          `;
        } else {
          listItem.innerHTML = `
            <a class="search-list__name" href="/menu-item/${element['product_id']}">
              <h4>${element['product_name']}</h4>
            </a>
            <h4 class="search-list__price">${element['product_price']} ₽</h4>
            <button type="button" class="search-list__picture search-list__picture_${element['product_id']} buy-button-search_${element['product_id']}">
              <img src="../img/cartWithBird.png" alt="cartWithBird">
            </button>
            <h4 class="search-list__category">${group_name}</h4>
            <h4 class="search-list__weight">${element['product_weight']}г</h4>
          `;
        }

        place.appendChild(listItem);
        let buyButtonSearch = document.querySelector(`.buy-button-search_${element['product_id']}`);
        buyButtonSearch.addEventListener('click', () => addToCart(listItem, cartDigitItem, inputCartData, cartDataForm, timeNow, digitMobileItem, windowMain, windowMainText));
      });
    }
  }
}

export function removeList(item_name) {
  const searchItems = document.querySelectorAll(`${item_name}`);
  searchItems.forEach(element => {
    element.remove();
  });
}

export function setCoef(value) {
  deliveryCoef = value;
}

export function setPriceLimit(value) {
  if (value) {
    priceLimit = value;
  }
}

export function setDeliveryCost(value) {
  if (value) {
    deliveryCost = +value;
  }
}

export function setTimeStartWork(value) {
  if (value) {
    timeStartWork = value;
  }
}

export function setTimeFinishWork(value) {
  if (value) {
    timeFinishWork = value;
  }
}