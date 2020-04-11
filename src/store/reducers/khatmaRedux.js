import { getKhatmaApi, saveKhatmaApi } from "../../Utils/api"
//
// Action types
//

const RECEIVE_KHATMA = 'RECEIVE_KHATMA'
const SAVE_KHATMA = 'SAVE_KHATMA'
const SAVE_KHATMA_STATUS = 'SAVE_KHATMA_STATUS'
const GET_KHATMA_REQUEST = 'GET_KHATMA_REQUEST'
const SAVE_USER_PICKS = 'SAVE_USER_PICKS'
const SAVE_USER_READS = 'SAVE_USER_READS'
const SAVE_PART_PICKED_BY = 'SAVE_PART_PICKED_BY'



//
// Action creators
//

const getKhatmaRequest = () => {
  return {
    type: GET_KHATMA_REQUEST
  }
}


const receiveKhatma = (khatma) => {

  return {
    type: RECEIVE_KHATMA,
    data: khatma
  }

}

const saveKhatma = (khatma) => {

  return {
    type: SAVE_KHATMA,
    data: khatma
  }

}

export const saveKhatmaStatus = (khatmaId, status) => {

  return {
    type: SAVE_KHATMA_STATUS,
    data: {
      khatmaId,
      status
    }
  }
}

const _saveUserPicks = (userId, khatmaId, picks) => {

  return {
    type: SAVE_USER_PICKS,
    data: {
      userId,
      khatmaId,
      picks
    }
  }
}

const _savePartPickedBy = (userId, khatmaId, partId) => {

  return {
    type: SAVE_PART_PICKED_BY,
    data: {
      userId,
      khatmaId,
      partId
    }
  }
}

export const saveUserPicks = (userId, khatmaId, picks) => {

  return (dispatch) => {

    Object.values(picks).map((partId) => {
      dispatch(_savePartPickedBy(userId, khatmaId, partId))

    })

    dispatch(_saveUserPicks(userId, khatmaId, picks))
  }
}



export const saveUserReads = (userId, khatmaId, reads) => {

  return {
    type: SAVE_USER_READS,
    data: {
      userId,
      khatmaId,
      reads
    }
  }
}

export const ayncReceiveKhatma = () => {
  return (dispatch) => {
    dispatch(getKhatmaRequest())
    return getKhatmaApi()
      .then(({ khatma }) => {
        dispatch(receiveKhatma(khatma))
      })
  }
}

export const ayncSaveKhatma = (date) => {
  return (dispatch) => {
    dispatch(getKhatmaRequest(true))
    return saveKhatmaApi(date)
      .then((khatma) => {
        dispatch(saveKhatma(khatma))
      })
  }
}

//
// Reducer
//

const initState = {
  khatma: [],
  isLoading: false,
}

export const khatmaReducer = (state = initState, action) => {

  console.log(action.type)
  console.log(action.data)
  console.log(state)
  let newState = {}

  switch (action.type) {

    case GET_KHATMA_REQUEST:
      return { ...state, isLoading: true }

    case RECEIVE_KHATMA:
      return { ...state, isLoading: false, khatma: action.data }

    case SAVE_KHATMA:
      return {
        ...state, isLoading: false,
        khatma: { ...state.khatma, [action.data.id]: action.data }
      }

    case SAVE_KHATMA_STATUS:
      newState = {
          ...state, isLoading: false,
          khatma: {
            ...state.khatma,
            [action.data.khatmaId]: {
              ...state.khatma[action.data.khatmaId],
              isOpen: action.data.status
            }
          }
        }
      return newState



    case SAVE_USER_PICKS:

      newState = {
        ...state, isLoading: false,
        khatma: {
          ...state.khatma,
          [action.data.khatmaId]: {
            ...state.khatma[action.data.khatmaId],
            users: {
              ...state.khatma[action.data.khatmaId].users,
              [action.data.userId]: {
                userId: action.data.userId,
                toRead: action.data.picks,
                read: []
              }
            }
          }
        }
      }
      return newState

    case SAVE_PART_PICKED_BY:

      newState = {
        ...state,
        khatma: {
          ...state.khatma,
          [action.data.khatmaId]: {
            ...state.khatma[action.data.khatmaId],
            koranPart: {
              ...state.khatma[action.data.khatmaId].koranPart,
              [action.data.partId]: {
                ...state.khatma[action.data.khatmaId].koranPart[action.data.partId],
                pickedBy: state.khatma[action.data.khatmaId].koranPart[action.data.partId].pickedBy.concat(action.data.userId)
              }
            }
          }
        }
      }
      return newState

    case SAVE_USER_READS:
      newState = {
        ...state, isLoading: false,
        khatma: {
          ...state.khatma,
          [action.data.khatmaId]: {
            ...state.khatma[action.data.khatmaId],
            users: {
              ...state.khatma[action.data.khatmaId].users,
              [action.data.userId]: {
                ...state.khatma[action.data.khatmaId].users[action.data.userId],
                read: action.data.reads
              }
            }
          }
        }
      }
      return newState

    default:
      return state
  }
}