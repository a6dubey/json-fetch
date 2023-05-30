import React from 'react';
import DataGrid from '../components/DataGrid';

function UsersPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,minWidht:'100vw'}}>
      <h2>Displaying Users Data</h2>
      <DataGrid dataType="users" />
    </div>
  );
}

export default UsersPage;
