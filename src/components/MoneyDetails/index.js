import './index.css'

const MoneyDetails = props => {
  const {incomeAmount, expensesAmount, balanceAmount} = props

  return (
    <>
      <div className="amount-card balance">
        <div className="img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            className="image"
          />
        </div>
        <div>
          <p className="amount-info-text">Your balance</p>
          <p data-testid="balanceAmount" className="amount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="amount-card income-card income">
        <div className="img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            className="image"
          />
        </div>
        <div>
          <p className="amount-info-text">Your Income</p>
          <p data-testid="incomeAmount" className="amount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="amount-card expenses">
        <div className="img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            className="image"
          />
        </div>
        <div>
          <p className="amount-info-text">Your Expenses</p>
          <p data-testid="expensesAmount" className="amount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </>
  )
}

export default MoneyDetails
