
function getUserCodeUrl(){
    let client_id = "Iv1.4efb82c380dbbfe5"
    let redirect_uri = encodeURIComponent("http://localhost")
    let scope = encodeURIComponent("read:user")
    let state = "123abc"
    let url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`
    return url
}

function getUserToken(){
    let client_id = "Iv1.4efb82c380dbbfe5"
    let redirect_uri = encodeURIComponent("http://localhost")
    let client_secret = encodeURIComponent("9ae07be2de7385053a26c20cb2425b970f4330dc")
    let code = ""
    let state = "123abc"
    let url = `https://github.com/login/oauth/authorize?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`
    return url
}



