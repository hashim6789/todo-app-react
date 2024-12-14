class Todo {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.isCompleted = false;
  }

  completed() {
    this.isCompleted = true;
  }

  notCompleted() {
    this.isCompleted = false;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getIsCompleted() {
    return this.isCompleted;
  }

  setTitle(title) {
    this.title = title;
  }
}

module.exports = Todo;
