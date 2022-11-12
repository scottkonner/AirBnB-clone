


const newError = (status, title, message, errors) => {
    const err = new Error()
    err.status = status;
    err.title = title;
    err.message = message;
    err.errors = errors

    return err
}

module.exports
