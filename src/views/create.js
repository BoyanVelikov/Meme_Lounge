import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';
import { getData , notify } from '../api/utility.js';
import { errorTemplate } from './notifications.js';

const create = ctx => html`
<section id="create-meme">
    <form id="create-form" @submit=${e=> onSubmit(e, ctx)}>
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

async function onSubmit(e, ctx) {
    try {
        const data = getData(e);
        await createItem(data);
        ctx.page.redirect('/memes');
    } catch (error) {
        render(errorTemplate(error.message), ctx.refs.notifications);
        notify(ctx.refs.notifications.querySelector('.notification'));
    }
}

export const createView = (ctx) => render(create(ctx), ctx.refs.main);