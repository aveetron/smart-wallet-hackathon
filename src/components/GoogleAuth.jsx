import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { sendUserCredential } from '../apis/apiRequest'

const GoogleAuth = () => {
  const navigate = useNavigate()

  const handleGoogleLoginSuccess = (credentialResponse) => {
    localStorage.setItem('smart_wallet_credentials', credentialResponse?.credential)
    const decodedToken = jwtDecode(credentialResponse?.credential)
    const userEmail = decodedToken?.email
    sendUserCredential('/user/join', {
      email: userEmail,
    })
    navigate('/dashboard', { replace: true, state: { userEmail } })
  }

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h3 className="mb-3">SMART WALLET</h3>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            navigate('/', { replace: true })
          }}
        />
      </div>
    </div>
  )
}

export default GoogleAuth
