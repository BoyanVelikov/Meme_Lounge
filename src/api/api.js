async function request(type, url, body, flag) {
    const user = sessionStorage.getItem('user');
    const option = { method: type, headers: { 'Content-Type': 'application/json' } };
    if (user && flag) {
        option.headers['X-Authorization'] = JSON.parse(user).accessToken;
    }
    if (body) { option.body = JSON.stringify(body); }
    let response = null;
    try {
        response = await fetch(url, option);
        if(!response.ok) {
            const {message} = await response.json();
            throw new Error(message);
        }
        return await response.json();
    } catch (error) {
        return error instanceof SyntaxError ? response : (function () { throw new Error(error.message); })();
    }
}

export const api = {
    get: request.bind(null, 'get'),
    post: request.bind(null, 'post'),
    put: request.bind(null, 'put'),
    remove: request.bind(null, 'delete'),
};