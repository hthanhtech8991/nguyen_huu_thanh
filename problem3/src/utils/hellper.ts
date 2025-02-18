export const useWalletBalances = () => {
    return [
        {
            id: 1,
            blockchain: "Osmosis",
            amount: 3.5,
            currency: 'OSMO',
            formatted: "3.5 Osmosis",
        },
        {
            id: 2,
            blockchain: "Ethereum",
            amount: 0.75,
            currency: 'ETH',
            formatted: "0.75 Ethereum",
        },
        {
            id: 3,
            blockchain: "Arbitrum",
            amount: 12,
            currency: 'ARB',
            formatted: "12 Arbitrum",
        },
        {
            id: 4,
            blockchain: "Zilliqa",
            amount: 6.2,
            currency: 'ZIL',
            formatted: "12 Zilliqa",
        },
        {
            id: 5,
            blockchain: "Neo",
            amount: 30,
            currency: 'NEO',
            formatted: "12 Neo",
        },
    ];
};

export const usePrices = (): Record<string, number> => {
    return {
        ZIL: 60000,
        ETH: 3000,
        ARB: 120,
        OSMO: 1000,
        NEO: 4000,
    };
};
