import React from 'react';
import { OrdenesTable } from '../components/ordenes/OrdenesTable';

export function OrdenesTrabajoPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Órdenes de Trabajo</h1>
      <OrdenesTable />
    </div>
  );
}

export default OrdenesTrabajoPage; 