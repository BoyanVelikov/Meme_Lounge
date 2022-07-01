import page from '../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { memesView } from './views/memes.js';
import { createView } from './views/create.js';
import { editView } from './views/edit.js';
import { detailsView } from './views/details.js';
import { profileView } from './views/profile.js';
import { logout } from './api/data.js';

// Navigation -> re-render navigation (2)
import { templateNav } from './views/navigation.js';

const userNav = document.querySelector('nav .user');
const guestNav = document.querySelector('nav .guest');
// Navigation -> display : none/block (1)

const nav = document.querySelector('nav');

const refs = {
    notifications: document.getElementById('notifications'),
    main: document.querySelector('main')
};

nav.addEventListener('click', (e) => {
    if (e.target.href) {
        [...nav.querySelectorAll('a')].map(x => x.classList.remove('active'));
        e.target.classList.add('active');
    }
});

page('/', middleware, homeView);
page('/user/login', middleware, loginView);
page('/user/logout', logoutUser);
page('/user/register', middleware, registerView);
page('/user/profile',middleware, profileView);
page('/memes', middleware, memesView);
page('/create', middleware, createView);
page('/details/:id', middleware, detailsView);
page('/edit/:id', middleware, editView);

navigation();
page.start();


// function navigation() {
//     const userAsJson = sessionStorage.getItem('user');
//     const user = userAsJson && JSON.parse(userAsJson);
//     const info = userNav.querySelector('.profile >span');
//     user != null
//         ? [userNav.style.display = 'block', guestNav.style.display = 'none', info.textContent = `Welcome ${user.email}`]
//         : [userNav.style.display = 'none', guestNav.style.display = 'block', info.textContent = 'Welcome guest'];
// }
// Navigation -> display : none/block (1)

function navigation () {
    const userAsJson = sessionStorage.getItem('user');
    const user = userAsJson && JSON.parse(userAsJson);
    render(templateNav(user),nav);
} 
// Navigation -> re-render navigation (2)

function middleware(ctx, next) {
    ctx.navigation = navigation;
    ctx.refs = refs;
    next();
}

async function logoutUser() {
    await logout();
    sessionStorage.removeItem('user');
    page.redirect('/');
}

