import { useQuery } from 'react-query';

interface LoanInterestDataTypes {
  durationStartingAmountWon: number;
  interest1000: number;
}

const useGetLoanInterest = (amount: number) => {
  const { data, isLoading } = useQuery<LoanInterestDataTypes>(
    ['getLoanInterest', amount],
    () => fetch(`/api/loan-options/interest?amountWon=${amount}`).then(res => res.json()),
    { staleTime: 300000 }
  );

  return { isLoading, baseAmount: data?.durationStartingAmountWon || 0, interestRate: data?.interest1000 || 0 };
};

export default useGetLoanInterest;
