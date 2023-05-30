import React from 'react';
import DataGrid from '../components/DataGrid';

function PostsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Displaying Posts</h2>
      <DataGrid dataType="posts" />
    </div>
  );
}

export default PostsPage;
