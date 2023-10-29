import { useFirestore } from "../../hooks/useFirestore";
import Styles from "./home.module.css";

const Transactions = ({ transactions }) => {
  const { deleteDocument } = useFirestore("transactions");
  return (
    <div>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className={Styles["transaction-card"]}>
            <p>{transaction.name}</p>
            <p>{transaction.amount}$</p>
            <button
              className={Styles.delete}
              onClick={() => deleteDocument(transaction.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
