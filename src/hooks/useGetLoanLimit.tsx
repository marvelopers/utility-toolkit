import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

interface LoanLimiteProgressDataTypes {
  hasFinished: boolean;
}

const useGetLoanLimitProgress = () => {
  const [hasFinished, setHasFinished] = useState(true);

  useQuery('getLoanLimit', () => fetch('/api/loan-limit?wait=no').then(res => res.json()));

  const { data: progress } = useQuery<LoanLimiteProgressDataTypes>(
    'getLoanLimitCheckProgress',
    () => fetch('/api/loan-limit/progress').then(res => res.json()),
    { enabled: hasFinished, refetchInterval: 1000 }
  );

  useEffect(() => {
    if (progress?.hasFinished) {
      setHasFinished(false);
    }
  }, [progress?.hasFinished]);

  console.log('checkProgress', progress);

  return progress?.hasFinished;
};

export default useGetLoanLimitProgress;
