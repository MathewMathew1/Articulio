export class StringStorage {
  private storage = new Set<string>();

  contains(value: string): boolean {
    return this.storage.has(value);
  }

  add(value: string): boolean {
    if (this.contains(value)) return false;
    this.storage.add(value);
    return true;
  }

  remove(value: string): void {
    this.storage.delete(value);
  }

  async runIfNotExists(value: string, fn: () => Promise<void>): Promise<void> {
    if (!this.add(value)) return;
    try {
      await fn();
    } finally {
      this.remove(value);
    }
  }
}
