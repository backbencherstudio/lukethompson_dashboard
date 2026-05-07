'use client';

import { useState, useCallback, useMemo } from 'react';
import { Review } from '@/lib/api/review.mock';
import { mockReviews } from '@/lib/api/review.mock';
import toast from 'react-hot-toast';

interface UseReviewOptions {
    initialReviews?: Review[];
    itemsPerPage?: number;
}

export const useReview = ({
    initialReviews = mockReviews,
    itemsPerPage = 8,
}: UseReviewOptions = {}) => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const filteredReviews = useMemo(() => {
        if (!searchQuery.trim()) return reviews;
        return reviews.filter(
            (review) =>
                review.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.facilityName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [reviews, searchQuery]);

    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

    const paginatedReviews = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredReviews.slice(start, start + itemsPerPage);
    }, [filteredReviews, currentPage, itemsPerPage]);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    const handleViewReview = useCallback((review: Review) => {
        setSelectedReview(review);
    }, []);

    const handleCloseDetail = useCallback(() => {
        setSelectedReview(null);
    }, []);

    const handleDeleteReview = useCallback((review: Review) => {
        setReviews((prev) => prev.filter((r) => r.id !== review.id));
        toast.success(`${review.driverName}'s review deleted`);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    return {
        reviews: paginatedReviews,
        filteredTotal: filteredReviews.length,
        searchQuery,
        currentPage,
        totalPages,
        selectedReview,
        handleSearch,
        handleViewReview,
        handleCloseDetail,
        handleDeleteReview,
        handlePageChange,
    };
};