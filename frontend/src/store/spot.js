import { csrfFetch } from './csrf';



const LOAD_SPOTS = 'spots/loadSpots'
const LOAD_USER_SPOTS = 'spots/loadUserSpots'
const LOAD_DETAILED_SPOT = 'spots/loadDetailedSpot'
const CREATE_SPOT = 'spots/createSpot'
const EDIT_SPOT = 'spots/editSpot'
const REMOVE_SPOT = 'spots/removeSpot'


const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
})

const loadUSpots = (userSpots) => ({
  type: LOAD_USER_SPOTS,
  userSpots
})

const loadDSpot = (spotId) => ({
  type: LOAD_DETAILED_SPOT,
  spotId
})

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
})

const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId
})

const editSpot = (spot) => ({
  type: EDIT_SPOT,
  spot
})



export const loadAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')
  if (res.ok) {
    const spots = await res.json()
    dispatch(loadSpots(spots))
  }
}

export const loadUserSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current')
  if (res.ok) {
    const spots = await res.json()
    dispatch(loadUSpots(spots))
  }
}

export const loadDetailedSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)
  if (res.ok) {
    const spot = await res.json()
    dispatch(loadDSpot(spot))
  }
}

export const addNewSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spot)
  })

  if (res.ok) {
    const spot = await res.json()
    return dispatch(createSpot(spot))

  }
  return res
}

export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(removeSpot(spotId))
  }
}

export const updateSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    body: JSON.stringify(spot)
  })

  if (res.ok) {
    const spot = await res.json()
    return dispatch(editSpot(spot))
  }
  return res
}



const initialState = {};

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:
      newState = { ...state }
      action.spots.allSpots.forEach(spot => {
        newState[spot.id] = spot
      });
      return newState
    case LOAD_USER_SPOTS:
      newState = {}
      action.userSpots.forEach(spot => {
        newState[spot.id] = spot
      });
      return newState
    case LOAD_DETAILED_SPOT:
      newState = {}
      newState[action.spotId.id] = action.spotId;
      return newState
    case CREATE_SPOT:
      newState = { ...state }
      newState[action.spot.id] = action.spot
      return newState
    case REMOVE_SPOT:
      newState = { ...state }
      delete newState[action.spotId]
      return newState
    case EDIT_SPOT:
      newState = { ...state }
      newState[action.spot.id] = action.spot
      return newState

    default:
      return state;
  }
};

export default spotReducer
