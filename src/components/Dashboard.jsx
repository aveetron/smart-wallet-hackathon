import copy from 'copy-to-clipboard'
import { useCallback, useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { AiOutlineCopy } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import { sendUserCredential } from '../apis/apiRequest'
import Transfer from './Transfer'

const Dashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [responseData, setResponseData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const email = location?.state?.userEmail

  const fetchDataFromApi = useCallback(async () => {
    const data = await sendUserCredential('/user/join', { email })
    setResponseData(data)
    setIsLoading(false)
  }, [email])

  useEffect(() => {
    fetchDataFromApi()
  }, [fetchDataFromApi])

  const handleLogout = () => {
    
    localStorage.removeItem('smart_wallet_credentials')
    navigate('/', { replace: true })
  }
  return (
    <>

      <div className="d-flex justify-content-between pt-2 px-4 ">
        <h1>Dashboard</h1>
        <Button variant="danger" onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>

      {isLoading ? (
        <Spinner className="d-block mx-auto" />
      ) : (
        <Container className="d-flex flex-column align-items-center text-center mt-5">
          <h5>
            Public Key :{" "}
            {`${responseData?.data?.smart_wallet_address.substr(
              0,
              6
            )}...${responseData?.data?.smart_wallet_address.substr(
              responseData?.data?.smart_wallet_address.length - 6
            )}`}
            <AiOutlineCopy
              style={{ cursor: "pointer" }}
              className="ms-2"
              size="1.5rem"
              onClick={() => copy(responseData?.data?.smart_wallet_address)}
            />
          </h5>

          <h5>Network: SEPOLIA</h5>
          <h5>Balance: {responseData.data.balance} SepoliaETH</h5>
          <Transfer email={email} balance={responseData.data.balance} />
        </Container>
      )}
    </>
  );
}

export default Dashboard
