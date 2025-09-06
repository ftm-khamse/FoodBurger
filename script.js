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
        name:'chicken burger',
        price:18.75,
        image:'images/product3.webp'
    },
    {
        id:3,
        name:'double crispy burger',
        price:25.25,
        image:'images/product4.webp'
    },
    {
        id:4,
        name:'big mac burger',
        price:35.00,
        image:'images/product5.webp'
    },
    {
        id:5,
        name:'crispy chicken sandwich',
        price:35.85,
        image:'images/product6.webp'
    },
    {
        id:6,
        name:'hot wings burger',
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
                                <i class="fas fa-plus"
                                onClick="findIndex(${item.id})"></i>
                                ${item.qty}
                                <i class="fas fa-minus"
                                onClick="removeFromCart(${item.id})"
                                ></i>
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

function findIndex(id){
 
    products.forEach((item)=> {
        if(item.id === id){
          
            addToCart(products.indexOf(item));
           
        }
    });
}

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

function removeFromCart(id){
  let newCardItems =cart.items.reduce((state,item)=>{
    if(item.id === id){
        const newItem = {
            ...item,
            qty:item.qty-1,
            total:(item.qty-1)*item.price
        }
        return [...state,newItem]
    }
    return [...state,item]
  },[])

  const result = newCardItems.filter((item)=>{
    return item.qty >0 ;
  })

  
  

  cart = {
        ...cart,
        items:result
    }

    renderCartItems()
   
}

// search form operations
const searchForm = document.getElementById('search-form');
const searchPlace = document.querySelector('.search-place');
function searchOperations(e){
    const query = e.target.value.toLowerCase();

    if (query === '') {
    searchPlace.classList.remove('active');
    searchPlace.innerHTML = '';
    return;
    }
    searchPlace.innerHTML = '';
    let found = false;

    products.forEach((item)=>{
       
            if(item.name.toLowerCase().includes(query)){
                found = true;
                const resault =document.createElement('p');
                resault.textContent = item.name;
                searchPlace.appendChild(resault);
                
                
            }
    });
    if(found){
        searchPlace.classList.add('active');
    }else{
        searchPlace.classList.remove('active');
    }
    
}

searchForm.addEventListener('input',searchOperations)