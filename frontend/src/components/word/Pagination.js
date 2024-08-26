import React from 'react';
import { useWordContext } from '../../context/WordContext';

const Pagination = () => {
    const { words } = useWordContext();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = React.useState(1);

    const totalPages = Math.ceil(words.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 px-3 py-1 rounded ${
                        currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200'
                    }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
