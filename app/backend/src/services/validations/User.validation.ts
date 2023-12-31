import { ServiceResponse } from '../../Types/ServiceResponse.type';
import schemas from '../schemas/schemas';

export type loginData = {
  email: string;
  password: string;
};

const validateLogin = ({ email, password }: loginData): ServiceResponse<string> | null => {
  const validation = schemas.loginValidation.validate({ email, password });

  const typeError = validation.error?.details[0].type;
  const message = validation.error?.details[0].message as string
  || validation.error?.message as string;

  if (!validation.error) return null;

  if (typeError === 'any.required' || typeError === 'string.empty') {
    return { status: 'REQUIRED_DATA', data: { message } };
  } return { status: 'INVALID_DATA', data: { message } };
};

export default { validateLogin };
