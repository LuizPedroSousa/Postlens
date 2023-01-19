export class Entity {
  id: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.created_at) this.created_at = new Date();
  }
}
