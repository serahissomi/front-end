import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import OauthLoginHandler from './pages/LoginPage/OauthLoginHandler'
import ContainerPage from './pages/ContainerPage/ContainerPage'
import ContainerList from './pages/ContainerPage/ContainerList'
import IDEPage from './pages/IDEPage/IDEPage'
import LoginHandler from './pages/LoginPage/LoginHandler'
import { useAppSelector } from './hooks'
import { selectIsAuthenticated } from './store/userSlice'
import { useEffect } from 'react'

function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-handler" element={<LoginHandler />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login/oauth/callback" element={<OauthLoginHandler />} />
      <Route path="/container" element={<ContainerPage />}>
        <Route index element={<Navigate to="my" />} />
        <Route path="my" element={<ContainerList category="내 컨테이너" />} />
        <Route
          path="lecture"
          element={<ContainerList category="강의 컨테이너" />}
        />
        <Route
          path="question"
          element={<ContainerList category="질문 컨테이너" />}
        />
      </Route>
      <Route path="/container/:containerId/workspace" element={<IDEPage />} />
    </Routes>
  )
}

export default App
