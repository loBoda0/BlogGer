export class Blog {
  public blogId = (Date.now() + '-' + Math.floor(Math.random() * (9999 - 1000+1) + 1000)).toString()
  public replies:  Reply[];

  constructor(public userId: string, public title: string, public body: string, public image?: string) {}
}

class Reply {
  public replyId = (Date.now() + '-' + Math.floor(Math.random() * (9999 - 1000+1) + 1000)).toString()
  public replies: Reply[]
  constructor(public userId: string, public username: string, public commentBody: string) {}
}
