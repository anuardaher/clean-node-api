import { httpRequest, httpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: httpRequest): httpResponse {
    const requiredFields = ['name', 'email', 'password']
    let error: any
    requiredFields.forEach((field) => {
      if (!httpRequest.body[field]) {
        error = badRequest(new MissingParamError(field))
      }
    })
    return error || { statusCode: 200, body: 'Ok' }
  }
}
