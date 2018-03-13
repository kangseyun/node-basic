exports.authBasic = async (req, res) => {
    const { email, password } = req.body
    res.send(200, {"token": "asdasdl1j23"})  
}

exports.register = async (req, res) => {
    const { email, password } = req.body
    res.send('Hello World!')
}