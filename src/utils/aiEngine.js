/**
 * AI simulation engine for Smart Visitor Management System.
 * No external API keys required.
 */

export const analyzeVisitor = (visitorData) => {
    const { name, purpose, historyCount = 0 } = visitorData;

    // Simulate Risk Analysis
    let riskLevel = 'Low';
    let insights = [];

    if (historyCount === 0) {
        insights.push("First-time visitor identified.");
    } else if (historyCount > 5) {
        insights.push("Frequent visitor - expedited check-in recommended.");
    }

    if (purpose.toLowerCase().includes('delivery')) {
        insights.push("Scheduled delivery pattern detected.");
    } else if (purpose.toLowerCase().includes('maintenance')) {
        insights.push("Verification of equipment and ID required.");
    }

    // Simulate Sentiment/Intent Simulation
    const sentiments = ['Confident', 'Neutral', 'Patient', 'Hurried'];
    const simulatedSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

    return {
        riskLevel,
        insights,
        sentiment: simulatedSentiment,
        idToken: `V-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        timestamp: new Date().toISOString()
    };
};

export const simulateFaceScan = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                confidence: 98.4,
                biometricHash: Math.random().toString(16).slice(2),
                matchFound: Math.random() > 0.3,
            });
        }, 2500);
    });
};
