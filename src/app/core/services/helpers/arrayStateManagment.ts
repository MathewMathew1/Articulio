export class ArrayStateManager<T extends { id: string }> {
  private items: T[] = [];

  constructor(
    private updateCallback: (items: T[]) => void,
    initialItems: T[] = []
  ) {
    this.items = initialItems;
  }

  getAll(): T[] {
    return [...this.items];
  }

  add(item: T): void {
    if (this.items.find((i) => i.id === item.id)) return;
    this.items = [...this.items, item];
    this.updateCallback(this.items);
  }

  remove(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
    this.updateCallback(this.items);
  }

  set(items: T[]): void {
    this.items = items;
    this.updateCallback(this.items);
  }

  replaceBy<K extends keyof T>(field: K, value: T[K], newItem: T): void {
    this.items = this.items.map((item) =>
      item[field] === value ? newItem : item
    );
    this.updateCallback(this.items);
  }
}
