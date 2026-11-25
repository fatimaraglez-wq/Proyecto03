import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="container py-4">
      <Outlet />
    </main>
  );
};

export default Layout;