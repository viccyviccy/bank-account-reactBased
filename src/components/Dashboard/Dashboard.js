import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import design from './Dashboard.module.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

export default class Dashboard extends Component {
  state = {
    inputValue: '',
    transactions: [],
    topUp: 0,
    withdrawal: 0,
    balance: 0,
  };

  // notifications
  notifySuccess = () =>
    toast(
      'Incorrect amount was entered. Enter a number above 0 and try again',
      { containerId: 'A' },
    );

  notifyUnsuccess = () =>
    toast(
      'Not enough money on your account! The requested amount cannot be withdrawn!',
      { containerId: 'A' },
    );

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // topUp function block
  addMoney = () => {
    if (
      this.state.inputValue === '0' ||
      this.state.inputValue === '' ||
      this.state.inputValue < 0
    ) {
      this.notifySuccess();
      return;
    }

    const moneyOnDeposit = {
      amount: this.state.inputValue,
      id: shortid.generate(),
      type: 'Deposit',
      date: new Date().toLocaleString(),
    };
    this.state.transactions.push(moneyOnDeposit);

    const { transactions } = this.state;

    const filterTopUps = transactions
      .filter(item => item.type === 'Deposit')
      .map(item => Number(item.amount));

    const filterWithdrawals = transactions
      .filter(item => item.type === 'Withdraw')
      .map(item => Number(item.amount));

    let withdrawAmount = 0;
    if (filterWithdrawals.length > 0) {
      withdrawAmount = filterWithdrawals.reduce((a, b) => a + b);
    }
    this.setState({
      balance: filterTopUps.reduce((a, b) => a + b) - withdrawAmount,
      topUp: filterTopUps.reduce((a, b) => a + b),
    });
  };

  // withdrawal function block
  withdrawMoney = () => {
    if (
      this.state.inputValue === '0' ||
      this.state.inputValue === '' ||
      this.state.inputValue < 0
    ) {
      this.notifySuccess();
      return;
    }

    const withdrawalSummary = {
      amount: this.state.inputValue,
      id: shortid.generate(),
      type: 'Withdraw',
      date: new Date().toLocaleString(),
    };
    this.state.transactions.push(withdrawalSummary);

    const { transactions } = this.state;

    const filterTopUps = transactions
      .filter(item => item.type === 'Deposit')
      .map(item => Number(item.amount));

    const filterWithdrawals = transactions
      .filter(item => item.type === 'Withdraw')
      .map(item => Number(item.amount));

    let topUpsAmount = 0;
    if (filterTopUps.length > 0) {
      topUpsAmount = filterTopUps.reduce((a, b) => a + b);
    }
    if (topUpsAmount - filterWithdrawals.reduce((a, b) => a + b) < 0) {
      this.notifyUnsuccess();
      return;
    }

    this.setState({
      balance: topUpsAmount - filterWithdrawals.reduce((a, b) => a + b),
      withdrawal: filterWithdrawals.reduce((a, b) => a + b),
    });
  };

  // rendering block
  render() {
    const { inputValue, transactions, topUp, withdrawal, balance } = this.state;

    return (
      <div className={design.dashboard}>
        <Controls
          handleChange={this.handleChange}
          transaction={inputValue}
          withdrawMoney={this.withdrawMoney}
          onAddTransaction={this.addTransaction}
          addMoney={this.addMoney}
        />
        <ToastContainer autoClose={2500} transition={Flip} />
        <Balance
          topUp={topUp}
          items={transactions}
          balance={balance}
          withdrawal={withdrawal}
        />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}
