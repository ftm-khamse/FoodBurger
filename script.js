const bar = document.getElementById('bar-btn');
const navbar = document.querySelector('.nav');
const shopBtn = document.getElementById('shop-btn');
const shopCart = document.querySelector('.shopping-cart');
const item = navbar.querySelectorAll('a');
const searchBtn = document.getElementById('search-btn');
const search = document.querySelector('.search');

bar.addEventListener('click',() => {
    
    item.forEach((item ) => item.classList.toggle('active'));
    shopCart.classList.remove('active');
    search.classList.remove('active');
});

shopBtn.addEventListener('click',() => {
    shopCart.classList.toggle('active');
    item.forEach((item ) => item.classList.remove('active'));
     search.classList.remove('active');
});

searchBtn.addEventListener('click',() => {
    search.classList.toggle('active');
    shopCart.classList.remove('active');
    item.forEach((item ) => item.classList.remove('active'));
});

