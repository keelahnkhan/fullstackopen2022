const Filter = ({criteria, changeCriteria}) => {
  return ( 
    <div>
      filter shown with <input value={criteria} onChange={changeCriteria}/>
    </div> 
  );
}
 
export default Filter;

