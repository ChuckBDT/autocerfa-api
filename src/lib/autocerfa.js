const baseUrl = 'https://www.autocerfa.com'

const getVehicleStock = async token => {
  if (!token) throw new Error('No Autocerfa token provided')
  try {
    const response = await fetch(baseUrl + '/all-post/?action=stock', {
      signal: AbortSignal.timeout(180000),
      headers: { Authorization: token },
    })
    if (!response.ok) {
      if (response.status === 401) {
        const errMessage = await response.json()
        throw new Error(errMessage.data.message)
      } else {
        throw new Error('Response status :' + response.status)
      }
    }

    const result = await response.json()
    return result
  } catch (err) {
    if (err.name === 'TimeoutError') {
      console.error('Timeout: It took more than 180 seconds to get the result!')
    } else if (err.name === 'AbortError') {
      console.error('Fetch aborted by user action')
    } else if (err.name === 'TypeError') {
      console.error('AbortSignal.timeout() method is not supported')
    }
    throw err
  }
}

export default getVehicleStock
