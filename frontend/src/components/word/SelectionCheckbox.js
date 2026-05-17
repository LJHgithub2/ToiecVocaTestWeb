import React from 'react';
import PropTypes from 'prop-types';

const SelectionCheckbox = ({ isSelected, onChange }) => {
    return (
        <div className="flex items-center" data-allow="true">
            <label className="relative inline-flex items-center cursor-pointer" data-allow="true">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) => onChange(e.target.checked)}
                    checked={isSelected}
                    data-allow="true"
                />
                <div className={`h-5 w-5 rounded-lg border-2 flex items-center justify-center transition-all duration-150 ${
                    isSelected
                        ? 'bg-indigo-600 border-indigo-600'
                        : 'bg-white border-slate-300 hover:border-indigo-400'
                }`}>
                    {isSelected && (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
            </label>
        </div>
    );
};

SelectionCheckbox.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SelectionCheckbox;
