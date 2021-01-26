module.exports = (req, res) => {
    if (req.method === 'GET'){
        res.status(200).json({version: process.env.VERSION});
    }else{
        res.status(403).json({status:"ERROR"})
    }
}