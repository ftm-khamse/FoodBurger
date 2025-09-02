const bar = document.getElementById('bar-btn');
const navbar = document.querySelector('.nav');
const shopBtn = document.getElementById('shop-btn');
const shopCart = document.querySelector('.shopping-cart');
const item = navbar.querySelectorAll('a');
const searchBtn = document.getElementById('search-btn');
const search = document.querySelector('.search');

bar.addEventListener('click',(e) => {
    e.preventDefault();
    item.forEach((item ) => item.classList.toggle('active'));
    shopCart.classList.remove('active');
    search.classList.remove('active');
});

shopBtn.addEventListener('click',(e) => {
    e.preventDefault();
    shopCart.classList.toggle('active');
    item.forEach((item ) => item.classList.remove('active'));
     search.classList.remove('active');
});

searchBtn.addEventListener('click',(e) => {
    e.preventDefault();
    search.classList.toggle('active');
    shopCart.classList.remove('active');
    item.forEach((item ) => item.classList.remove('active'));
});

window.onscroll = (e) => {
    e.preventDefault();
    shopCart.classList.remove('active');
    item.forEach((item ) => item.classList.remove('active'));
    search.classList.remove('active');
}

// shopping basket operations
const products = [
    {
        id:1,
        name:'cheese burger',
        price:15.25,
        image:'images/product2.webp'
    },
    {
        id:2,
        name:'cheese burger',
        price:18.75,
        image:'images/product3.webp'
    },
    {
        id:3,
        name:'cheese burger',
        price:25.25,
        image:'images/product4.webp'
    },
    {
        id:4,
        name:'cheese burger',
        price:35.00,
        image:'images/product5.webp'
    },
    {
        id:5,
        name:'cheese burger',
        price:35.85,
        image:'images/product6.webp'
    }
];

function renderProduct() {
    const container = document.querySelector('.menu .product-container');
    products.forEach((item,index)=> {
        const product = document.createElement("div");
        product.classList.add("product");
        product.innerHTML = `
        <img src=${item.image} alt="">
                <div class="icons">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <h3>${item.name}</h3>
                <div class="price">$${item.price}</div>
                <button class="btn-product">add to cart</button>
        `

        container.appendChild(product);
    });
    
}

renderProduct();