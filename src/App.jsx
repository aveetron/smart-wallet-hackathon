import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import GoogleAuth from './components/GoogleAuth'
import NotFound from './components/NotFound'
import '../src/App.css'
import  { Toaster } from 'react-hot-toast'

function App() {
  const credentials = localStorage.getItem('smart_wallet_credentials')
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<GoogleAuth />} />
        <Route path="/dashboard" element={credentials && <Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
            pauseDuration: 5000,
          },
          error: {
            duration: 5000,
            pauseDuration: 3000,
          }
        }}
      />
    </div>
  );
}

export default App
