import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../amplify/data/resource';

// Components
import Header from './Header';
import Footer from './Footer';


// Pages
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import Friends from '../../pages/Friends';
import TopRated from '../../pages/TopRated';
import AddTasting from '../../pages/AddTasting';
import Search from '../../pages/Search';


import '../../App.css';

const client = generateClient<Schema>();

type Page = 'home' | 'profile' | 'friends' | 'top-rated' | 'add-tasting' | 'search';

function App() {
  const { user, signOut } = useAuthenticator();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserProfile();
  }, [user]);

  const checkUserProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Intentar cargar el perfil del usuario
      const { data: profiles } = await client.models.UserProfile.list({
        filter: { userId: { eq: user.userId } }
      });

      if (profiles && profiles.length > 0) {
        setUserProfile(profiles[0]);
        setIsAgeVerified(true);
      } else {
        // No existe perfil, necesita verificación de edad
        setIsAgeVerified(false);
      }
    } catch (error) {
      console.error('Error checking profile:', error);
      setIsAgeVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAgeVerified = async (birthdate: Date, additionalData: any) => {
    if (!user) return;

    try {
      const { data } = await client.models.UserProfile.create({
        userId: user.userId,
        username: user.username || user.signInDetails?.loginId?.split('@')[0] || 'user',
        email: user.signInDetails?.loginId || '',
        birthdate: birthdate.toISOString().split('T')[0],
        fullName: additionalData.fullName || undefined,
        lastName: additionalData.lastName || undefined,
        location: additionalData.location || undefined,
        bio: additionalData.bio || undefined,
        tastingsCount: 0,
        venuesAdded: 0,
        lastSevenDaysTastings: 0,
        lastSevenDaysVenues: 0,
      });

      if (data) {
        setUserProfile(data);
        setIsAgeVerified(true);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error al crear el perfil. Por favor, intenta de nuevo.');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home userProfile={userProfile} />;
      case 'profile':
        return <Profile userProfile={userProfile} />;
      case 'friends':
        return <Friends />;
      case 'top-rated':
        return <TopRated />;
      case 'add-tasting':
        return <AddTasting />;
      case 'search':
        return <Search />;
      default:
        return <Home userProfile={userProfile} />;
    }
  };

  // Mostrar loading mientras se verifica el usuario
  if (loading) {
    return (
      <div className="app loading-screen">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  // Mostrar verificación de edad si no está verificado
  if (!isAgeVerified) {
    return <AgeVerification onVerified={handleAgeVerified} />;
  }

  // Aplicación principal
  return (
    <div className="app">
      <Header
        username={userProfile?.username || 'Usuario'}
        photo={userProfile?.photo}
        onSignOut={signOut}
      />

      <div className="app-content">
        <Navigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />

        <main className="main-content">
          {renderPage()}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;