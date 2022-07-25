const cart = () => {  // инкапсуляция с помощью функции
    const buttonCart = document.getElementById('cart-button');
    const modalCart = document.querySelector('.modal-cart');
    const close = modalCart.querySelector('.close');

    buttonCart.addEventListener('click', () => {
        modalCart.classList.add('is-open'); // открытие окна через свойство is-open
    });

    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open');
    });
};

cart();