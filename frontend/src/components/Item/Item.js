import "./Item.css";

import { TbGenderFemale, TbGenderMale } from "react-icons/tb";

import { Link } from "react-router-dom";
import React from "react";

function Item({ customer, remove }) {
  return (
    <div className="card">
      <div className="card__content">
        <Link to={`/customers/${customer.id}`} className="content__link">
          <div className="content__details">
            <p className="content__details-name">{customer.name}</p>
            <span
              className="content__details-gender"
              style={{
                color: customer.gender === "male" ? "#42C2FF" : "#E363A4",
              }}
            >
              {customer.gender === "male" ? (
                <TbGenderMale />
              ) : (
                <TbGenderFemale />
              )}
            </span>
          </div>
          <p className="content__details-number">{customer.number}</p>
          <p className="content__details-role">{customer.role}</p>
        </Link>
      </div>
      <Link
        to={`/customers/new`}
        className="content__link card__delete card__update"
        state={{ customer: customer }}
      >
        Update
      </Link>
      <div className="card__delete" onClick={() => remove(customer.id)}>
        Delete
      </div>
    </div>
  );
}

export default React.memo(Item);
