import { API } from '../core/api'
import { Text, TextList, Block } from '../models'

/**
 * Messages is an API module for managing thread/block messages
 *
 * Messages are added as blocks in a thread
 *
 * @extends API
 */
export default class Messages extends API {
  /**
   * Adds a message to a thread
   *
   * @param thread Thread ID
   * @param body Message body
   * @returns The generated message block
   */
  async add(thread: string, body: string) {
    const response = await this.sendPost(`threads/${thread}/messages`, [body])
    return response.json() as Promise<Text>
  }

  /**
   * Retrieves a message by block ID
   *
   * @param id ID of the target message
   * @returns The target message block
   */
  async get(id: string) {
    const response = await this.sendGet(`messages/${id}`)
    return response.json() as Promise<Text>
  }

  /**
   * Retrieves thread messages
   *
   * @param thread Thread ID (can also use ‘default’)
   * @param offset Offset ID to start listing from (omit for latest)
   * @param limit List page size (default: 5)
   * @returns An array of message blocks
   */
  async list(thread?: string, offset?: string, limit?: number) {
    const response = await this.sendGet('messages', undefined, {
      thread: thread || '',
      offset: offset || '',
      limit: limit || 5
    })
    return response.json() as Promise<TextList>
  }

  /**
   * Ignores a thread message by its ID
   *
   * This adds an 'ignore' thread block targeted at the comment.
   * Ignored blocks are by default not returned when listing.
   *
   * @param id ID of the message
   * @returns The added ignore block
   */
  async ignore(id: string) {
    const response = await this.sendDelete(`blocks/${id}`)
    return response.json() as Promise<Block>
  }
}
