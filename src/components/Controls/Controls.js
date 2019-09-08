import React from 'react';
import PropTypes from 'prop-types';
import design from './Controls.module.css';

const Controls = ({ transaction, handleChange, addMoney, withdrawMoney }) => {
  return (
    <section className={design.controls}>
      <div className={design.controlsBlock}>
        <input
          type="number"
          name="inputValue"
          onChange={handleChange}
          value={transaction}
        />
        <button className={design.button} type="button" onClick={addMoney}>
          Deposit
        </button>
        <button type="button" className={design.button} onClick={withdrawMoney}>
          Withdraw
        </button>
      </div>
    </section>
  );
};

Controls.propTypes = {
  transaction: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  addMoney: PropTypes.func.isRequired,
  withdrawMoney: PropTypes.func.isRequired,
};

export default Controls;
