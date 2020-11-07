import { createSelector } from 'reselect';

const selectFilters = state => state.filters;

export const selectTypeFilter = createSelector(
    [selectFilters],
    (filters) => filters.filterByType
);