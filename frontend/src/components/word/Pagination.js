import React from 'react';
import { useWordContext } from '../../context/WordContext';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';

const Pagination = () => {
    const { wordCount, currentPage, setCurrentPage } = useWordContext();
    const itemsPerPage = 20;

    const totalPages = Math.ceil(wordCount / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        const buttons = [];
        const showEllipsis = totalPages > 5;

        if (showEllipsis) {
            buttons.push(renderButton(1));

            if (currentPage > 3) {
                buttons.push(
                    <span key="ellipsis1" className="mx-1">
                        ...
                    </span>
                );
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                buttons.push(renderButton(i));
            }

            if (currentPage < totalPages - 2) {
                buttons.push(
                    <span key="ellipsis2" className="mx-1">
                        ...
                    </span>
                );
            }

            if (totalPages > 1) {
                buttons.push(renderButton(totalPages));
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(renderButton(i));
            }
        }

        return buttons;
    };

    const renderButton = (page) => (
        <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            } transition-colors duration-200`}
        >
            {page}
        </button>
    );

    return (
        <div className="flex justify-center items-center mt-4 space-x-2">
            <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="First page"
            >
                <ChevronsLeft size={16} />
            </button>
            {/* <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Previous page"
            >
                <ChevronLeft size={16} />
            </button> */}

            <div className="flex items-center">{renderPageButtons()}</div>
            {/* 
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Next page"
            >
                <ChevronRight size={16} />
            </button> */}
            <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Last page"
            >
                <ChevronsRight size={16} />
            </button>
        </div>
    );
};

export default Pagination;
