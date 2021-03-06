import { API } from '../core/api'
import { NotificationList } from '../models'

/**
 * Notifications is an API module for managing notifications
 *
 * Notifications are generated by thread and account activity.
 *
 * @extends API
 */
export default class Notifications extends API {
  /**
   * Retrieves all notifications generated by thread and account activity
   * @returns An array of Notification objects
   */
  async list() {
    const response = await this.sendGet('notifications')
    return response.json() as Promise<NotificationList>
  }

  /**
   * Marks a notifiction as read by ID
   *
   * @param id ID of the target notification
   * @returns Whether the operation was successful
   */
  async read(id: string) {
    const response = await this.sendPost(`notifications/${id}/read`)
    return response.status === 200
  }

  /**
   * Marks all notifictions as read
   * @returns Whether the operation was successful
   */
  async readAll() {
    return this.read('all')
  }
}
