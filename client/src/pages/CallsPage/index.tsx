import { SetStateAction, useEffect, useState } from 'react';
import {
  Form, Select,
  Tag,
} from 'antd';
import { Link } from 'react-router-dom';
import UsersService from '../../services/CallsService';

import TableContainer from '../../containers/TableContainer';
import OperatorsContainer from '../../containers/OperatorsContainer';
import { SignUpRequestI } from '../../types/users.interface';
import { containerTypes } from '../../layouts/RenderLayout';
import { activeStatus, prefixTypesData } from '../../constants/formData';
import { ProviderI } from '../../types/provider.interface';
import { ProductsI } from '../../types/products.interface';
import { UserTypesI } from '../../types/userTypes.interface';
import useCombineTable from '../../hooks/tableHooks/useCombineTable';
import CallsService from '../../services/CallsService';

const CallsPage = () => {
  const [userData, setUserData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [apiData, setApiData] = useState<any>();
  const [form] = Form.useForm();

  const { handleAdd, handleCreate, handleDelete } = useCombineTable({
    form,
    setUserData,
    userData,
    setEditingKey,
    GetService: CallsService.getCalls,
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const layoutData = [
    {
      type: containerTypes.Input,
      name: 'email',
      label: 'Email',
      placeholder: 'Please enter your email',
      required: true,
    },
    {
      type: containerTypes.Select,
      name: 'userTypeId',
      label: 'User Type',
      placeholder: 'Please choose your user type',
      children: apiData?.userTypes?.map((item: UserTypesI) => (
        <Select.Option key={item.name} value={item.id}>
          {item.name}
        </Select.Option>
      )),
    },
    {
      type: containerTypes.Select,
      name: 'active',
      label: 'Status',
      placeholder: 'Please enter your status',
      children: activeStatus.map((item) => (
        <Select.Option key={item.value} value={item.key}>
          {item.value}
        </Select.Option>
      )),
    },
    {
      type: containerTypes.Select,
      name: 'namePrefix',
      label: 'Prefix',
      placeholder: 'Please choose your prefix',
      children: prefixTypesData.map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {item.value}
        </Select.Option>
      )),
    },
    {
      type: containerTypes.Input,
      name: 'fullName',
      label: 'Full name',
      placeholder: 'Please enter your full name',
      required: true,
    },
    {
      type: containerTypes.Input,
      name: 'password',
      label: 'Password',
      placeholder: 'Please enter your password',
      required: true,
    },
    {
      type: containerTypes.Input,
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Please enter your phone number',
      required: true,
    },
    {
      type: containerTypes.Select,
      name: 'providerId',
      label: 'Provider',
      placeholder: 'Please choose your provider',
      children: apiData?.providers?.map((item: ProviderI) => (
        <Select.Option key={item.id} value={item.id}>
          {item.domainName}
        </Select.Option>
      )),
    },
    {
      type: containerTypes.Select,
      name: 'products',
      label: 'Products',
      placeholder: 'Please choose your products',
      children: apiData?.products?.map((item: ProductsI) => (
        <Select.Option key={item.name} value={item.name}>
          {item.name}
        </Select.Option>
      )),
    },
  ];

  const isEditing = (record: SignUpRequestI) => record.id === editingKey;

  const cancel = () => {
    setEditingKey('');
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
      sorter: (a: { fullName: string; }, b: { fullName: string; }) => {
        const aLower = a.fullName.split(' ')[0].toLowerCase();
        const bLower = b.fullName.split(' ')[0].toLowerCase();
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
      // sorter: (a: { email: string; }, b: { email: string; }) => {
      //   const aLower = a.email.toLowerCase();
      //   const bLower = b.email.toLowerCase();
      //   if (aLower > bLower) {
      //     return 1;
      //   }
      //   return -1;
      // },
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
      sorter: (a: { phoneNumber: number; }, b: { phoneNumber: number; }) =>
        a.phoneNumber - b.phoneNumber,
    },
    {
      title: 'To',
      dataIndex: 'to',
      width: '20%',
      editable: true,
      sorter: (a: { phoneNumber: number; }, b: { phoneNumber: number; }) =>
        a.phoneNumber - b.phoneNumber,
    },
    {
      title: 'Via',
      dataIndex: 'via',
      width: '20%',
      editable: true,
      sorter: (a: { phoneNumber: number; }, b: { phoneNumber: number; }) =>
        a.phoneNumber - b.phoneNumber,
    },
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   width: '20%',
    //   editable: true,
    //   sorter: (a: { phoneNumber: number; }, b: { phoneNumber: number; }) =>
    //     a.phoneNumber - b.phoneNumber,
    // },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: unknown, record: SignUpRequestI) => {
        const editable = isEditing(record);
        return (
          <OperatorsContainer
            save={handleCreate}
            cancel={cancel}
            edit={edit}
            record={record}
            editingKey={editingKey}
            handleDelete={handleDelete}
            editable={editable}
          />
        );
      },
    },
  ];

  const editFields = {
    id: '',
    domainName: '',
    active: false,
    parentProviderId: '',
    sentence: '',
  };

  const edit = (record: { id: SetStateAction<string>; }) => {
    form.setFieldsValue({
      ...editFields,
      ...record,
    });
    setEditingKey(record.id);
  };

  return (
    <TableContainer
      title="Calls"
      dataFetch={userData}
      columns={columns}
      handleAdd={handleAdd}
      form={form}
      isEditing={isEditing}
      setEditingKey={setEditingKey}
      layoutData={layoutData}
    />
  );
};

export default CallsPage;
