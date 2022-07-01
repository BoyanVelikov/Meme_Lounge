import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { getData, notify } from '../api/utility.js';
import { errorTemplate } from './notifications.js';

const loginTemplate = (ctx) => html`
<section id="login">
    <form id="login-form" @submit=${e=> onSubmit(e, ctx)}>
        <div class="container">
            <h1>Login</h1>
            <label for="username">Email</label>
            <input id="username" placeholder="Enter Username" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login"/>
            <div class="container signin">
                <p>Dont have an account?<a href="/user/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export const loginView = (ctx) => render(loginTemplate(ctx), ctx.refs.main);

async function onSubmit(e, ctx) {
    try {
        const data = getData(e);
        const user = await login(data);
        sessionStorage.setItem('user', JSON.stringify(user));
        ctx.navigation();
        ctx.page.redirect('/memes');
    } catch (error) {
        render(errorTemplate(error.message), ctx.refs.notifications);
        notify(ctx.refs.notifications.querySelector('.notification'));
    }
}
