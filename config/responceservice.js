module.exports = {
    sucess: function (req, res) {
        let response = {}
        response.status = 'success';
        req.tokendata ? response.tokendata = req.tokendata : '';
        req.payload ? response.payload = req.payload : '';
        req.msg ? response.msg = req.msg : '';
        return response;
    },
    error: function (req, res) {
        let response = {}
        response.status = 'fail';
        req.msg ? response.msg = req.msg : '';
        return response;
    }
}