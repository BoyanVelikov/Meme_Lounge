import { html, render } from '../../node_modules/lit-html/lit-html.js';

const home = () => html`
<section id="welcome">
    <div id="welcome-container">
        <h1>Welcome To Meme Lounge</h1>
        <img src="/images/welcome-meme.jpg" alt="meme">
        <h2>Login to see our memes right away!</h2>
        <div id="button-div">
            <a href="/user/login" class="button">Login</a>
            <a href="/user/register" class="button">Register</a>
        </div>
    </div>
</section>`;

export function homeView (ctx) {
    ctx.navigation();
    render(home(), ctx.refs.main);
}
