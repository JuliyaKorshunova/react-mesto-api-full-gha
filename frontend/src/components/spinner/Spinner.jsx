import './Spinner.css'

export default function Spinner({ check }) {
  return(
    <div className={`spinner ${check && 'spinner_type_check'}`}></div>
  )
}
