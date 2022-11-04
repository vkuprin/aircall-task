import { useEffect, useState } from 'react';
import {
  Form,
  Tag,
  Pagination,
} from 'antd';
import { Link } from 'react-router-dom';

import TableContainer from '../../containers/TableContainer';
import OperatorsContainer from '../../containers/OperatorsContainer';
import { SignUpRequestI } from '../../types/users.interface';
import CallsService from '../../services/CallsService';
import pusher from '../../services/RealTime';
import { CallsI } from '../../types/calls.interface';
import useNotification from '../../hooks/useNotification';

const CallsPage = () => {
  const [userData, setUserData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [editingKey] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      await CallsService.getCalls({ limit, offset })
        .then((res) => {
          const newData = res?.nodes.map((item: { id: string }) =>
            ({ ...item, key: item.id }));
          setUserData(newData);
          setOtherData(res?.totalCount);
        })
        .catch((err: { message: string; }) =>
          useNotification({
            placement: 'topRight',
            message: 'Error',
            description: err.message,
          }));
    };
    fetchData();
  }, [limit, offset]);

  useEffect(() => {
    const channel = pusher.subscribe('private-aircall');
    channel.bind('update-call', (data: Record<string, string>) => {
      console.log('data', data);
    });
  }, []);

  const isEditing = (record: SignUpRequestI) => record.id === editingKey;

  const handleArchive = async (id: string) => {
    CallsService.archiveCall(id).then((res) => {
      const newData: any = userData.map((item: CallsI) => {
        if (item.id === id) {
          return {
            ...item,
            ...res,
          };
        }
        return item;
      });
      setUserData(newData);
    }).catch((err) => {
      console.log(err);
    });
  };

  const columns = [
    {
      title: 'Call Type',
      dataIndex: 'call_type',
      width: '5%',
      editable: true,
      render: (text: string, record: {id: string}) => <Link to={`/profile/${record.id}`}>{text}</Link>,
      sorter: (a: { call_type: string; }, b: { call_type: string; }) => {
        if (a.call_type < b.call_type) return -1;
        if (a.call_type > b.call_type) return 1;
        return 0;
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
      form={form}
      isEditing={isEditing}
        // @ts-ignore
      totalCount={otherData}
      pagination={{
        total: otherData,
        onChange: (page: number, pageSize: number) => {
          setOffset(page);
          setLimit(pageSize);
        },
      }}
    />
  );
};

export default CallsPage;
