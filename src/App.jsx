import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import ArcsPage from './pages/ArcsPage';
import ArcDetailPage from './pages/ArcDetailPage';
import NenPage from './pages/NenPage';
import GroupsPage from './pages/GroupsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/personajes" element={<CharactersPage />} />
          <Route path="/personajes/:slug" element={<CharacterDetailPage />} />
          <Route path="/arcos" element={<ArcsPage />} />
          <Route path="/arcos/:slug" element={<ArcDetailPage />} />
          <Route path="/nen" element={<NenPage />} />
          <Route path="/grupos" element={<GroupsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
