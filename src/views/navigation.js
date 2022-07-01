import { html } from '../../node_modules/lit-html/lit-html.js';

export const templateNav = user => user ? userTemplate(user.email) : guestTemplate();

const guestTemplate = () => html`
<div class="guest">
    <div class="profile">
        <a href="/user/login">Login</a>
        <a href="/user/register">Register</a>
    </div>
    <a class="active" href="/">Home Page</a>
</div>
<a href="/memes">All Memes</a>
`;
const userTemplate = (email) => html`
<a href="/memes">All Memes</a>
<div class="user">
    <a href="/create">Create Meme</a>
    <div class="profile">
        <span>Welcome, ${email}</span>
        <a href="/user/profile">My Profile</a>
        <a href="/user/logout">Logout</a>
    </div>
</div>`;

