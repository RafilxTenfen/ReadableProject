import * as UtilApi from '../utils/utilsApi'

import {
    GET_POSTS,
    ADD_POST,
    REMOVE_POST,
    VOTE_POST,
    GET_POST_COMMENT,
    ALTER_POST
} from "./types"

export const getPosts = posts => ({
    type: GET_POSTS,
    posts
})

export const getAllPostsApi = () => dispatch => {
    UtilApi
        .getAllPosts()
        .then(posts => dispatch(getPosts(posts)))
}

export const postVote = (id, score) => ({
    type: VOTE_POST,
    id,
    score
})

export const votePost = (id, option) => dispatch => {
    UtilApi
        .votePost(id, option)
        .then(data => dispatch(postVote(id, data.voteScore)))
}

export const removePostAction = (post) => ({
    type: REMOVE_POST,
    post
})
export const removePostApi = (post) => dispatch => {
    UtilApi
        .removePost(post.id)
        .then(dispatch(removePostAction(post)))
}



export const addPostAction = (post) => ({
    type: ADD_POST,
    post
})

export const addPostApi = (post) => dispatch => {
    UtilApi
        .addNewPost(post)
        .then(dispatch(addPostAction(post)))
}

export const getPostCommentAction = (comments) => ({
    type: GET_POST_COMMENT,
    comments
})

export const getPostCommentApi = (post) => dispatch => {
    UtilApi
        .getPostComments(post.id)
        .then(data => dispatch(getPostCommentAction(data)))
}

export const alterPost = (post) => ({
    type: ALTER_POST,
    post
})

export const alterPostApi = (post) => dispatch => {
    UtilApi
        .alterPost(post)
        .then(data => dispatch(alterPost(data)))
}

