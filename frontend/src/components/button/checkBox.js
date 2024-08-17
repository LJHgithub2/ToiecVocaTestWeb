export default function CheckBox({ id }) {
    return (
        <>
            <div className="inline-flex items-center">
                <label
                    className="relative flex cursor-pointer items-center rounded-full p-2"
                    htmlFor={id}
                    data-ripple-dark="true"
                >
                    <input
                        id={id}
                        type="checkbox"
                        className="before:content[''] relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacit hover:before:opacity-10 focus:ring-0"
                        style={{ '--tw-ring-shadow': 'none' }}
                    />
                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 stroke-1"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </label>
                <label
                    className="mt-px cursor-pointer text-xs select-none font-light text-gray-700"
                    htmlFor={id}
                >
                    관심 단어
                </label>
            </div>
        </>
    );
}
