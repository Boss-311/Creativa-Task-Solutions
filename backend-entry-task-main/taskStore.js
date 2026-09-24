class TaskStore {
  constructor() {
    this.tasks = new Map();
    this.nextId = 1;
  }

  create({ title, status = 'todo', priority = 1, ownerId }) {
    if (!title || typeof title !== 'string') throw new Error('Invalid title');
    if (typeof ownerId !== 'number') throw new Error('Invalid ownerId');

    const task = {
      id: this.nextId++,
      title: title.trim(),
      status,
      priority,
      ownerId
    };

    this.tasks.set(task.id, task);
    return { ...task };
  }

  getById(id) {
    const task = this.tasks.get(id);
    return task ? { ...task } : null;
  }

  getAll(filters = {}) {
    let list = Array.from(this.tasks.values());

    if (filters.status) {
      list = list.filter(t => t.status === filters.status);
    }
    if (filters.priority) {
      list = list.filter(t => t.priority === filters.priority);
    }
    if (filters.ownerId !== undefined) {
      list = list.filter(t => t.ownerId === filters.ownerId);
    }

    return list.map(t => ({ ...t }));
  }

  update(id, updates = {}) {
    const task = this.tasks.get(id);
    if (!task) return null;

    if (updates.title) task.title = updates.title.trim();
    if (updates.status) task.status = updates.status;
    if (updates.priority) task.priority = updates.priority;
    if (updates.ownerId !== undefined) task.ownerId = updates.ownerId;

    return { ...task };
  }

  delete(id) {
    return this.tasks.delete(id);
  }

  clear() {
    this.tasks.clear();
    this.nextId = 1;
  }
}

module.exports = TaskStore;
