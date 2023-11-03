export const userMock = {
  id: '1',
  username: 'tadalafilo',
  role: 'regro',
  email: 'querosenodagasolino@gmail.com',
  password: 'casasbahio'
};

export const usersMock = [
  userMock,
  {
    id: '2',
    username: 'siririco',
    role: 'geladeiro',
    email: 'borboletometralhadoro@gmail.com',
    password: 'senho'
  },
];

export const tokenMock =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

export const errorIncorrectMessageMock = { "message": "All fields must be filled" }

export const errorInvalidMessageMock =   { "message": "Invalid email or password" }

export const wrongUserMock = {
  username: '@errado.com',
  password: '1234567'
};

export const wrongPasswordMock = {
  username: 'leozin123@gmail.com',
  password: '12345'
}
