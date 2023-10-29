import Styles from "./home.module.css";
import TransactionForm from "./transactionForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import Transactions from "./Transactions";

const Home = () => {
  const { user } = useAuthContext();
  const { error, documents } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <main className={Styles.container}>
      <div className={Styles.content}>
        {error && <p className="error">{error}</p>}
        {!error && <Transactions transactions={documents} />}
      </div>
      <div className={Styles["transaction-form"]}>
        <TransactionForm uid={user.uid} />
      </div>
    </main>
  );
};

export default Home;
