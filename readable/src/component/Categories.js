import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCategoriesApi} from "../actions/categories"
import { Button } from 'reactstrap'


class Categories extends Component {


    componentDidMount() {
        this.props.getAllCategories()

    }

    render(){

        const { categories } = this.props.categories
        let isArray = require('lodash.isarray')
        let paths = []
        if(isArray(categories))
            paths = categories.map((c) => c.path)

        return(
        <div>
            <header className="App-header">
                <h1 className="App-title">ReadableRafilx Project</h1>
            </header>
            <div className="categories-container">
                <h4>Categories: </h4>
                    <Link className="link-categories" key="all" to={`/`}>
                        <Button
                            outline
                            className="button-categories"
                            color="secondary"
                            active={!paths.some(elem => document.location.href.includes(elem))}
                        >All</Button>
                    </Link>
                { isArray(categories) && categories.map( category => (
                    <Link className="link-categories" key={category.path} to={`/${category.path}`}>
                        <Button

                            outline
                            className="button-categories"
                            color="secondary"
                            active={document.location.href.includes(category.path)}
                        >{category.name}</Button>
                    </Link>

                ))}
            </div>
        </div>)
    }
}


const mapStateToProps = (categories) => ({
    categories: categories.categories
})



function mapDispatchToProps (dispatch) {
    return {
        getAllCategories: () => dispatch(getAllCategoriesApi())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Categories);