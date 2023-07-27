import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { sendTransaction } from "../apis/apiRequest";
import toast from "react-hot-toast";

const Transfer = ({ email, balance }) => {
  const [formData, setFormData] = useState({
    email: email,
    to: "",
    amount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResData] = useState();
  // const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let transHash;

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    setIsLoading(true);
    switch (action) {
      case "transfer":
        transHash = await sendTransaction("/user/transfer", formData);
        setIsLoading(false);
        setResData(transHash?.transactionHash);
        toast.success(`Transfer successfull`);

        break;
      case "transferErc20":
        console.log("Transfer ERC 20 data:", formData);
        break;
      default:
        console.log("Unknown action:", action);
    }
  };
  return (
    <div className="col-12 col-md-10 col-lg-8 col-xl-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSendTo" className="mt-3">
          <Form.Label>Send To</Form.Label>
          <Form.Control
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="Enter public address (0x)"
            required
          />
        </Form.Group>

        <Form.Group controlId="formAmount" className="mt-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            min={0}
            step={0.1}
            max={balance}
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter the amount"
            required
          />
        </Form.Group>

        {/* <Form.Check
          type="checkbox"
          label="Want to add Sponsor (Enables if Paymaster)"
          disabled
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="mt-3 text-start"
        />

        <Form.Group controlId="forSponsor" className="mt-3">
          <Form.Label>Sponsor Address</Form.Label>
          <Form.Control
            type="text"
            name="sponsor"
            disabled
            value={isChecked ? formData.sponsor : (formData.sponsor = "")}
            onChange={handleChange}
            placeholder="Enter public address (0x) (Enables if Paymaster)"
            required
          />
        </Form.Group> */}

        <Button
          variant="success"
          type="submit"
          className="me-2 mt-3"
          disabled={balance <= 0 || formData.amount >= balance || isLoading}
          onClick={(e) => handleSubmit(e, "transfer")}
        >
          {isLoading ? "Please wait..." : "Transfer"}
        </Button>
        <p>
          {" "}
          {resData && `Transactionhash: ${resData}`}
        </p>
       
        {/* <Button
          variant="success"
          type="submit"
          disabled
          onClick={(e) => handleSubmit(e, "transferErc20")}
          className="mt-3"
        >
          Tranfer ERC20
        </Button> */}
      </Form>
    </div>
  );
};

export default Transfer;
