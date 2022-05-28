import './Button.css'

export const Button = ({ text, onClick }) => {
  return <button className="hot-button" onClick={onClick}>{text} </button>
}
