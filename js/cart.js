const cart = () => {  // инкапсуляция с помощью функции
    const buttonCart = document.getElementById('cart-button');
    const modalCart = document.querySelector('.modal-cart');
    const close = modalCart.querySelector('.close');
    const body = modalCart.querySelector('.modal-body'); /// контейнер карточек в корзине
    const buttonSend = modalCart.querySelector('.button-primary');
    const buttonClear = modalCart.querySelector('.clear-cart');

    const resetCart = () => {
        body.innerHTML = '';
        localStorage.removeItem('cart');
        modalCart.classList.remove('is-open');
    };

    buttonClear.addEventListener('click', resetCart);

    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart')); /// получаем массив

        cartArray.map((item) => { /// изменяем count
            if (item.id === id) {
                item.count++;
            }
            
            return item;
        }); 

        localStorage.setItem('cart', JSON.stringify(cartArray)); /// снова записываем
        renderItems(cartArray);
    };

    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'));
        
        cartArray.map((item) => { /// изменяем count
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0; // обработка отрицательного значения
            }
            
            return item;
        }); 

        localStorage.setItem('cart', JSON.stringify(cartArray)); /// снова записываем
        renderItems(cartArray);
    };

    const renderItems = (data) => {
        body.innerHTML = '';

        data.forEach(({ name, price, id, count }) => {
            const cardElem = document.createElement('div');

            cardElem.classList.add('food-row');
           /// карточка в корзине
            cardElem.innerHTML = `
                <span class="food-name">${name}</span>
                    <strong class="food-price">${price} ₽</strong>
                    <div class="food-counter">
                        <button class="counter-button btn-dec" data-index="${id}">-</button>
                        <span class="counter">${count}</span>
                        <button class="counter-button btn-inc" data-index="${id}">+</button>
                    </div>
            `;
        
            body.append(cardElem);

        });
    };

    body.addEventListener('click', (e) => { /// делегирование событий 
        e.preventDefault();

        if (e.target.classList.contains('btn-inc')) {
            incrementCount(e.target.dataset.index);
        } else if (e.target.classList.contains('btn-dec')) {
            decrementCount(e.target.dataset.index);
        }
    });

    buttonSend.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart');

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST', 
            body: cartArray
        })
        .then(response => {
            if (response.ok) {
                resetCart();
            }
        })
        .catch(e => {
            console.error(e);
        })
    });

    buttonCart.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')));
        }

        modalCart.classList.add('is-open'); // открытие окна через свойство is-open
    });

    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open');
    });
};

cart();