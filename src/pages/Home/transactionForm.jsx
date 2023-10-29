import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions");
  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ name, amount, uid });
  };

  // useEffect to empty the form fields once success
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);
  return (
    <>
      <h2>Create a transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction title:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Transaction Amount ($):</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </>
  );
};

export default TransactionForm;
