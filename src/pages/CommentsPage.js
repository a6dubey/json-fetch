import React from 'react';
import DataGrid from '../components/DataGrid';

function CommentsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Displaying Comments</h2>
      <DataGrid dataType="comments" />
    </div>
  );
}

export default CommentsPage;
