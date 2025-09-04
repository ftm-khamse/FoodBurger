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
    },
    {
        id:6,
        name:'cheese burger',
        price:25.95,
        image:'images/product7.webp'
    }
];

function renderProduct() {
    const container = document.querySelector('.menu .product-container');
    products.forEach((item,index)=> {
        const product = document.createElement("div");
        product.classList.add("product");
        product.innerHTML += `
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
        product.querySelector('.btn-product').addEventListener('click',(e)=>{
            e.preventDefault();
            addToCart(index);
            document.querySelector('.shopping-cart').classList.add('active');
        });

        container.appendChild(product);
    });
    
}

renderProduct();

let cart = {
    items:[],
    total:0
}

function renderCartItems(){
    const cartDiv = document.querySelector('.header .shopping-cart .box-container');
    cartDiv.innerHTML = '';
    const totalPriceEl = document.querySelector('.total-container');

    let totalPrice = 0;

    if(cart.items.length === 0){
        cartDiv.innerHTML = 
        '<h2 class="box" style="font-size:1rem">there is nothing !</h2>'
    }

    cart.items.forEach((item) =>{
        const box = document.createElement("div");
        box.classList.add('box');
        totalPrice += item.total;
        box.innerHTML += 
        `
         <img src=${item.image} alt="">
                    <div class="box-content">
                        <div class="box-title">
                            <h3>${item.name}</h3>
                            <p class="star">4.3<i class="fas fa-star"></i></p>
                        </div>
                        <div class="burger-price">
                            <p>$ ${item.price}</p>
                            <p class="quantity">
                                <i class="fas fa-plus"></i>${item.qty}
                                <i class="fas fa-minus"></i>
                            </p>
                        </div>
                    </div>
        `
        cartDiv.appendChild(box);
    });

    totalPriceEl.innerHTML =
     `
     <p>order amount <span>$ ${totalPrice}</span></p>
     <p>fee for bringing<span>$4.00</span></p>
     <p class="total">total payment<span>$ ${totalPrice + 4.00}</span></p>
     `;

}
renderCartItems();

function addToCart(productIndex){
    const product = products[productIndex];

    let existingProduct = false ;

   let newCartItems = cart.items.reduce((state , item) => {
        if (item.id === product.id){
            existingProduct = true ;

            const newItem = {
                ...item,
                qty : item.qty + 1 ,
                total:(item.qty + 1)*item.price
            }

            return [...state,newItem]
        }
        return[...state,item]
    } , [])

    if (!existingProduct){
        newCartItems.push({
            ...product,
            qty:1,
            total:product.price
        })
    }

    
    
    cart = {
        ...cart,
        items:newCartItems
    }

    renderCartItems();
    
    
}
