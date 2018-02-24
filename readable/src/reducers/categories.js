import {
    GET_CATEGORIES ,
    CATEGORY_SELECTED
} from '../actions/types'


export const categories = (state = {}, action) => {
    const { categories, categorySelected } = action

    switch (action.type){
        case GET_CATEGORIES:
            return {
                ...state,
                categories
            }
        case CATEGORY_SELECTED:
            return {
                ...state,
                categorySelected
            }

        default:
            return state
    }
}
