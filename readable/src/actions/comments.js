import * as UtilApi from '../utils/utilsApi'

import {
    DELETE_COMMENT,
    VOTE_COMMENT,
    ALTER_COMMENT,
    ADD_COMMENT
} from "./types"

//VOTE SCORE COMMENT
export const voteComment = (comment, score) => ({
    type: VOTE_COMMENT,
    comment,
    score
})

export const voteCommentApi = (comment, option) => (dispatch) => {
    UtilApi
        .voteComment(comment.id, option)
        .then(data => dispatch(voteComment(data, data.voteScore)))
}

//DELETE A COMMENT
export const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
})

export const deleteCommentApi = ( comment ) => (dispatch) => {
    comment.deleted = true
    UtilApi
        .deletePostComment(comment.id)
        .then(dispatch(deleteComment(comment)))
}

//ALTER A COMMENT

export const alterCommentAction = (comment) => ({
    type: ALTER_COMMENT,
    comment
})

export const alterCommentApi = (comment) => dispatch => {
    UtilApi
        .alterComment(comment)
        .then(data => dispatch(alterCommentAction(data)))
}

export const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

export const addCommentApi = (comment) => dispatch => {
    UtilApi
        .addNewComment(comment)
        .then(data => dispatch(addComment(data)))
}