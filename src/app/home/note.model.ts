export class Note {
  constructor(
    public title: string,
    public description: string,
    public date: Date,
    public type: string,
    public priority: string
  ) {}
}
