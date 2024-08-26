import React from 'react';
import PropTypes from 'prop-types';

const SelectionCheckbox = ({ isSelected, onChange }) => {
    return (
        // <input
        //     type="checkbox"
        //     checked={isSelected}
        //     onChange={(e) => onChange(e.target.checked)}
        //     className="form-checkbox h-5 w-5 text-blue-600"
        // />

        <div className="flex items-center" data-allow="true">
            <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out"
                onChange={(e) => onChange(e.target.checked)}
                checked={isSelected}
            />
        </div>
    );
};

SelectionCheckbox.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SelectionCheckbox;
