import { SetStateAction, useEffect, useState } from 'react';
import {
  Form,
  Tag,
} from 'antd';
import { Link } from 'react-router-dom';

import TableContainer from '../../containers/TableContainer';
import OperatorsContainer from '../../containers/OperatorsContainer';
import { SignUpRequestI } from '../../types/users.interface';
import useCombineTable from '../../hooks/tableHooks/useCombineTable';
import CallsService from '../../services/CallsService';

const CallsPage = () => {
  const [userData, setUserData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [apiData, setApiData] = useState<any>();
  const [form] = Form.useForm();

  const { handleAdd } = useCombineTable({
    form,
    setUserData,
    userData,
    setEditingKey,
    GetService: CallsService.getCalls,
    AddService: CallsService.createNote,
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const isEditing = (record: SignUpRequestI) => record.id === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const handleArchive = (id: string) => {
    CallsService.archiveCall(id).then(() => {
      setUserData(userData.filter((item: any) => item.id !== id));
    });
  };

  const columns = [
    {
      title: 'Call Type',
      dataIndex: 'call_type',
      width: '5%',
      editable: true,
      render: (text: string, record: {id: string}) => <Link to={`/profile/${record.id}`}>{text}</Link>,
      sorter: (a: { namePrefix: string; }, b: { namePrefix: string; }) => {
        const aLower = a.namePrefix.split(' ')[0].toLowerCase();
        const bLower = b.namePrefix.split(' ')[0].toLowerCase();
        if (aLower > bLower) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      width: '20%',
      editable: true,
      render: (text: string, record: {id: string}) => {
        const date = new Date(text);
        return (
          <Link to={`/profile/${record.id}`}>
            {date.toLocaleDateString()}
          </Link>
        );
      },
      sorter: (a: { created_at: string; }, b: { created_at: string; }) => {
        const aLower = a.created_at.split(' ')[0].toLowerCase();
        const bLower = b.created_at.split(' ')[0].toLowerCase();
        if (aLower > bLower) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: 'Direction',
      dataIndex: 'direction',
      width: '20%',
      defaultSortOrder: 'descend',
      editable: true,
      sorter: (a: { direction: string; }, b: { direction: string; }) => {
        const aLower = a.direction.toLowerCase();
        const bLower = b.direction.toLowerCase();
        if (aLower > bLower) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      width: '10%',
      editable: false,
    },
    {
      title: 'Archived',
      dataIndex: 'is_archived',
      width: '10%',
      editable: false,
      render: (tags: string) => (
        tags ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Archived</Tag>
        )
      ),
    },
    {
      title: 'From',
      dataIndex: 'from',
      width: '20%',
      editable: true,
    },
    {
      title: 'To',
      dataIndex: 'to',
      width: '20%',
      editable: true,
    },
    {
      title: 'Via',
      dataIndex: 'via',
      width: '20%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: unknown, record: SignUpRequestI) => {
        const editable = isEditing(record);
        return (
          <OperatorsContainer
            record={record}
            editingKey={editingKey}
            editable={editable}
            handleArchive={handleArchive}
          />
        );
      },
    },
  ];

  return (
    <TableContainer
      title="Calls"
      dataFetch={userData}
      columns={columns}
      handleAdd={handleAdd}
      form={form}
      isEditing={isEditing}
      setEditingKey={setEditingKey}
    />
  );
};

export default CallsPage;
