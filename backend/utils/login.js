const { Auth } = require('two-step-auth')
let OTP
async function login(emailId) {
    try {
        const res = await Auth(emailId)
        console.log("res =", res);
        if (!res.success) return { error: res.error }
        OTP = res.OTP
        return true
    } catch (error) {
        console.log(error)
    }
}
function verifyOtp(otp) {
    console.log("otp", otp, OTP);
    return otp == OTP
}

module.exports = {
    login,
    verifyOtp
}