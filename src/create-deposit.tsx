import { TransactionForm } from './components/TransactionForm';

export default function WithdrawFormCommand() {
  return <TransactionForm text="Create deposit" type="deposit" sourceAccountType="revenue" targetAccountType="asset" />;
}
