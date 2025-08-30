const bar = document.getElementById('bar-btn');
const navbar = document.querySelector('.nav');
const shopBtn = document.getElementById('shop-btn');
const shopCart = document.querySelector('.shopping-cart');
const item = navbar.querySelectorAll('a');

bar.addEventListener('click',() => {
    
    item.forEach((item ) => item.classList.toggle('active'));
    shopCart.classList.remove('active');
});

shopBtn.addEventListener('click',() => {
    shopCart.classList.toggle('active');
    item.forEach((item ) => item.classList.remove('active'));
})