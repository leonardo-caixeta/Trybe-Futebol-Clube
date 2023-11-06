import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import schemas from '../schemas/schemas';

export type loginData = {
  email: string;
  password: string;
};

const validateLogin = ({ email, password }: loginData): ServiceResponse<string> | null => {
  const validation = schemas.loginValidation.validate({ email, password });
  const typeError = validation.error?.details[0].type;
  const message = validation.error?.details[0].message as string;

  if (!validation.error) return null;

  if (typeError === 'any.required') {
    return { status: 'REQUIRED_DATA', data: { message } };
  } return { status: 'INVALID_DATA', data: { message } };
};

export default { validateLogin };
