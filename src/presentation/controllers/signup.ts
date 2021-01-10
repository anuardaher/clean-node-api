import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, EmailValidator, httpRequest, httpResponse } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: httpRequest): httpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const error = requiredFields.find((field) => {
        return !httpRequest.body[field]
      })
      if (error) return badRequest(new MissingParamError(error))
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParamError('email'))
      }
      return { statusCode: 200, body: 'Ok' }
    } catch (error) {
      return serverError()
    }
  }
}
