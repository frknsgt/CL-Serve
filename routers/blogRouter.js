const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const blogTransactions = TransactionsFactory.creating('blogTransactions');
const blogValidator = validators.blogValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require('http-status-codes');
let { routerAuthorization } = require('../utils');
routerAuthorization = routerAuthorization['blog'];

router.post('/blog', tokenControl, authControl, blogValidator.insert, async (req, res) => {
    try {
        const result = await blogTransactions.insertAsync(Object.assign(req.body, { UserID: req.decode.UserID }));
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;