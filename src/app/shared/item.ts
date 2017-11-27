export class Item {
    id: number;
    name: string;
    user_id: number;
    is_done: boolean;

    constructor(obj: Object) {
      this.id = obj['id'];
      this.name = obj['name'];
      this.user_id = obj['user_id'];
      this.is_done = obj['is_done'];
  }
}