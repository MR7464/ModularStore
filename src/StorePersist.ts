class StorePersist {
  id: number;
  config: IPersistConfig;
  static instance?: StorePersist = undefined;
  constructor(_c?: IPersistConfig) {
    this.id = Number(`${Math.random() * new Date().getTime()}`.slice(-4));
    this.config = _c || {
      open: true,
      key: "demo",
      presetEnv: "web",
    };
  }

  public static getInterface(_c?: IPersistConfig) {
    if (!this.instance && _c) {
      this.instance = new StorePersist(_c);
    }
    return StorePersist.instance;
  }

  public getPersist() {
    let value = sessionStorage.getItem(this.config.key)
    return value ? JSON.parse(value) : null
  }

  public setPersist(value: any) {
    return new Promise((res, rej) => {
      try {
        sessionStorage.setItem(this.config.key, JSON.stringify(value))
        res(sessionStorage.getItem(this.config.key))
      } catch (e) {
        rej(e)
      }
    })
  }
}

export default StorePersist;
