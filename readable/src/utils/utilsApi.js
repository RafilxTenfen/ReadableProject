const url = 'http://localhost:3001' || process.env.REACT_APP_READABLE_API_URL;

let token = localStorage.token

if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': token,
    'Access-Control-Allow-Origin': 'http://localhost:3001',
}

// Return all the categories
export const getAllCategories = () =>
    fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

// Return all the posts
export const getAllPosts = () =>
    fetch(`${url}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

// Return a post by id
export const getPost = id =>
    fetch(`${url}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);


// Return all the comments of a post
export const getPostComments = (id) =>
    fetch(`${url}/posts/${id}/comments`, { headers })
        .then(res => res.json())
        .then(data => data);


export const votePost = (id, option) => {
    const post = { id: id, option: option};
    return  fetch(`${url}/posts/${id}`, {
                    method: "POST",
                    body: JSON.stringify(post),
                    headers
                  }).then(res => res.json())
              .then(data => data)
}
export const voteComment = (id, option) => {
    const comment = { id: id, option: option};
    return  fetch(`${url}/comments/${id}`, {
                    method: "POST",
                    body: JSON.stringify(comment),
                    headers
                  }).then(res => res.json())
              .then(data => data)
}

export const addNewPost = (post) => {
    return fetch(`${url}/posts`, {
                    method: "POST",
                    body: JSON.stringify(post),
                    headers
                }).then(res => res.json())
        .then(data => data)
}

export const addNewComment = (comment) => {
    return fetch(`${url}/comments`, {
                    method: "POST",
                    body: JSON.stringify(comment),
                    headers
                }).then(res => res.json())
        .then(data => data)
}

export const alterPost = (post) => {
    return fetch(`${url}/posts/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
            headers
           }).then(res => res.json())
        .then(data => data)
}

export const alterComment = (comment) => {
    return fetch(`${url}/comments/${comment.id}`, {
            method: "PUT",
            body: JSON.stringify(comment),
            headers
           }).then(res => res.json())
        .then(data => data)
}

export const deletePostComment = id =>
    fetch(`${url}/comments/${id}`, {
        headers,
        method: 'DELETE'
    })



// Remove a post
export const removePost = id =>
    fetch(`${url}/posts/${id}`, {
        headers,
        method: 'DELETE'
    })
