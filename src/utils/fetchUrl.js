const fetchUrl = async (method = 'GET', body, endpoint) => {
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    //TODO: deploy and add backend url in env
    const resp = await fetch(`http://localhost:8080/${endpoint}`, requestOptions)
    return resp
}

export default fetchUrl