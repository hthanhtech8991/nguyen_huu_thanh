import { TableColumnsType, TableProps } from 'antd';
import { useMemo, useState } from "react";
import MyTables from "../components/MyTables";
import { usePrices, useWalletBalances } from "../utils/hellper";
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

interface DataTableType {
  amount: number;
  currency: string;
  blockchain: string;
  total: number;
}



const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // const getPriority = (blockchain: any): number => {
  //   switch (blockchain) {
  //     case 'Osmosis':
  //       return 100
  //     case 'Ethereum':
  //       return 50
  //     case 'Arbitrum':
  //       return 30
  //     case 'Zilliqa':
  //       return 20
  //     case 'Neo':
  //       return 20
  //     default:
  //       return -99
  //   }
  // }

  const priorityMap: { [key: string]: number } = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
    default: -99,
  };

  const getPriority = (blockchain: string): number => {
    return priorityMap[blockchain] || priorityMap.default;
  };

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > -99 && balance.amount > 0;
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      return rightPriority - leftPriority;
      // return leftPriority - rightPriority;
    });
  }, [balances, prices]);

  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed()
  //   }
  // })

  // const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  //   const usdValue = prices[balance.currency] * balance.amount;
  //   return (
  //     <WalletRow 
  //       className={classes.row}
  //       key={index}
  //       amount={balance.amount}
  //       usdValue={usdValue}
  //       formattedAmount={balance.formatted}
  //     />
  //   )
  // })

  const columns: TableColumnsType<DataTableType> = [
    { title: 'Title', dataIndex: 'blockchain' },
    { title: 'Amount', dataIndex: 'amount', sorter: (a, b) => a.amount - b.amount, ellipsis: true, showSorterTooltip: false },
    { title: 'Currency', dataIndex: 'currency', ellipsis: true, showSorterTooltip: false },
    { 
      title: "Total",
      dataIndex: "total",
      render: (_, record) => {
        const total = prices[record.currency] * record.amount;
        return <span>{total.toFixed(2)}</span>;
      },
    },
  ];

  const rowSelection: TableRowSelection<DataTableType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

console.log('ThanhNguyen:: sortedBalances', sortedBalances);
  return (
    <div {...rest}>
      <MyTables 
        pageSize={5}
        columns={columns}
        dataSource={sortedBalances}
        rowSelection={rowSelection} />
    </div>
  )
}
export default WalletPage;