import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/Dashboard';
import { AuthPage } from '@/pages/Auth';
import { Language } from '@/lib/languages';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState('landing');
  const [userRole, setUserRole] = useState<'patient' | 'provider' | null>(null);

  const handleLogin = (role: 'patient' | 'provider') => {
    setUserRole(role);
    setCurrentPage(role === 'patient' ? 'patient' : 'provider');
    toast.success(`Logged in as ${role === 'patient' ? 'Patient' : 'Healthcare Provider'}`);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {currentPage !== 'auth' && (
        <Navbar 
          currentLang={currentLang} 
          setLang={setCurrentLang} 
          onNavigate={handleNavigate}
          activePage={currentPage}
        />
      )}

      <main>
        {currentPage === 'landing' && (
          <LandingPage currentLang={currentLang} onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'auth' && (
          <AuthPage onLogin={handleLogin} />
        )}

        {(currentPage === 'patient' || currentPage === 'provider') && (
          <DashboardPage 
            currentLang={currentLang} 
            role={currentPage === 'patient' ? 'patient' : 'provider'} 
          />
        )}
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;