import React from "react";

interface WalletRowProps {
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ className, amount, usdValue, formattedAmount }) => {
  return (
    <div className={`wallet-row ${className || ""}`}>
      <span>Amount: {formattedAmount} ({amount})</span>
      <span>USD Value: ${usdValue.toFixed(2)}</span>
    </div>
  );
};

export default WalletRow;
