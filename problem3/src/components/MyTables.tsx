import type { TableProps } from 'antd';
import { Flex, Table } from 'antd';
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import React from 'react';

type TableInterface = {
  pageSize: number;
  columns: ColumnsType<any>;
  dataSource: TableProps<any>['dataSource'];
  rowSelection: TableRowSelection<any>;
}
const MyTables: React.FC<TableInterface> = ({ pageSize, columns, dataSource, rowSelection }) => {

  const formattedData = dataSource?.map((item, index) => ({
    ...item,
    key: item.id || index,
  }));

  return (
    <Flex gap="middle" vertical>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={formattedData}
        pagination={{ pageSize: pageSize }}
        bordered={true}
        scroll={{ x: 'max-content', y: 50 * (pageSize * 1.5) }}
      />
    </Flex>
  );
};

export default MyTables;