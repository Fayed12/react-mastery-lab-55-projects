// prop type
import PropTypes from "prop-types";

function MainInput({ type, name, placeholder, title, register }) {
    return (
        <>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                title={title}
                aria-label={title}
                {...register}
            />
        </>
    );
}

export default MainInput;

MainInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
};
