import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../amplify/data/resource';

// Components (to be created)
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import TopRated from './pages/TopRated';
import AddTasting from './pages/AddTasting';
import Search from './pages/Search';
import AgeVerification from './components/auth/AgeVerification';

import './App.css';

const client = generateClient<Schema>();

type Page = 'home' | 'profile' | 'friends' | 'top-rated' | 'add-tasting' | 'search';

function App() {
  const { user, signOut } = useAuthenticator();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Check if user has completed age verification
    const checkAgeVerification = async () => {
      if (user) {
        try {
          const profile = await client.models.UserProfile.get({ userId: user.userId });
          if (profile.data) {
            setUserProfile(profile.data);
            setIsAgeVerified(true);
          }
        } catch (error) {
          console.error('Error checking profile:', error);
        }
      }
    };

    checkAgeVerification();
  }, [user]);

  const handleAgeVerified = async (birthdate: Date, additionalData: any) => {
    // Create user profile
    try {
      await client.models.UserProfile.create({
        userId: user.userId,
        username: user.username || user.signInDetails?.loginId || '',
        email: user.signInDetails?.loginId || '',
        birthdate: birthdate.toISOString().split('T')[0],
        ...additionalData,
      });
      setIsAgeVerified(true);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  if (!isAgeVerified) {
    return <AgeVerification onVerified={handleAgeVerified} />;
  }

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

  return (
    <div className="app">
      <Header
        username={userProfile?.username || ''}
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
    </div>
  );
}

export default App;