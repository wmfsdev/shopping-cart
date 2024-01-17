import PropTypes from 'prop-types'

function Error({error}) {
    return (
        <h2>{error.message}</h2>
    )
}

Error.propTypes = {
    error: PropTypes.string,
}

Error.defaultProps = {
    error: "error"
}

export default Error