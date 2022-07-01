import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getById, updateById } from '../api/data.js';
import { getData, notify } from '../api/utility.js';
import { errorTemplate } from './notifications.js';

const editTemplate = ({ title, description, imageUrl }, onSubmit) => html`
<section id="edit-meme">
    <form id="edit-form" @submit=${onSubmit}}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
            ${description}
            </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme"/>
        </div>
    </form>
</section>`;

export async function editView(ctx) {
    const { id } = ctx.params;
    const meme = await getById(id);
    render(editTemplate(meme, onSubmit), ctx.refs.main);

    async function onSubmit(e) {
        try {
            const data = getData(e);
            await updateById(id, data);
            ctx.page.redirect('/details/' + id);
        } catch (error) {
            render(errorTemplate(error.message), ctx.refs.notifications);
            notify(ctx.refs.notifications.querySelector('.notification'));
        }
    }
}
