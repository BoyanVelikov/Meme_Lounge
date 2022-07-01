export function getData(e) {
    e.preventDefault();
    const data = [... new FormData(e.target)].reduce((a, [k, v]) => ({ ...a, ...{ [k]: v } }), {});
    if (Object.values(data).some(x => x === '')) { throw new Error('All fields are required!'); }
    return data;
}

export function notify(ref) {
    ref.style.display = 'block';
    setTimeout(() => ref.style.display = 'none', 2000);
}
