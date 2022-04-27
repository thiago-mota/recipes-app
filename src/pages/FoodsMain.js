import React, { useState } from 'react';

function FoodsMain() {
  // Temporiamente pegando as receitas daqui:
  const [recipees] = useState(['data', 'data2']);

  return (
    <div>
      {recipees.length
        ? <h1>Loading</h1>
        : <h1>Receitas</h1>}
    </div>
  );
}

export default FoodsMain;
