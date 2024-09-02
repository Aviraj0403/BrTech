import React, { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import Loading from './components/Loading/Loading';
import { useLoading } from './hooks/useLoading';
import { setLoadingInterceptor } from './interceptors/loadingInterceptor';
import Footer from './components/Footer/Footer';
function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, [showLoading, hideLoading]);

  return (
    <>
      <div className="container" id='home'>
        <Loading />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
