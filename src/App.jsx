import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { ClientesPage } from './pages/ClientesPage'
import { ProveedoresPage } from './pages/ProveedoresPage'
import { LogisticosPage } from './pages/LogisticosPage'
import { ServiciosPage } from './pages/ServiciosPage'
import { OrdenesTrabajoPage } from './pages/OrdenesTrabajoPage'
import { DynamicTableTestPage } from './pages/DynamicTableTestPage'

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
          <Route path="/ordenes-trabajo" element={<OrdenesTrabajoPage />} />
          <Route path="/test/dynamic-table" element={<DynamicTableTestPage />} />
          {/* Rutas adicionales para futuras páginas */}
          <Route path="*" element={<div className="container py-10">Página no encontrada</div>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
