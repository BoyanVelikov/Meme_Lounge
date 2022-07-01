import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getMyMemesByUserId } from '../api/data.js';

const profileTemplate = (user, memes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" src="/images/${user.gender}.png" alt="user-profile">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${memes.length > 0 ? memes.map(userMemesTemplate) : html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;

const userMemesTemplate = ({ title, imageUrl, _id }) => html`
<div class="user-meme">
    <p  class="user-meme-title">${title}</p>
    <img class="userProfileImage" src=${imageUrl} alt="meme-img">
    <a href=${`/details/${_id}`} class="button">Details</a>
</div>`;


export async function profileView(ctx) {
    const userAsJson = sessionStorage.getItem('user');
    const user = userAsJson && JSON.parse(userAsJson);
    const memes = await getMyMemesByUserId(user._id);
    render(profileTemplate(user,memes), ctx.refs.main);
}

