import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {capitalize, timePosted} from "../utils/helper"
import { Card, CardText, CardBody, CardFooter, CardHeader } from 'reactstrap'
import * as FontAwesome from 'react-icons/lib/fa'


const CardPost = (props) => {
    const { post, handleVote, handleRemove, handleAlter, handleView,  handleAddComment } = props

    return (
        (post) &&
        <Card key={post.id}>
            <CardHeader
                className="postList-title"
            >
                <Link
                    className="link-view-post"
                    to=""
                >
                    <FontAwesome.FaPlus
                        className="icon-delete-post"
                        onClick={() => {handleRemove(post)}}
                    />
                </Link>
                {post.title}
                <FontAwesome.FaEdit
                    className="icon-alter-post"
                    onClick={() => {handleAlter(post)}}
                />
            </CardHeader>
            <CardBody>
                <CardText
                    className="postList-body text-left"
                >
                    {post.body}
                    <span className="container-detail-post">
                        <Link
                            to={`/${post.category}/${post.id}`}
                            className="detail-post" >
                            Post Detail
                        </Link>
                    </span>
                </CardText>
            </CardBody>
            <CardFooter className="postList-author">
                Writted by {capitalize(post.author)}, posted { timePosted(post.timestamp)}
                <hr/>
                <FontAwesome.FaHandOUp
                    value="upVote"
                    onClick={ (event) => { handleVote(post.id, event.currentTarget.getAttribute('value'))}}
                    className="hand-score"
                />
                {post.voteScore}
                <FontAwesome.FaHandODown
                    value="downVote"
                    onClick={ (event) => { handleVote(post.id, event.currentTarget.getAttribute('value'))}}
                    className="hand-score"
                />
                <hr/>
                    <FontAwesome.FaEye
                        value="viewPost"
                        className="view-post-icon"
                        onClick={() => {handleView(post)}}
                    />
                <hr/>
                <FontAwesome.FaCommentO
                    className="comment-icon"
                    onClick={() => {handleAddComment(post)}}
                />{post.commentCount}
            </CardFooter>
        </Card>
    )

}
export default CardPost

CardPost.propTypes = {
    posts           : PropTypes.array,
    handleVote      : PropTypes.func.isRequired,
    handleRemove    : PropTypes.func.isRequired,
    handleAlter     : PropTypes.func.isRequired,
    handleView      : PropTypes.func.isRequired,
    handleAddComment: PropTypes.func.isRequired,
}