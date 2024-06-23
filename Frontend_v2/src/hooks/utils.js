//import all i need
import axios from 'axios'
import { BASE_URL } from '../constants/config'

const addActiveDay = async (userId, dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/activeDay`, {
      userId: userId,
    })
    console.log('Add new active day:', response.message)

    if (response.status === 200) {
      console.log('Active day added:', response.message)
      dispatch({
        type: 'UPDATE_ACTIVE_DAYS',
        payload: new Date().toISOString(),
      })
    } else {
      console.log('Error adding active day:', response.data.message)
    }
  } catch (error) {
    if (error.response) {
      console.log('Error:', error.response.data.message)
    } else {
      console.log('Network error:', error.message)
    }
  }
}

export { addActiveDay }
