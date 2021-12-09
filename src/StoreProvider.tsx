import React, { useCallback, useEffect, useReducer } from 'react';
import StorePersist from './StorePersist';


/**
 * @description 创建当前模块的context方法，之后在子组件中使用useContext引入
 */
export const createStoreContext = () => {
  return React.createContext<IStoreContext>({
    store: {},
    dispatch: () => {},
    action: () => {}
  })
}

/**
 * @description 创建store的组件，包裹子组件，将store以及dispatch传入当前的树中
 * @param { Object } props
 * @param { IStoreContextType } props.StoreContext
 * @param { React.ReactNode } props.children
 * @param { IReducer<any, Action<any>> } props.reducer
 * @param { any } props.initData
 * @param { IPersistConfig } [props.persistConfig]
 * @returns 包裹了store的组件
 */
export const StoreProvider: StoreProviderType = props => {
  const { StoreContext, children, reducer, initData = {}, persistConfig = { open: true, key: 'demo', presetEnv: 'web' } } = props
  // 生成store，以及dispatch
  const [store, dispatch] = useReducer(reducer, StorePersist.getInterface(persistConfig)?.getPersist() || initData)
  // action操作方式
  const action = useCallback((callback) => {
    try {
      callback?.(store, dispatch)
      console.log('DISPATCH CALLBACK')
    } catch (error) {
      console.error(error.message) 
    }
  }, [])
  useEffect(() => {
    console.log('store change\nnext store', store)
    console.log('set Persist')
    StorePersist.getInterface(persistConfig)?.setPersist(store)
    return () => {
      console.log('store provider destroy\npreview store', store)
    }
  }, [store])
  return <StoreContext.Provider value={{store, dispatch, action}}>
    {children}
  </StoreContext.Provider>
}