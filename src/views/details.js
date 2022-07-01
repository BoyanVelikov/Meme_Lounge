import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';

const detailsTemplate = ({ title, imageUrl, description, _id }, isAuthor,onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${title}</h1>
    <div class="meme-details">
    <div class="meme-img">
        <img src=${imageUrl} alt="meme-alt">
    </div>
    <div  class="meme-description">
        <h2>Meme Description</h2>
        <p>${description}</p>
        ${isAuthor ? html`
        <a href="/edit/${_id}" class="button warning">Edit</a>
        <button @click=${onDelete} class="button danger">Delete</button>`: ''}
    </div>
    </div>
</section>`;

export async function detailsView(ctx) {
    const userAsJson = sessionStorage.getItem('user');
    const user = userAsJson && JSON.parse(userAsJson);
    const { id } = ctx.params;
    const meme = await getById(id);
    render(detailsTemplate(meme, user && user._id === meme._ownerId,onDelete),ctx.refs.main);

    async function onDelete () {
        if(confirm('Are you sure ?')) {
            const respose = await deleteById(id);
            if(respose._deletedOn) {
                ctx.page.redirect('/memes');
            }
        }
    }
}