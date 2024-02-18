function calculateSpendingStatus(planStartDate, planEndDate, budget, remainingFunds) {
    // Convert date strings to Date objects
    const startDate = new Date(planStartDate);
    const endDate = new Date(planEndDate);
    const today = new Date();

    // Calculate total plan duration and elapsed duration in days
    const totalDuration = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const elapsedDuration = (today - startDate) / (1000 * 60 * 60 * 24);

    // Calculate expected and actual spending
    const expectedSpending = (budget / totalDuration) * elapsedDuration;
    const actualSpending = budget - remainingFunds;

    // Compare actual spending with expected spending
    if (actualSpending > expectedSpending) {
        return 'Over Spending';
    } else {
        return 'Under Spending';
    }
}

module.exports = calculateSpendingStatus;