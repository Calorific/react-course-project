import httpService from './http.service'

const commentEndpoint = 'comment/'

const commentService = {
  createComment: async content => {
    const { data } = await httpService.put(commentEndpoint + content._id, content)
    return data
  },
  getComments: async padeId => {
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${padeId}"`
      }
    })
    return data
  },
  removeComment: async commentId => {
    const { data } = await httpService.delete(commentEndpoint + commentId)
    return data
  }
}

export default commentService