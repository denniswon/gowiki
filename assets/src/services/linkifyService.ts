import linkify from 'linkify-it'
import tlds from 'tlds'

class LinkifyService {
  linkify: linkify.LinkifyIt

  atMentionParser = scheme => ({
    validate: (text, pos, self) => {
      const tail = text.slice(pos)

      if (!self.re.mention) {
        self.re.mention = new RegExp(/^(\[[^\]]*\])/)
      }
      if (self.re.mention.test(tail)) {
        return tail.match(self.re.mention)[0].length
      }
      return 0
    },
    normalize: function(match) {
      match.url = scheme + match.url.replace(/[\@\[\]]/g, '')
    }
  })

  constructor() {
    this.linkify = new linkify()
      .tlds(tlds)
      // .add('@', this.atMentionParser('mention://'))
      // .add('#', this.atMentionParser('hashtag://'))
  }

  match = (str: string) => this.linkify.match(str)
}

export default new LinkifyService()
