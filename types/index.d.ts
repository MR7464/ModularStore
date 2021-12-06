/// <reference path="./global.d.ts" />

export = ModularStore;

export as namespace ModularStore; 

declare namespace ModularStore {
  const StoreContext: React.Context<IStoreContext<any, React.Dispatch<{type?: string; payload?: any}>>>
  const StoreProvider: React.FC<IProvider>
}

declare global {
  interface Action<T> {
    type: T;
    payload?: any;
  }

  interface IStoreContext<S = any, D = React.Dispatch<{type?: string; payload?: any}>> {
    store: S,
    dispatch: D
  }

  interface IReducer<S = any, A = Action<any>> {
    (state: S, action: A): S 
  }

  interface IProvider {
    reducer: IReducer;
    initData: any;
  }
}