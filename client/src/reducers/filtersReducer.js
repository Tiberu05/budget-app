const INITIAL_STATE = {
    byDate: false,
    byType: {
        incomes: false,
        expenses: false
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FILTER_DATE":
            return {
                byDate: true,
                byType: false
            };
        case "FILTER_TYPE_INCOMES":
            return {
                byDate: false,
                byType: {
                    incomes: true,
                    expenses: false
                }
            };
        case "FILTER_TYPE_EXPENSES":
            return {
                byDate: false,
                byType: {
                    incomes: false,
                    expenses: true
                }
            };
        case "NO_FILTERS":
            return {
                byDate: false,
                byType: {
                    incomes: false,
                    expenses: false
                }
            }
        default:
            return {
                byDate: false,
                byType: {
                    incomes: false,
                    expenses: false
                }
            }
    }
};