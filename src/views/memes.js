import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/data.js';

const meme = ({title,imageUrl,_id}) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${title}</p>
            <img class="meme-image" src=${imageUrl} alt="meme-img">
        </div>
        <div id="data-buttons">
            <a href=${`/details/${_id}`} class="button">Details</a>
        </div>
    </div>
</div>`;
const memes = data => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
    ${data.length > 0 ? data.map(meme) : html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>
`;

export async function memesView (ctx) {
    const data = await getAll();
    render(memes(data), ctx.refs.main);
}

