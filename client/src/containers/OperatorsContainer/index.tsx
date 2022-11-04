import { Popconfirm, Typography } from 'antd';

interface OperatorsContainerProps {
    record: any;
    editingKey: string;
    editable: boolean;
    handleArchive: (id: string) => void;
}

const OperatorsContainer = ({
  record,
  editingKey,
  editable,
  handleArchive,
}: OperatorsContainerProps) => (
  <span>
    <Popconfirm
      title="Archive this call?"
      onConfirm={() => handleArchive(record.id)}
      okText="Yes"
      cancelText="No"
    >
      <Typography.Link
        style={{
          marginRight: '20%',
        }}
        disabled={editingKey !== ''}
      >
        Archive
      </Typography.Link>
    </Popconfirm>
  </span>
);

export default OperatorsContainer;
