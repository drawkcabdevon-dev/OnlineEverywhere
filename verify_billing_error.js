
// Standalone logic test for handleApiError
const handleApiErrorTest = (error) => {
    const errorString = JSON.stringify(error).toLowerCase() + (error.message || '').toLowerCase();

    if (
        errorString.includes('userprojectaccountproblem') ||
        errorString.includes('delinquent') ||
        errorString.includes('billing_disabled') ||
        errorString.includes('payment_required') ||
        (error.status === 402)
    ) {
        return "BillingError Detected";
    }

    return "Generic Error";
};

console.log("Testing delinquent account error...");
console.log("Result:", handleApiErrorTest({
    message: "The project to be billed is associated with a delinquent billing account.",
    status: 403
}));

console.log("\nTesting UserProjectAccountProblem error...");
console.log("Result:", handleApiErrorTest({ message: "Code: UserProjectAccountProblem" }));

console.log("\nTesting status 402...");
console.log("Result:", handleApiErrorTest({ status: 402 }));

console.log("\nTesting generic error...");
console.log("Result:", handleApiErrorTest({ message: "Network Timeout" }));
