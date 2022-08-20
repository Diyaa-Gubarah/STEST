import './SingleCustomer.css';

import { useParams } from "react-router-dom";

const SingleCustomer = () => {
  let { customerId } = useParams();

  return (
    <div className="single__customer">
      <p>{`Selected ${customerId}`}</p>
    </div>
  );
};
export default SingleCustomer;
