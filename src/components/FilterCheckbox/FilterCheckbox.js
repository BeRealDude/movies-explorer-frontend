import './FilterCheckbox.css'

function FilterCheckbox() {
    return (
      <div className="checkbox-container">
      <label className='checkbox'>
        <input className='checkbox__input' type='checkbox' />
        <span className='checkbox__round'>Короткометражки</span>
      </label>
      </div>
    );
  }
  
  export default FilterCheckbox;