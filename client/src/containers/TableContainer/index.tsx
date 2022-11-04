import { memo, useState } from 'react';
import {
  Form, Table, FormInstance,
} from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import EditableCell from '../../components/EditableCell';
import TableTitle from '../../components/TableTitle';

interface TableContainerProps {
    dataFetch: any[];
    columns: any;
    handleAdd: () => void;
    form: FormInstance;
    setEditingKey: (key: string) => void;
    isEditing: any;
    title: string;
    layoutData?: any[];
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
}

const TableContainer = ({
  dataFetch,
  columns,
  handleAdd,
  layoutData,
  form,
  setEditingKey,
  isEditing,
  title,
  ...otherProps
}: TableContainerProps) => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const cancel = () => {
    setEditingKey('');
  };

  const mergedColumns = columns.map((col: {
     editable: boolean;
     dataIndex: string;
     title: string;
 }) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <div className="table-responsive">
        <Table
          title={() => <TableTitle title={title} />}
          loading={dataFetch.length === 0}
          bordered
          dataSource={dataFetch}
          columns={mergedColumns}
          className="ant-border-space"
          rowClassName="editable-row"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          pagination={{
            onChange: cancel,
          }}
          {...otherProps}
        />
      </div>
    </Form>
  );
};

export default memo(TableContainer);
