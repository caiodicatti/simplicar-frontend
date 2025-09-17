import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null; // Não mostra se só tem uma página

    // Gera array de páginas para renderizar
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <nav className="pagination-container">
            <ul className="pagination justify-content-end">
                <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)} aria-label="Anterior">
                        &lt;
                    </button>
                </li>
                {pages.map(page => (
                    <li key={page} className={`page-item${page === currentPage ? ' active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
                <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)} aria-label="Próxima">
                        &gt;
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;