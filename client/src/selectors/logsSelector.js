import { createSelector } from 'reselect';

const selectUserData = state => state.userData;

export const selectLogs = createSelector(
    [selectLUserData],
    userData => userData.logs
);

