import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import ArcsPage from './pages/ArcsPage';
import ArcDetailPage from './pages/ArcDetailPage';
import NenPage from './pages/NenPage';
import GroupsPage from './pages/GroupsPage';
import AboutWorkPage from './pages/AboutWorkPage';
import FavoritesPage from './pages/FavoritesPage';
import ComparePage from './pages/ComparePage';
import NenQuizPage from './pages/NenQuizPage';
import NotFoundPage from './pages/NotFoundPage';
import { FavoritesProvider } from './hooks/useFavorites';

// Keying the boundary by pathname resets it on navigation, so an error on
// one page doesn't permanently strand the user once they click elsewhere.
function AppRoutes() {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personajes" element={<CharactersPage />} />
        <Route path="/personajes/:slug" element={<CharacterDetailPage />} />
        <Route path="/arcos" element={<ArcsPage />} />
        <Route path="/arcos/:slug" element={<ArcDetailPage />} />
        <Route path="/nen" element={<NenPage />} />
        <Route path="/grupos" element={<GroupsPage />} />
        <Route path="/la-obra" element={<AboutWorkPage />} />
        <Route path="/favoritos" element={<FavoritesPage />} />
        <Route path="/comparar" element={<ComparePage />} />
        <Route path="/quiz" element={<NenQuizPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Navbar />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
