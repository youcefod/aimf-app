import { getKoran } from "../../Utils/api"

//
// Action types
//
const RECEIVE_KORAN = 'RECEIVE_KORAN'


//
// Actions creator
//

const receiveKoran = (koranListe) => {

  return {
    type: RECEIVE_KORAN,
    data: koranListe
  }

}


export const ayncReceiveKoran = () => {
  return (dispatch) => {
    return getKoran()
    .then( ({koran}) => {
      dispatch(receiveKoran(koran))
    })

  }
}


//
// Reducer
//

const initState = {}

export const koranReducer = (state = initState, action) => {

  switch (action.type) {

    case RECEIVE_KORAN:
      return action.data
    default:
      return state
  }

}