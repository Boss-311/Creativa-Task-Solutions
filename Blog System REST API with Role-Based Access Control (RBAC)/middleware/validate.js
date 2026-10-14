const validate = (req, res, next) => {
    const errors = req.validationErrors();
    if (errors) {
        const error = errors[0];
        return res.status(400).json({
            success: false,
            message: error.constraints.email,
        });
    }
    next();
};

module.exports = validate;
