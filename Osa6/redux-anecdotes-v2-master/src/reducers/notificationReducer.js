const initialMessage = ''

const notificationReducer = (store= initialMessage, action) => {
  switch (action.type) {
    case 'ERROR': 
      return action.text
    case 'MESSAGE':
      return action.text
    case 'RESET':
      return initialMessage
    default:
      return store 
  }
}

// action creatorit
export const showMessage = (text, sec) => {
  return async (dispatch) => {
    const millisec = sec*1000
    dispatch({
      type: 'MESSAGE',
      text
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, millisec)
  }
}


export const showError = (text, sec) => {
  return async (dispatch) => {
    const millisec = sec*1000
    dispatch({
      type: 'ERROR',
      text
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, millisec)
  }
}



export const reset = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer