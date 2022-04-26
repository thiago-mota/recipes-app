import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [search, setSearch] = useState([]);

  const contextValue = {
    search,
    setSearch,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
