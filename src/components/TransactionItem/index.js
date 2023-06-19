import './index.css'

const TransactionItem = props => {
  const {transactionItem, updateTransactions} = props
  const {title, amount, type, id} = transactionItem

  const onDeleteTransaction = () => {
    updateTransactions(id)
  }

  return (
    <li className="item-names">
      <p className="text">{title}</p>
      <p className="text">{amount}</p>
      <p className="text">{type}</p>
      <div className="delete-img-cont">
        <button
          type="button"
          className="button"
          data-testid="delete"
          onClick={onDeleteTransaction}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}
export default TransactionItem
