const fetchUrl = async (method = 'GET', body, endpoint) => {
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    console.log('env =', process.env)
    const resp = await fetch(`https://evening-crag-11346.herokuapp.com/${endpoint}`, requestOptions)
    return resp
}

export default fetchUrl