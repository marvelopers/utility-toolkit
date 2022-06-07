import { useQuery } from 'react-query';

interface MeDataTypes {
  name: string;
  rrn: string;
}

const useGetMe = () => {
  const { data } = useQuery<MeDataTypes>('getMe', () => fetch('/api/me').then(res => res.json()));

  return data;
};

export default useGetMe;
