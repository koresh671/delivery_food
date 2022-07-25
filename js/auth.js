const auth = () => {
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth'); // модальное окно авторизации
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm'); // форма авторизации
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
const buttonLogin = document.querySelector('.button-login');
const buttonCart = document.querySelector('.button-cart');

const login = (user) => {
    buttonAuth.style.display = 'none';

    buttonOut.style.display = 'flex';
    userName.style.display = 'flex';
    buttonCart.style.display = 'flex';

    userName.textContent = user.login;

    modalAuth.style.display = 'none';
};

const logout = () => {
    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    buttonCart.style.display = 'none';

    buttonAuth.style.display = 'flex';
    userName.textContent = '';

    localStorage.removeItem('user'); // 
};

buttonAuth.addEventListener('click', () => {
    modalAuth.style.display = 'flex';
});

closeAuth.addEventListener('click', () => {
    modalAuth.style.display = 'none';
});

buttonOut.addEventListener('click', () => {
    logout();
});

logInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputLogin.value.length === 0) {
        alert('Введите логин!');
        return;
    }
    const user = {
        login: inputLogin.value,
        password: inputPassword.value
    };
    
    localStorage.setItem('user', JSON.stringify(user)); // хранилище данных в браузере
    
    login(user);
    
});

if (localStorage.getItem('user')) {
    login(JSON.parse(localStorage.getItem('user'))); // при обновлении браузера профиль остается
}
};

auth();

