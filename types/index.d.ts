/// <reference path="./global.d.ts" />

export = ModularStore;

export as namespace ModularStore; 

declare namespace ModularStore {
  const StoreProvider: StoreProviderType
  const createStoreContext: () => React.Context<IStoreContext<any, React.Dispatch<{type?: string; payload?: any}>>>
}

declare global {
  interface Action<T> {
    type?: T;
    payload?: any;
  }

  interface IStoreContext<S = any, D = React.Dispatch<{type?: string; payload?: any}>> {
    store: S,
    dispatch: D,
    action: (callback: IAction<S, D>) => any
  }

  type IStoreContextType = React.Context<IStoreContext>

  interface IReducer<S = any, A = Action<any>> {
    (state: S, action: A): S 
  }

  interface IAction<S, D> {
    (s: S, d: D) : any
  }

  interface IProvider {
    reducer: IReducer;
    initData: any;
    StoreContext: IStoreContextType;
    persistConfig?: IPersistConfig
  }

  type StoreProviderType = React.FC<IProvider>

  interface IPersistConfig {
    open?: boolean;
    key: string;
    presetEnv: 'weapp' | 'swan' | 'alipay' | 'web' | 'tt'
  }
}