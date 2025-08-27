const bar = document.getElementById('bar-btn');
const navbar = document.querySelector('.nav');

bar.addEventListener('click',() => {
    const item = navbar.querySelectorAll('a');
    item.forEach((item ) => item.classList.toggle('active'));
    
});