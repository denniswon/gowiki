class SetService {
  sets: { [key: string]: Set<string> } = {}
  setInstances: { [key: string]: { [key: string]: any }} = {}
  setChangeFunctions: { [key: string]: () => void } = {}

  setChangeListener = (key: string, onChange: () => void) => {
    this.setChangeFunctions[key] = onChange
  }

  private createIfNotExist = (key: string) => {
    if (!this.sets[key]) {
      this.sets[key] = new Set<string>()
    }
    if (!this.setInstances[key]) {
      this.setInstances[key] = {}
    }
  }

  addInstance = (key: string, itemId: string, item: any) => {
    this.createIfNotExist(key)

    this.sets[key].add(itemId)
    this.setInstances[key][itemId] = item

    this.setChangeFunctions[key]?.()
  }

  removeInstance = (key: string, itemId: string) => {
    this.createIfNotExist(key)

    this.sets[key].delete(itemId)
    delete this.setInstances[key][itemId]

    this.setChangeFunctions[key]?.()
  }

  clear = (key: string) => {
    this.createIfNotExist(key)

    this.sets[key].clear()
    this.setInstances[key] = {}

    this.setChangeFunctions[key]?.()
  }
}

export const setService = new SetService()