import { FormInstance } from 'antd';
import { SetStateAction } from 'react';
import useAddTable from './useAddTable';
import useGetTable from './useGetTable';

interface UseGetTableProps {
    setUserData: (userData: any) => void;
    ApiService: () => Promise<any>;
}

interface UseAddTableProps {
    form: FormInstance;
    ApiService: () => Promise<any>;
}

interface UseCombineTableProps {
    form: FormInstance;
    userData: any[];
    setUserData: SetStateAction<any>
    setEditingKey: (editingKey: string) => void;
    GetService: (body: object) => Promise<unknown>;
    AddService: (id: number, body: object) => Promise<unknown>;
}

const useCombineTable = ({
  form,
  setUserData,
  GetService,
  AddService,
}: UseCombineTableProps) => {
  useGetTable(<UseGetTableProps>{
    setUserData,
    ApiService: GetService,
  });

  const handleAdd = useAddTable(<UseAddTableProps>{
    form,
    ApiService: AddService,
  });

  return {
    handleAdd,
  };
};

export default useCombineTable;
