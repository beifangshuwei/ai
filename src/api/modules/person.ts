import request from '@/api';

export const googleInfo = data => {
  return request.post('/login/google', data)
}
