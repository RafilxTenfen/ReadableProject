import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getAllPostsApi, votePost, removePostApi, addPostApi, getPostCommentApi, alterPostApi} from '../actions/posts'
import { alterCommentApi, deleteCommentApi, voteCommentApi, addCommentApi } from '../actions/comments'
import { FormGroup, Col, ModalFooter, Button, Modal, ModalHeader, Form, Label } from 'reactstrap'
import * as FontAwesome from 'react-icons/lib/fa'
import sortBy from 'sort-by'
import PostList from "./PostList";
import { generateID } from "../utils/helper"
import  swal  from 'sweetalert'
import { capitalize } from '../utils/helper'
import NotFound from "./NotFound"

class PostControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortButton          : '-voteScore',
            modalAddPost        : false,
            modalAlterPost      : false,
            modalViewPost       : false,
            modalAlterComment   : false,
            modalAddComment     : false,
            postModal           : {
                author   : '',
                title    : '',
                body     : '',
                category : '',
                timestamp: 0
            },
            commentModal        : {
                author    : '',
                body      : '',
                timestamp : 0
            },
            parentIdComment     : 0
        }

        this.toggleClose             = this.toggleClose.bind(this);
        this.handleAddNewPost        = this.handleAddNewPost.bind(this);
        this.handleLoadCommentPost   = this.handleLoadCommentPost.bind(this);
        this.handleModalAlterPost    = this.handleModalAlterPost.bind(this);
        this.handleModalViewPost     = this.handleModalViewPost.bind(this);
        this.toggleCloseViewModal    = this.toggleCloseViewModal.bind(this);
        this.removePostComment       = this.removePostComment.bind(this);
        this.handleModalAlterComment = this.handleModalAlterComment.bind(this);
        this.toggleCloseModalComment = this.toggleCloseModalComment.bind(this);
        this.handleModalAddComment   = this.handleModalAddComment.bind(this);
        this.handleAddComment        = this.handleAddComment.bind(this);
        this.toggleCloseModalAddComment = this.toggleCloseModalAddComment.bind(this);
    }

    handleCommentVote = (comment, value) => {
        this.props.votePostComment(comment, value)
    }

    handleVote = (id, value) => {
        this.props.votePosted(id, value)
    }

    componentDidMount() {
        this.props.getPosts()
    }

    handleClickFilter(post, value) {
        this.setState({sortButton: value})
    }

    handleRemovePost = (post) => {
        this.props.removePostId(post)
    }


    handleModalAddPost = () => {
        this.setState({
            modalAddPost: true
        })
    }

    handleModalAlterPost = (post) => {
        this.setState({
            modalAlterPost : true,
            postModal      : post
        })
    }

    handleAddNewPost = (e) => {
        if (!this.inputBody.value || !this.inputCategory.value ||
            !this.inputTitle.value || !this.inputTitle.value ) {
            return
        }

        e.preventDefault()

        const post = {
            id           : generateID(22),
            timestamp    : Date.now(),
            title        : this.inputTitle.value,
            body         : this.inputBody.value,
            author       : this.inputAuthor.value,
            category     : this.inputCategory.value.toLowerCase(),
            voteScore    : 1,
            deleted      : false,
            commentCount : 0
        }
        this.props.addPost(post)
        this.setState({modalAddPost: false})
        swal({
            title: "Good job!",
            text : "Post added!",
            icon : "success"
        })
    }

    toggleClose = () => {
        this.setState({
            modalAddPost: !this.state.modalAddPost
        })
    }

    toggleCloseAlterModal = () => {
        this.setState({
            modalAlterPost: !this.state.modalAlterPost
        })
    }

    sortPost(post, sortField) {
        post = post.sort(sortBy(sortField))
        return post
    }

    getCategoriesPath(categories) {

        let paths = [],
            categoriesArray = categories.categories,
            i
        for (i in categoriesArray){
            paths.push(categoriesArray[i].path)
        }
        return paths
    }

    handleLoadCommentPost(post) {
        this.props.getPostComment(post)
    }

    handleAlterPost(e){
        e.preventDefault()

        if(!this.inputAlterBody || !this.inputAlterTitle){
            return
        }

        if(this.inputAlterTitle.value === this.state.postModal.title &&  this.inputAlterBody.value === this.state.postModal.body) {
            swal({
                title: "Be alert!",
                text : "Your post has no changes!",
                icon : "warning"
            })
        } else {
            const post = {
                ...this.state.postModal,
                title: this.inputAlterTitle.value,
                body : this.inputAlterBody.value
            }
            this.props.alterPostHandle(post)
            swal({
                title: "Good job!",
                text : "Your post is changed!",
                icon : "success"
            })
        }

        this.setState({
            modalAlterPost: !this.state.modalAlterPost
        })

    }

    handleAlterComment(e){
        e.preventDefault()

        if(!this.bodyComment){
            return
        }

        if(this.bodyComment.value === this.state.commentModal.body) {
            swal({
                title: "Be alert!",
                text : "Your Comment has no changes!",
                icon : "warning"
            })
        } else {
            const comment = {
                ...this.state.commentModal,
                timestamp: Date.now(),
                body     : this.bodyComment.value
            }
            this.props.alterComment(comment)
            swal({
                title: "Good job!",
                text : "Your comment is changed!",
                icon : "success"
            })
        }

        this.setState({
            modalAlterComment: !this.state.modalAlterComment
        })

    }

    handleModalViewPost(post){
        this.setState({
            modalViewPost: true,
            postModal    : post
        })
    }


    toggleCloseViewModal(e){
        e.preventDefault()
        this.setState({
            modalViewPost: !this.state.modalViewPost
        })
    }

    toggleCloseAlterModal(e){
        e.preventDefault()
        this.setState({modalAlterComment: !this.state.modalAlterComment})
    }

    removePostComment(comment){
        debugger;
        this.props.removeComment(comment)
    }

    handleModalAlterComment(comment) {
        this.setState({
            modalAlterComment: !this.state.modalAlterComment,
            commentModal     : comment
        })
    }

    handleModalAddComment(post) {
        this.setState({
            modalAddComment: !this.state.modalAddComment,
            parentIdComment: post.id
        })
    }

    toggleCloseModalAddComment(e){
        e.preventDefault()
        this.setState({modalAddComment: false})
    }

    toggleCloseModalComment(e) {
        e.preventDefault()
        this.setState({modalAlterComment: false})
    }

    handleAddComment(e) {
        e.preventDefault()

        if(!this.bodyAddComment.value || !this.authorAddComment.value || !this.postIdAddComment.value){
            return
        }

        const comment = {
            id           : generateID(22),
            timestamp    : Date.now(),
            body         : this.bodyAddComment.value,
            author       : this.authorAddComment.value,
            voteScore    : 1,
            deleted      : false,
            commentCount : 0,
            parentId     : this.postIdAddComment.value
        }

        const post = {id: comment.parentId}
        this.props.addComment(comment)
        this.setState({modalAddComment: false})
        swal({
            title: "Good job!",
            text : "Comment added!",
            icon : "success"
        })

        this.handleLoadCommentPost(post)
    }

    render(){
        let { posts } = this.props.posts;
        let { categories } = this.props
        let categoriesModal  = categories.categories
        let { location } = this.props
        const VOTESCORE = '-voteScore',
              TIMESTAMP = '-timestamp';
        let isArray = require('lodash.isarray')
        let categoriesPath = this.getCategoriesPath(categories)
        let pathNameCategory = location.pathname.replace('/', '')
        let paths = pathNameCategory.split('/')
        let pathId = paths[1]
        let pathCategory = paths[0]


        //check the names of path categories and filter by the current path location in the url
        if(isArray(posts)) {
            let postIds = (posts) && posts.map((p) => p.id)
            posts = this.sortPost(posts, this.state.sortButton)
            if (isArray(categoriesPath)) {
                if (categoriesPath.indexOf(pathNameCategory) !== -1) {
                    posts = posts.filter((p) => p.category === pathNameCategory)
                }
                if(paths.length === 2){
                    if(categoriesPath.indexOf(pathCategory) !== -1 && postIds.indexOf(pathId) !== -1){
                        posts = posts.filter((p) => p.id === pathId)
                    } else {
                        return <NotFound/>
                    }
                }
            }
        }
        return  (
            <div>
                <div className="button-filter">
                    <Button onClick={() => this.handleClickFilter(posts, VOTESCORE)}>
                        {this.state.sortButton === VOTESCORE? <FontAwesome.FaArrowUp/>: false} Score
                    </Button>
                    <hr/>
                    <Button onClick={() => this.handleModalAddPost() } children={ <FontAwesome.FaPlus /> } />
                    <hr/>
                    <Button onClick={() => this.handleClickFilter(posts, TIMESTAMP)}>
                        {this.state.sortButton === TIMESTAMP? <FontAwesome.FaArrowUp />: false} Date
                    </Button>
                </div>
                {(isArray(posts)) && <PostList
                    posts={posts}
                    handleVote={this.handleVote}
                    handleRemove={this.handleRemovePost}
                    loadPostComment={this.handleLoadCommentPost}
                    handleAlter={this.handleModalAlterPost}
                    handleView={this.handleModalViewPost}
                    handleRemoveComment={this.removePostComment}
                    loadAlterModal={this.handleModalAlterComment}
                    handleVoteComment={this.handleCommentVote}
                    handleOpenCommentModal={this.handleModalAddComment}
                />
                }
                <Modal
                    isOpen={this.state.modalAddPost}
                    className="modal-add-post"
                >
                    <ModalHeader toggle={this.toggleClose}> New Post </ModalHeader>
                    <Form>
                        <FormGroup row >
                            <Label for="title" sm={2}>Title</Label>
                            <Col sm={8}>
                                <input
                                    id="title"
                                    minLength="2"
                                    className="form-control"
                                    ref={(input) => this.inputTitle = input}
                                    placeholder="Title of your post"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="author" sm={2}>Author</Label>
                            <Col sm={8}>
                                <input
                                    id="author"
                                    className="form-control"
                                    minLength="2"
                                    ref={(input) => this.inputAuthor = input}
                                    placeholder="Your name"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="category" sm={2}>Category</Label>
                            <Col sm={8}>
                                <select
                                    id="category"
                                    className="custom-select"
                                    ref={(select) => this.inputCategory = select}
                                    defaultValue={(pathCategory)? capitalize(pathCategory): false}>
                                    {(isArray(categoriesModal) && categoriesModal.map((c) => (
                                        <option key={c.path}>{capitalize(c.name)}</option>
                                    )))}
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="body" sm={2}>Body</Label>
                            <Col sm={8}>
                        <textarea
                            id="body"
                            type="input"
                            ref={(textarea) => this.inputBody = textarea}
                            minLength={4}
                            placeholder="Write your post"
                            className="form-control"
                        />
                            </Col>
                        </FormGroup>
                    </Form>
                    <ModalFooter>
                        <Button color="primary" className="submit-modal-add-post" type="submit"
                                onClick={(event) => this.handleAddNewPost(event)}>Submit</Button>
                        <Button color="secondary" onClick={this.toggleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal> {/* Modal Add Post*/}
                <Modal
                    isOpen={this.state.modalAlterPost}
                    className="modal-add-post"
                >
                    <ModalHeader toggle={this.toggleCloseAlterModal}> Alter Post </ModalHeader>
                    <Form>
                        <FormGroup row >
                            <Label for="titleAlter" sm={2}>Title</Label>
                            <Col sm={8}>
                                <input
                                    id="titleAlter"
                                    minLength="2"
                                    className="form-control"
                                    ref={(input) => this.inputAlterTitle = input}
                                    defaultValue={this.state.postModal.title}
                                    placeholder="Title of your post"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="authorAlter" sm={2}>Author</Label>
                            <Col sm={8}>
                                <input
                                    id="authorAlter"
                                    className="form-control"
                                    minLength="2"
                                    disabled
                                    defaultValue={(this.state.postModal.author) && capitalize(this.state.postModal.author)}
                                    placeholder="Your name"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="dateAlter" sm={2}>Posted</Label>
                            <Col sm={8}>
                                <input
                                    id="dateAlter"
                                    className="form-control"
                                    disabled
                                    defaultValue={(this.state.postModal.timestamp) && new Date(this.state.postModal.timestamp)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="categoryAlter" sm={2}>Category</Label>
                            <Col sm={8}>
                                <select
                                    id="categoryAlter"
                                    className="custom-select"
                                    disabled
                                    defaultValue={this.state.postModal.category}
                                >
                                    {(isArray(categoriesModal) && categoriesModal.map((c) => (
                                        <option key={c.path}>{capitalize(c.name)}</option>
                                    )))}
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="body" sm={2}>Body</Label>
                            <Col sm={8}>
                        <textarea
                            id="body"
                            type="input"
                            ref={(textarea) => this.inputAlterBody = textarea}
                            minLength="6"
                            placeholder="Write your post"
                            className="form-control"
                            defaultValue={this.state.postModal.body}
                        />
                            </Col>
                        </FormGroup>
                    </Form>
                    <ModalFooter>
                        <Button color="primary" className="submit-modal-add-post" type="submit"
                                onClick={(event) => this.handleAlterPost(event)}>Submit</Button>
                        <Button color="secondary" onClick={this.toggleCloseAlterModal}>Cancel</Button>
                    </ModalFooter>
                </Modal> {/* Modal Alter Post*/}
                <Modal
                    isOpen={this.state.modalViewPost}
                    className="modal-add-post"
                >
                    <ModalHeader toggle={this.toggleCloseViewModal}> View Post </ModalHeader>
                    <Form>
                        <FormGroup row >
                            <Label for="titleView" sm={2}>Title</Label>
                            <Col sm={8}>
                                <input
                                    id="titleView"
                                    minLength="2"
                                    className="form-control"
                                    disabled
                                    defaultValue={this.state.postModal.title}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="authorView" sm={2}>Author</Label>
                            <Col sm={8}>
                                <input
                                    id="authorView"
                                    className="form-control"
                                    minLength="2"
                                    disabled
                                    defaultValue={(this.state.postModal.author) && capitalize(this.state.postModal.author)}
                                    placeholder="Your name"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="dateView" sm={2}>Posted</Label>
                            <Col sm={8}>
                                <input
                                    id="dateView"
                                    className="form-control"
                                    disabled
                                    defaultValue={(this.state.postModal.timestamp) && new Date(this.state.postModal.timestamp)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="categoryView" sm={2}>Category</Label>
                            <Col sm={8}>
                                <select
                                    id="categoryView"
                                    className="custom-select"
                                    disabled
                                    defaultValue={this.state.postModal.category}
                                >
                                    {(isArray(categoriesModal) && categoriesModal.map((c) => (
                                        <option key={c.path}>{capitalize(c.name)}</option>
                                    )))}
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="body" sm={2}>Body</Label>
                            <Col sm={8}>
                        <textarea
                            id="bodyView"
                            type="input"
                            className="form-control"
                            disabled
                            defaultValue={this.state.postModal.body}
                        />
                            </Col>
                        </FormGroup>
                    </Form>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleCloseViewModal}>Cancel</Button>
                    </ModalFooter>
                </Modal> {/* Modal View Post*/}
                <Modal
                    isOpen={this.state.modalAlterComment}
                    className="modal-add-post"
                >
                    <ModalHeader toggle={this.toggleCloseModalComment}> Alter Comment </ModalHeader>
                    <Form>
                        <FormGroup row >
                            <Label for="AuthorAlterComment" sm={2}>Author</Label>
                            <Col sm={8}>
                                <input
                                    id="AuthorAlterComment"
                                    minLength="2"
                                    className="form-control"
                                    disabled
                                    defaultValue={this.state.commentModal.author}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="dateComment" sm={2}>Posted</Label>
                            <Col sm={8}>
                                <input
                                    id="dateComment"
                                    className="form-control"
                                    disabled
                                    defaultValue={(this.state.commentModal.timestamp) && new Date(this.state.postModal.timestamp)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="bodyComment" sm={2}>Body</Label>
                            <Col sm={8}>
                        <textarea
                            id="bodyComment"
                            type="input"
                            ref={(textarea) => this.bodyComment = textarea}
                            className="form-control"
                            minlength="4"
                            defaultValue={this.state.commentModal.body}
                        />
                            </Col>
                        </FormGroup>
                    </Form>
                    <ModalFooter>
                        <Button color="primary" className="submit-modal-add-post" type="submit"
                                onClick={(event) => this.handleAlterComment(event)}>Submit</Button>
                        <Button color="secondary" onClick={this.toggleCloseModalComment}>Cancel</Button>
                    </ModalFooter>
                </Modal> {/* Modal Alter Comment */}
                <Modal
                    isOpen={this.state.modalAddComment}
                    className="modal-add-post"
                >
                    <ModalHeader toggle={this.toggleCloseModalAddComment}> Add a Comment </ModalHeader>
                    <Form>
                        <FormGroup row >
                            <Label for="PostIdComment" sm={2}>Post Id</Label>
                            <Col sm={8}>
                                <input
                                    id="PostIdComment"
                                    minLength="2"
                                    className="form-control"
                                    disabled
                                    defaultValue={this.state.parentIdComment}
                                    ref={(input) => this.postIdAddComment = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="AuthorAddComment" sm={2}>Author</Label>
                            <Col sm={8}>
                                <input
                                    id="AuthorAddComment"
                                    minLength="2"
                                    className="form-control"
                                    ref={(input) => this.authorAddComment = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row >
                            <Label for="bodyAddComment" sm={2}>Body</Label>
                            <Col sm={8}>
                        <textarea
                            id="bodyAddComment"
                            type="input"
                            ref={(textarea) => this.bodyAddComment = textarea}
                            className="form-control"
                            minLength="4"
                        />
                            </Col>
                        </FormGroup>
                    </Form>
                    <ModalFooter>
                        <Button color="primary" className="submit-modal-add-post" type="submit"
                                onClick={(event) => this.handleAddComment(event)}>Submit</Button>
                        <Button color="secondary" onClick={this.toggleCloseModalAddComment}>Cancel</Button>
                    </ModalFooter>
                </Modal> {/* Modal Add Comment */}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    posts: state.posts,
    categories: state.categories,
    onwProps: ownProps
})

function mapDispatchToProps (dispatch) {
    return {
        getPosts        : () => dispatch(getAllPostsApi()),
        votePosted      : (id, value) => dispatch(votePost(id, value)),
        removePostId    : (post) => dispatch(removePostApi(post)),
        addPost         : (post) => dispatch(addPostApi(post)),
        getPostComment  : (post) => dispatch(getPostCommentApi(post)),
        alterPostHandle : (post) => dispatch(alterPostApi(post)),
        removeComment   : (comment) => dispatch(deleteCommentApi(comment)),
        votePostComment : (comment, value) => dispatch(voteCommentApi(comment, value)),
        alterComment    : (comment) => dispatch(alterCommentApi(comment)),
        addComment      : (comment) => dispatch(addCommentApi(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostControl)