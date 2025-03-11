import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { ClientesPage } from './pages/ClientesPage'
import { ProveedoresPage } from './pages/ProveedoresPage'
import { LogisticosPage } from './pages/LogisticosPage'
import { ServiciosPage } from './pages/ServiciosPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/terceros/clientes" element={<ClientesPage />} />
          <Route path="/terceros/proveedores" element={<ProveedoresPage />} />
          <Route path="/terceros/logisticos" element={<LogisticosPage />} />
          <Route path="/servicios/ss" element={<ServiciosPage />} />
          {/* Rutas adicionales para futuras páginas */}
          <Route path="*" element={<div className="container py-10">Página no encontrada</div>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
