import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { ClientesPage } from './pages/ClientesPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/terceros/clientes" element={<ClientesPage />} />
          {/* Rutas adicionales para futuras páginas */}
          <Route path="*" element={<div className="container py-10">Página no encontrada</div>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
