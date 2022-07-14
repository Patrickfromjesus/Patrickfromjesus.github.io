const getOl = document.querySelector('.cart__items');
let priceArr = [];
const getTotalSpace = document.querySelector('.total-price');
const getTotalCalc = 0;
const addSection = document.querySelector('.items');
const getBtn = document.querySelector('.empty-cart');
const getRemove = document.querySelector('.list-space');
const getRemoveCart = document.querySelector('.cart-space');

const getSavedCartItemsCopy = () => {
  const valuesStorage = [];
  valuesStorage.push(JSON.parse(localStorage.cartItems));
  valuesStorage.push(JSON.parse(localStorage.totalPrice));
  valuesStorage.push(JSON.parse(localStorage.arrPrice));
  return valuesStorage;
};

const saveTotal = (value) => {
  if (localStorage.totalPrice !== undefined) {
    const add = parseFloat(value);
    localStorage.totalPrice = JSON.stringify(add);
  } else {
    localStorage.setItem('totalPrice', JSON.stringify(parseFloat(value)));
  }
};

const saveArrayPrice = (actArr) => {
  if (localStorage.arrPrice !== undefined) {
    localStorage.arrPrice = JSON.stringify(actArr);
  } else {
    localStorage.setItem('arrPrice', JSON.stringify(actArr));
  }
}

const saveCartItemsCopy = (item) => {
  if (Storage !== undefined) {
    if (localStorage.cartItems !== undefined) {
      const arrStorage = JSON.parse(localStorage.cartItems);
      arrStorage.push(item);
      localStorage.cartItems = JSON.stringify(arrStorage);
    } else {
      localStorage.setItem('cartItems', JSON.stringify([item]));
    }
  }
};

const savePage = (search) => {
  if (Storage !== undefined) {
    if (localStorage.page !== undefined) {
      localStorage.page = search;
    } else {
      localStorage.setItem('page', search);
    }
  }
}

const cartItemClickListener = (target, priceRemove) => {
  getOl.removeChild(target);
  saveCartItemsCopy(getOl.innerHTML);
  const indexRemove = priceArr.indexOf(priceRemove);
  priceArr.splice(indexRemove, 1);
  saveArrayPrice(priceArr);
  doTotal(priceArr);
};

const clearBtn = () => {
  getBtn.addEventListener('click', () => {
    const getLi = document.querySelectorAll('.cart__item');
    getLi.forEach((element) => {
      getOl.removeChild(element);
    });
    priceArr = [];
    saveArrayPrice(priceArr);
    getTotalSpace.innerHTML = '0,00';
    saveCartItemsCopy(getOl.innerHTML);
    saveTotal(0);
  });
};

const modifyPrice = (price) => {
  const value = parseFloat(price).toLocaleString('pt-BR');
  if(value.split(',').length === 1) return `${value},00`
  else if(value.split(',')[1].length === 1) return `${value}0`;
  return value;
}

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

if (localStorage.cartItems !== undefined) {
  const [li, total, valueArr] = getSavedCartItemsCopy();
  priceArr = valueArr;
  getTotalSpace.innerHTML = modifyPrice(total); 
  li.forEach((item) => {
    getOl.innerHTML = item;
  });
  const getLitoClean = document.querySelectorAll('.cart__item');
  const getIcon = document.querySelectorAll('#icon-id');
  getIcon.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      cartItemClickListener(getLitoClean[index], priceArr[index]);
    })
  })
  getBtn.addEventListener('click', clearBtn);
}

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerHTML = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  section.className = 'item';
  const newPrice = modifyPrice(price);
  const priceMessage = `<strong><sub>R$</sub><strong> ${newPrice}`;

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('div', 'salePrice', priceMessage));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const createCartItemElement = ({ sku, name, salePrice, thumbnail }) => {
  const image = createProductImageElement(thumbnail);
  const li = document.createElement('li');
  const PriceBr = modifyPrice(salePrice);
  li.className = 'cart__item';
  li.appendChild(image);
  const span = document.createElement('span');
  const icon = document.createElement('span');
  span.innerText = `${sku}. ${name} - R$${PriceBr}`;
  span.className = 'span-text-cart';
  li.appendChild(span);
  icon.className = 'material-symbols-outlined';
  icon.innerText = 'close'; 
  icon.id = 'icon-id';
  li.appendChild(icon);
  icon.addEventListener('click', () => {
    cartItemClickListener(li, salePrice);
  });
  return li;
};

const doTotal = (price) => {
  const totalPrice = price.reduce((acc, curr) => acc + curr, 0);
  const totalValue = parseFloat(totalPrice.toFixed(2));
  getTotalSpace.innerHTML = modifyPrice(totalPrice);
  saveTotal(totalValue);
};

const addToOl = async () => {
  const getAnotherBtn = document.querySelectorAll('.item__add');
  getAnotherBtn.forEach((btn) => {
    btn.addEventListener('click', async ({ target }) => {
      const { 
        id: sku,
        title: name,
        price: salePrice,
        thumbnail,
      } = await fetchItem(getSkuFromProductItem(target.parentElement));
      getOl.appendChild(createCartItemElement({ sku, name, salePrice, thumbnail }));
      priceArr.push(salePrice);
      saveArrayPrice(priceArr);
      doTotal(priceArr);
      saveCartItemsCopy(getOl.innerHTML);
      clearBtn();
    });
  });
};

const actPage = async() => {
  const getInputSearch = document.querySelector('#input-search');
  const getInputBtnSearch = document.querySelector('#btn-search');
  getInputBtnSearch.addEventListener('click', async() => {
    const getToRemove = document.querySelectorAll('.item');
    getToRemove.forEach((e) => {
      addSection.removeChild(e);
    });
    if(getInputSearch.value !== '') { 
      savePage(getInputSearch.value);
      addToSection(getInputSearch.value);
    }
    else {
      savePage('carro');
      addToSection('carro');
    }
  });
  getInputSearch.addEventListener('keydown', async(key) => {
    if(key.which == 13) {
      const getToRemove = document.querySelectorAll('.item');
      getToRemove.forEach((e) => {
        addSection.removeChild(e);
      });
      if(getInputSearch.value !== '') { 
        savePage(getInputSearch.value);
        addToSection(getInputSearch.value);
      }
      else {
        savePage('carro');
        addToSection('carro');
      }
    }
  });
};
actPage();

const addToSection = async (product) => {
  const { results } = await fetchProducts(product);
  results.forEach((element) => {
    const { id: sku, title: name, thumbnail: image, price } = element;
    addSection.appendChild(createProductItemElement({ sku, name, image, price }));
  });
  await addToOl();
};

if(localStorage.page !== undefined && localStorage.page !== '') {
  addToSection(localStorage.page);  
} else addToSection('carro');

window.onload = () => { };