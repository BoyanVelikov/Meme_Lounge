import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { getData , notify } from '../api/utility.js';
import { errorTemplate } from './notifications.js';

const registerTemplate = (ctx) => html`
<section id="register">
    <form id="register-form" @submit=${e => onSubmit(e, ctx)}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register"/>
            <div class="container signin">
                <p>Already have an account?<a href="/user/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export const registerView = (ctx) => render(registerTemplate(ctx), ctx.refs.main);

async function onSubmit(e, ctx) {
    try {
        const data = getData(e);
        const user = await register(data);
        sessionStorage.setItem('user',JSON.stringify(user));
        ctx.navigation();
        ctx.page.redirect('/memes');
    } catch (error) {
        render(errorTemplate(error.message), ctx.refs.notifications);
        notify(ctx.refs.notifications.querySelector('.notification'));
    }
}
