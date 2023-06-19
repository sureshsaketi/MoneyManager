import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionItemsList: [],
  }

  onAddValues = event => {
    event.preventDefault()
    const {title, amount, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionItemsList: [...prevState.transactionItemsList, newTransaction],
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))

    this.setState(prevState => {
      if (optionId === 'INCOME') {
        return {income: prevState.income + amount}
      }
      return {expenses: prevState.expenses + amount}
    })
  }

  onChangeTitle = event => {
    const titleName = event.target.value
    this.setState({title: titleName})
  }

  onChangeAmountValue = event => {
    let amountValue = parseInt(event.target.value)
    if (typeof amountValue !== 'number') {
      amountValue = 0
    }
    this.setState({amount: amountValue})
  }

  onSelectType = event => {
    this.setState({optionId: event.target.value})
  }

  deleteTransaction = transactionId => {
    const {transactionItemsList} = this.state
    const filteredList = transactionItemsList.filter(
      eachTransaction => eachTransaction.id !== transactionId,
    )
    this.setState({transactionItemsList: filteredList})
  }

  getIncomes = () => {
    const {transactionItemsList} = this.state
    let incomeAmount = 0
    transactionItemsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionItemsList} = this.state
    let expensesAmount = 0
    transactionItemsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getBalance = () => {
    const {transactionItemsList} = this.state
    let incomeAmount = 0
    let expensesAmount = 0
    let balanceAmount = 0
    transactionItemsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {transactionItemsList, title, amount, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncomes()
    const expensesAmount = this.getExpenses()
    return (
      <>
        <div className="app-container">
          <div className="header">
            <h1 className="person-name">Hi, Richard</h1>
            <p className="welcome-text">
              Welcome back to your
              <span className="money-manage"> Money Manager</span>
            </p>
          </div>

          <div className="money-details-container">
            <MoneyDetails
              incomeAmount={incomeAmount}
              expensesAmount={expensesAmount}
              balanceAmount={balanceAmount}
            />
          </div>
          <div className="form-transactions-container">
            <div className="form-container">
              <h1 className="form-heading">Add Transaction</h1>
              <form onSubmit={this.onAddValues}>
                <div>
                  <label htmlFor="title">TITLE</label>
                  <br />
                  <input
                    value={title}
                    id="title"
                    type="text"
                    placeholder="TITLE"
                    className="input"
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div>
                  <label htmlFor="amount">AMOUNT</label>
                  <br />
                  <input
                    value={amount}
                    id="amount"
                    type="text"
                    placeholder="AMOUNT"
                    className="input"
                    onChange={this.onChangeAmountValue}
                  />
                </div>
                <div>
                  <label htmlFor="status">TYPE</label>
                  <br />
                  <select
                    id="status"
                    className="input"
                    onChange={this.onSelectType}
                    value={optionId}
                  >
                    <option value="INCOME">Income</option>
                    <option value="EXPENSES">Expenses</option>
                  </select>
                </div>
                <button type="submit">Add</button>
              </form>
            </div>
            <div className="transaction-container">
              <h1 className="form-heading">History </h1>
              <ul className="transactions-cont">
                <li className="item-names">
                  <p className="text">Title</p>
                  <p className="text">Amount</p>
                  <p className="text">Type</p>
                </li>
                {transactionItemsList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionItem={eachTransaction}
                    updateTransactions={this.deleteTransaction}
                    transactionTypeOptions={this.transactionTypeOptions}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default MoneyManager
