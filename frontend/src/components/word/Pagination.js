import React from 'react';
import { useWordContext } from '../../context/WordContext';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = () => {
    const { wordCount, currentPage, setCurrentPage } = useWordContext();
    const itemsPerPage = 20;
    const totalPages = Math.ceil(wordCount / itemsPerPage);

    if (totalPages <= 1) return null;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const getPageNumbers = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

        const pages = new Set([1, totalPages, currentPage]);
        if (currentPage > 2) pages.add(currentPage - 1);
        if (currentPage < totalPages - 1) pages.add(currentPage + 1);

        return Array.from(pages).sort((a, b) => a - b);
    };

    const pageNumbers = getPageNumbers();

    const btnBase = 'inline-flex items-center justify-center h-9 w-9 rounded-xl text-sm font-medium transition-all duration-150';
    const btnActive = 'bg-indigo-600 text-white shadow-sm';
    const btnDefault = 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300';
    const btnDisabled = 'opacity-40 cursor-not-allowed bg-white border border-slate-200 text-slate-400';

    return (
        <div className="flex items-center justify-center gap-1.5 mt-6 py-2">
            <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnDefault}`}
                aria-label="첫 페이지"
            >
                <ChevronsLeft size={15} />
            </button>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnDefault}`}
                aria-label="이전 페이지"
            >
                <ChevronLeft size={15} />
            </button>

            <div className="flex items-center gap-1">
                {pageNumbers.map((page, i) => {
                    const prev = pageNumbers[i - 1];
                    const showEllipsis = prev && page - prev > 1;
                    return (
                        <React.Fragment key={page}>
                            {showEllipsis && (
                                <span className="w-8 text-center text-slate-400 text-sm">…</span>
                            )}
                            <button
                                onClick={() => handlePageChange(page)}
                                className={`${btnBase} ${currentPage === page ? btnActive : btnDefault}`}
                            >
                                {page}
                            </button>
                        </React.Fragment>
                    );
                })}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnDefault}`}
                aria-label="다음 페이지"
            >
                <ChevronRight size={15} />
            </button>
            <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnDefault}`}
                aria-label="마지막 페이지"
            >
                <ChevronsRight size={15} />
            </button>
        </div>
    );
};

export default Pagination;
