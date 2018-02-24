import {
    GET_POST_COMMENT,
    GET_POSTS,
    VOTE_POST,
    REMOVE_POST,
    ADD_POST,
    ALTER_POST,
    DELETE_COMMENT,
    VOTE_COMMENT,
    ALTER_COMMENT,
    ADD_COMMENT
} from '../actions/types'

export const posts = (state = {}, action) => {
    const { posts, id, score, post, comments, comment } = action
    let isArray = require('lodash.isarray')

    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts
            }
        case VOTE_POST:
            return {
                ...state,
                posts: state.posts.map((p) => {
                    if (p.id === id) p.voteScore = score;
                    return p
                })
            }

        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== post.id)
            }

        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat(post)
            }


        case GET_POST_COMMENT:
            return {
                ...state,
                posts: state.posts.map((p) => {
                if(!comments){
                    if (p.id === comments.parentId)
                        p = {
                            ...p,
                            comments
                        }

                    return p
                } else {
                    if (p.id === comments[0].parentId)
                        p = {
                            ...p,
                            comments: comments
                        }

                    return p
                }
                })
            }
        case ALTER_POST:
            return {
                ...state,
                posts: state.posts.map((p) => {
                    if (p.id === post.id)
                        p = post

                    return p
                })
            }

        case ALTER_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if(post.id === comment.parentId)
                        post.comments = post.comments.map((c) => {
                            if(c.id === comment.id)
                                c = comment
                            return c
                        })
                    return post
                })
            }

        case DELETE_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if(post.id === comment.parentId){
                        post.comments = post.comments.filter((c) => c.id !== comment.id)
                        post.commentCount = post.commentCount - 1
                    }

                    return post
                })
            }

        case VOTE_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if(post.id === comment.parentId)
                        post.comments = post.comments.map((c) => {
                        if(c.id === comment.id)
                            c.voteScore = score

                            return c
                        })
                    return post
                })
            }

        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if(post.id === comment.parentId){

                        (isArray(post.comments))
                        ? post.comments.concat(comment)
                        : post.comments = comment


                        post.commentCount = post.commentCount + 1
                    }

                    return post
                })
            }

        default:
            return state
    }
}