import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/Dashboard';
import { AuthPage } from '@/pages/Auth';
import { PlatformDashboard } from '@/pages/PlatformDashboard';
import { ProviderDashboard } from '@/pages/ProviderDashboard';
import { GembeEduProDashboard } from '@/pages/GembeEduProDashboard';
import { Language } from '@/lib/languages';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { UserRole, ProviderRole } from '@/types/auth';

function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState('landing');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [providerRole, setProviderRole] = useState<ProviderRole>('provider');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'patient') {
      setCurrentPage('patient');
      toast.success('Successfully logged in to Patient Portal');
    } else if (role === 'provider') {
      setCurrentPage('provider_hub');
      setProviderRole('super_admin'); // Defaulting to high access for demo
      toast.success('Healthcare Provider Session Secured');
    } else if (role === 'platform_admin') {
      setCurrentPage('gembe_dashboard'); // Redirect to new dedicated dashboard
      toast.success('Global Platform Administration Access Granted');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('landing');
    toast.info('Logged out successfully');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Conditionally show Navbar - Admin dashboards usually have their own sidebar */}
      {currentPage !== 'auth' && 
       currentPage !== 'platform_admin' && 
       currentPage !== 'provider_hub' && 
       currentPage !== 'gembe_dashboard' && (
        <Navbar 
          currentLang={currentLang} 
          setLang={setCurrentLang} 
          onNavigate={handleNavigate}
          activePage={currentPage}
          onLogout={userRole ? handleLogout : undefined}
        />
      )}

      <main>
        {currentPage === 'landing' && (
          <LandingPage currentLang={currentLang} onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'auth' && (
          <AuthPage onLogin={handleLogin} />
        )}

        {currentPage === 'patient' && (
          <DashboardPage 
            currentLang={currentLang} 
            role="patient" 
            onLogout={handleLogout}
          />
        )}

        {currentPage === 'provider_hub' && (
          <ProviderDashboard role={providerRole} onLogout={handleLogout} />
        )}

        {currentPage === 'platform_admin' && (
          <PlatformDashboard onLogout={handleLogout} />
        )}

        {currentPage === 'gembe_dashboard' && (
          <GembeEduProDashboard onLogout={handleLogout} />
        )}

        {/* Support old provider dashboard for backwards compatibility */}
        {currentPage === 'provider' && (
           <DashboardPage 
            currentLang={currentLang} 
            role="provider" 
            onLogout={handleLogout}
          />
        )}
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;