import { API } from '../core/api'

/**
 * Tokens is an API module for managing Cafe access tokens
 *
 * Tokens allow other peers to register with a Cafe peer. Use this API to create, list, validate,
 * and remove tokens required for access to this Cafe.
 *
 * @extends API
 */
export default class Tokens extends API {
  /**
   * Creates an access token
   *
   * Generates an access token (44 random bytes) and saves a bcrypt hashed version for future
   * lookup. The response contains a base58 encoded version of the random bytes token. If the
   * ‘store’ option is set to false, the token is generated, but not stored in the local Cafe
   * db. Alternatively, an existing token can be added using by specifying the ‘token’ option.
   *
   * @param token Use an existing token, rather than creating a new one
   * @param store Whether to store the added/generated token to the local db (defaults to true)
   * @see Cafes#add
   * @returns New token as string
   */
  async add(token?: string, store?: boolean) {
    const response = await this.sendPost(`tokens`, undefined, {
      token: token || '',
      store: store || false
    })
    return response.text() as Promise<string>
  }

  /**
   * Check validity of existing cafe access token
   *
   * @param token Access token
   * @returns Whether token is valid
   */
  async validate(token: string) {
    const response = await this.sendGet(`tokens/${token}`)
    return response.status === 200
  }

  /**
   * Retrieves information about all stored cafe tokens
   *
   * Only really useful for debugging. These are hashed tokens, so are not valid.
   * @returns Array of bcrypt hashed tokens
   */
  async list() {
    const response = await this.sendGet('tokens')
    return response.json() as Promise<string[]>
  }

  /**
   * Removes an existing cafe token
   *
   * @param token Access token
   * @returns Whether remove was successful
   */
  async remove(token: string) {
    const response = await this.sendDelete(`tokens/${token}`)
    return response.status === 204
  }
}
