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

export const tokenMock =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlkIjoxLCJpYXQiOjE2OTkzODI1NTIsImV4cCI6MTcwMDI0NjU1Mn0.vJQDkGjBS6ssLpoaFNGo-HannQuUXp-VQPPp-2wpE0k';

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

export const errorNoTokenMock = { "message": "Token not found" }

export const errorInvalidTokenMock = { "message": "Token must be a valid token" }
