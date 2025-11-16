import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../amplify/data/resource';

// Components
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import AgeVerification from './components/auth/AgeVerification';

// Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import TopRated from './pages/TopRated';
import AddTasting from './pages/AddTasting';
import Search from './pages/Search';

import './App.css';

const client = generateClient<Schema>();

type Page = 'home' | 'profile' | 'friends' | 'top-rated' | 'add-tasting' | 'search';

function App() {
  const { user, signOut } = useAuthenticator();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkUserProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkUserProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      console.log('Checking profile for user:', user.userId);

      // Intentar cargar el perfil del usuario
      const response = await client.models.UserProfile.list({
        filter: { userId: { eq: user.userId } }
      });

      console.log('Profile response:', response);

      if (response.data && response.data.length > 0) {
        setUserProfile(response.data[0]);
        setIsAgeVerified(true);
      } else {
        // No existe perfil, necesita verificación de edad
        setIsAgeVerified(false);
      }
    } catch (error) {
      console.error('Error checking profile:', error);
      // Si hay error, asumimos que no hay perfil
      setIsAgeVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAgeVerified = async (birthdate: Date, additionalData: any) => {
    if (!user) {
      console.error('No user found');
      return;
    }

    try {
      console.log('Creating profile for user:', user.userId);

      const profileData = {
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
      };

      console.log('Profile data to create:', profileData);

      const response = await client.models.UserProfile.create(profileData);

      console.log('Profile created:', response);

      if (response.data) {
        setUserProfile(response.data);
        setIsAgeVerified(true);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error al crear el perfil. Por favor, intenta de nuevo.');
    }
  };

  const refreshUserProfile = async () => {
    if (user) {
      await checkUserProfile();
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home userProfile={userProfile} onRefresh={refreshUserProfile} />;
      case 'profile':
        return <Profile userProfile={userProfile} onUpdate={refreshUserProfile} />;
      case 'friends':
        return <Friends userId={user?.userId} />;
      case 'top-rated':
        return <TopRated />;
      case 'add-tasting':
        return <AddTasting userId={user?.userId} onSuccess={refreshUserProfile} />;
      case 'search':
        return <Search />;
      default:
        return <Home userProfile={userProfile} onRefresh={refreshUserProfile} />;
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