import React from 'react';

function Filter({criteria, changeCriteria}) {
  return (
    <div>
      find countries <input value={criteria} onChange={changeCriteria}/>
    </div>
  );
}

export default Filter;