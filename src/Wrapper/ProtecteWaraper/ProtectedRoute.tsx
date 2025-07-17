
import { useAuthStore } from '../../store/useAuthStore'
import { useEffect, type JSX } from 'react'
import FullScreenLoading from '../../components/UI/FullScreenLoading'
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, verifyToken} = useAuthStore();
  const navigation = useNavigate();
  const handlerVerifyToken = async () => {
    const isVerified = await verifyToken()
    console.log("Token verification status:", isVerified);
    if (!isVerified) {
      return navigation('/auth/login', { replace: true });
    }else{
      return navigation('/profile', { replace: true });
    }
  }

  useEffect(() => {
    if (!token) {
      handlerVerifyToken()
    }
  }, [token, verifyToken])

  return token ? children : <FullScreenLoading />
}
