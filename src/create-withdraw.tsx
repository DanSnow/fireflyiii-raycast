import { TransactionForm } from './components/TransactionForm';

export default function WithdrawFormCommand() {
  return (
    <TransactionForm text="Create withdraw" type="withdrawal" sourceAccountType="asset" targetAccountType="expense" />
  );
}
