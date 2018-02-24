import * as UtilApi from '../utils/utilsApi'

import {
    GET_CATEGORIES,
    CATEGORY_SELECTED
} from "./types"


export const getCategories = categories => ({
        type: GET_CATEGORIES,
         categories
})

export const getAllCategoriesApi = () => dispatch => (
    UtilApi
        .getAllCategories()
        .then(categories => dispatch(getCategories(categories)))
)

export const categorySelected = (categorySelected) => {
    return {
        type: CATEGORY_SELECTED,
        categorySelected
    }
}
