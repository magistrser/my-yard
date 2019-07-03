import React, { createContext } from 'react';

export const { Provider, Consumer } = createContext();

/**
 * Usage: export default withContext(MyComponent)
 * All context is going to be in props of MyComponent
 */
export const withContext = Component => props => <Consumer>{value => <Component {...value} {...props} />}</Consumer>;
