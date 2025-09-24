import { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'
import DocumentosPage from './components/DocumentosPage'
import AuditoriasPage from './components/AuditoriasPage'
import AssistentePage from './components/AssistentePage'
import './App.css'

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [currentPage, setCurrentPage] = useState('dashboard')

  const handleLogin = (email: string, password: string) => {
    // Aqui você implementaria a lógica de login
    console.log('Login:', { email, password })
    setUserEmail(email)
    setIsAuthenticated(true)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    // Aqui você implementaria a lógica de registro
    console.log('Register:', { name, email, password })
    setUserEmail(email)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsLogin(true)
    setUserEmail('')
    setCurrentPage('dashboard')
  }

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
  }

  if (isAuthenticated) {
    if (currentPage === 'documentos') {
      return (
        <DocumentosPage
          onLogout={handleLogout}
          userEmail={userEmail}
          onPageChange={handlePageChange}
        />
      )
    }

    if (currentPage === 'auditorias') {
      return (
        <AuditoriasPage
          onLogout={handleLogout}
          userEmail={userEmail}
          onPageChange={handlePageChange}
        />
      )
    }

    if (currentPage === 'assistente') {
      return (
        <AssistentePage
          onLogout={handleLogout}
          userEmail={userEmail}
          onPageChange={handlePageChange}
        />
      )
    }

    return (
      <Dashboard
        onLogout={handleLogout}
        userEmail={userEmail}
        onPageChange={handlePageChange}
      />
    )
  }

  return (
    <>
      {isLogin ? (
        <LoginForm
          onSwitchToRegister={() => setIsLogin(false)}
          onLogin={handleLogin}
        />
      ) : (
        <RegisterForm
          onSwitchToLogin={() => setIsLogin(true)}
          onRegister={handleRegister}
        />
      )}
    </>
  )
}

export default App
