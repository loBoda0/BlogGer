export class Blog {
  public uuid = (Date.now() + '-' + Math.floor(Math.random() * (9999 - 1000+1) + 1000)).toString()

  constructor(public title: string, public body: string, public image?: string) {}
}
