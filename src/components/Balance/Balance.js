import React from 'react';
import PropTypes from 'prop-types';
import design from './Balance.module.css';

const Balance = ({ topUp, withdrawal, balance }) => {
  return (
    <section className={design.balance}>
      <span> &uArr; {topUp}$</span>
      <span> &dArr; {withdrawal}$</span>
      <span>Balance: {balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  topUp: PropTypes.number.isRequired,
  withdrawal: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Balance;
