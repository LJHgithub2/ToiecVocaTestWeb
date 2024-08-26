import React, { useState } from 'react';

const CounterBtn = () => {
    const [count, setCount] = useState(0);

    const decrement = () => {
        if (count > -5) {
            setCount(count - 1);
        }
    };

    const increment = () => {
        if (count < 5) {
            setCount(count + 1);
        }
    };

    return (
        <div className="custom-number-input">
            <label
                htmlFor="custom-input-number"
                className=" text-gray-700 text-xs font-semibold"
            >
                난이도
            </label>
            <div className="flex flex-row h-6 mt-1 rounded-lg relative bg-transparent">
                <button
                    onClick={decrement}
                    className="h-full w-10 cursor-pointer outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mx-auto"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </button>
                <div className="flex justify-center items-center w-6">
                    <p className="relative mb-0 text-xl font-medium before:bg-my-color-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                        {count}
                    </p>
                </div>

                <button
                    onClick={increment}
                    className="h-full w-10 cursor-pointer outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mx-auto"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CounterBtn;
