import React from 'react'
import PropTypes from 'prop-types'
import {capitalize, timePosted} from "../utils/helper"
import { Card, CardText, CardFooter } from 'reactstrap'
import * as FontAwesome from 'react-icons/lib/fa'
import CardPost from './CardPost'


const PostList = (props) => {

   const { posts, handleVote, handleRemove, loadPostComment, handleAlter, handleView,
            handleRemoveComment, loadAlterModal, handleVoteComment, handleOpenCommentModal } = props
   let isArray = require('lodash.isarray')

   return (
        <div className="postList">
           { isArray(posts) && posts.map( post => (
               <div key={post.id}
                    className="fullPost"
               >
                   <CardPost
                        post={post}
                        handleRemove={handleRemove}
                        handleAlter={handleAlter}
                        handleVote={handleVote}
                        handleView={handleView}
                        handleAddComment={handleOpenCommentModal}
                   />
                {
                    ((post.commentCount >= 1) && (typeof post.comments === 'undefined'))
                    ? (loadPostComment(post))
                    : false
                }
                {(isArray(post.comments) && (post.comments.length >= 1)) && <div className="comments"><strong >Comments</strong></div>}
                {isArray(post.comments) && post.comments.map( comment => (
                    < Card
                        key={comment.id}
                        className="commentCard"
                    >
                        <CardText
                            className="commentBody"
                        >
                        <FontAwesome.FaPlus
                            className="icon-delete-post icon-delete-comment"
                            onClick={() => {handleRemoveComment(comment)}}
                        />
                            {comment.body}
                        <FontAwesome.FaEdit
                            className="icon-alter-post icon-alter-comment"
                            onClick={() => {loadAlterModal(comment)}}
                        />
                        </CardText>
                        <CardFooter
                            className="commentFooter"
                        >
                            Writted by {capitalize(comment.author)}, posted { timePosted(comment.timestamp)}
                        <hr/>
                        <FontAwesome.FaHandOUp
                            value="upVote"
                            onClick={ (event) => { handleVoteComment(comment, event.currentTarget.getAttribute('value'))}}
                            className="hand-score"
                        />
                        {comment.voteScore}
                        <FontAwesome.FaHandODown
                            value="downVote"
                            onClick={ (event) => { handleVoteComment(comment, event.currentTarget.getAttribute('value'))}}
                            className="hand-score"
                        />
                        </CardFooter>
                    </Card>
                    ))
                }
               <span className="postDivisor"/>
               </div>
           ))}
        </div>
   )
}
export default PostList

PostList.propTypes = {
    posts                   : PropTypes.array.isRequired,
    handleVote              : PropTypes.func.isRequired,
    handleRemove            : PropTypes.func.isRequired,
    loadPostComment         : PropTypes.func.isRequired,
    handleAlter             : PropTypes.func.isRequired,
    handleView              : PropTypes.func.isRequired,
    handleRemoveComment     : PropTypes.func,
    handleAlterComment      : PropTypes.func,
    loadAlterModal          : PropTypes.func,
    handleOpenCommentModal  : PropTypes.func,
}