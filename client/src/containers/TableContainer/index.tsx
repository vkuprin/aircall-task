import { memo } from 'react';
import {
  Form, Table, FormInstance,
} from 'antd';
import EditableCell from '../../components/EditableCell';
import TableTitle from '../../components/TableTitle';

interface TableContainerProps {
    dataFetch: any[];
    columns: any;
    form: FormInstance;
    isEditing: any;
    title: string;
    pagination: object;
}

const TableContainer = ({
  dataFetch,
  columns,
  form,
  isEditing,
  pagination,
  title,
  ...otherProps
}: TableContainerProps) => {
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
          loading={dataFetch?.length === 0}
          bordered
          dataSource={dataFetch}
          columns={mergedColumns}
          className="ant-border-space"
          rowClassName="editable-row"
          pagination={pagination}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          {...otherProps}
        />
      </div>
    </Form>
  );
};

export default memo(TableContainer);
