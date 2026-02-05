import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GirisProvider, girisKullan } from './context/AuthContext';
import GirisSayfasi from './pages/LoginPage';
import SohbetSayfasi from './pages/ChatPage';

function KorunmusYol({ children }: { children: React.ReactNode }) {
  const { girisYapildiMi } = girisKullan();
  if (!girisYapildiMi) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AcikYol({ children }: { children: React.ReactNode }) {
  const { girisYapildiMi } = girisKullan();
  if (girisYapildiMi) return <Navigate to="/chat" replace />;
  return <>{children}</>;
}

function UygulamaRotalari() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AcikYol>
            <GirisSayfasi />
          </AcikYol>
        }
      />
      <Route
        path="/chat"
        element={
          <KorunmusYol>
            <SohbetSayfasi />
          </KorunmusYol>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function Uygulama() {
  return (
    <BrowserRouter>
      <GirisProvider>
        <UygulamaRotalari />
      </GirisProvider>
    </BrowserRouter>
  );
}
