import { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import './App.css'

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (email: string, password: string) => {
    // Aqui você implementaria a lógica de login
    console.log('Login:', { email, password })
    alert(`Login realizado com sucesso!\nEmail: ${email}`)
    setIsAuthenticated(true)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    // Aqui você implementaria a lógica de registro
    console.log('Register:', { name, email, password })
    alert(`Conta criada com sucesso!\nNome: ${name}\nEmail: ${email}`)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsLogin(true)
  }

  if (isAuthenticated) {
    return (
      <div className="dashboard">
        <div className="dashboard-card">
          <h1>🎉 Bem-vindo!</h1>
          <p>Você está logado com sucesso!</p>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </div>
      </div>
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
