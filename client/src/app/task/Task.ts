export class Task {
  id: number;
  title: string;
  description: string;
  due_date: Date;

  static create(data: {id: number, title: string, description: string, due_date: Date}): Task {
    const task = new Task();
    task.id = data.id;
    task.title = data.title;
    task.description = data.description;
    task.due_date = data.due_date;
    return task;
  }
}