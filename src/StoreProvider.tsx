import React, { FC, useReducer } from 'react';

/**
 * @description 创建当前模块的context，之后在子组件中使用useContext引入
 */
export const StoreContext = React.createContext<IStoreContext>({
  store: {},
  dispatch: () => {}
})

/**
 * @description 创建store的组件，包裹子组件，将store以及dispatch传入当前的树中
 * @param props
 * @returns 包裹了store的组件
 */
export const StoreProvider: FC<{reducer: IReducer, initData: any}> = props => {
  const { children, reducer, initData = {} } = props
  const [store, dispatch] = useReducer(reducer, initData)
  return <StoreContext.Provider value={{store, dispatch}}>
    {children}
  </StoreContext.Provider>
}