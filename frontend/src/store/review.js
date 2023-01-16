import { csrfFetch } from './csrf';

const LOAD_SPOT_REVIEWS = 'reviews/loadSpotReviews'
const CREATE_REVIEW = 'reviews/createReview'
const REMOVE_REVIEW = 'reviews/removeReview'


const loadSpotReviews = (reviews) => ({
    type: LOAD_SPOT_REVIEWS,
    reviews
  })

  const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
  })

  const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
  })

  export const loadSpotAllReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
      const reviews = await res.json()
      dispatch(loadSpotReviews(reviews))
    }
  }

  export const addNewReview = (review, sessionUser) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review)
    })
    console.log('thunk payload start:',)

    if (res.ok) {
      const review = await res.json()
      console.log('thunk payload final:', review)
      review.User = sessionUser
      return dispatch(createReview(review))
    }
    return res
  }

  export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      const data = await res.json()
      console.log(data)
      dispatch(removeReview(reviewId))

    }
  }

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {

    case LOAD_SPOT_REVIEWS:
      newState = {}
      action.reviews.forEach(review => {
        newState[review.id] = review
      });
      return newState
    case CREATE_REVIEW:
      newState = { ...state }
      newState[action.review.id] = action.review
      return newState
    case REMOVE_REVIEW:
      newState = {...state}
      delete newState[action.reviewId]
      return newState

    default:
      return state;
  }
};

export default reviewReducer
