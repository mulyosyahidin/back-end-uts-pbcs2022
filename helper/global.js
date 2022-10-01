const response = (status, data, message = null) => {
    let response = {
        success: status,
        data: data,
    };

    if (message) {
        response.message = message;
    }

    return response;
}

const formatErrorValidation = (errors) => {
    let formattedErrors = {};

    errors.forEach((error) => {
        let errorObject = {};
        errorObject[error.param] = [];

        if (formattedErrors[error.param]) {
            formattedErrors[error.param].push(error.msg);
        }
        else {
            formattedErrors[error.param] = errorObject[error.param];
            formattedErrors[error.param].push(error.msg);
        }
    });

    return formattedErrors;
};

export { response, formatErrorValidation };