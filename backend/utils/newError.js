const newError = (message, status, errors) => {
    const err = new Error()
    err.message = message;
    err.status = status;
    err.errors = errors

    return err
}

module.exports = newError
