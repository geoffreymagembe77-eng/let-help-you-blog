import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authTab, setAuthTab] = useState('patient');

  // Persistence simulation
  useEffect(() => {
    const savedRole = localStorage.getItem('gembe_role');
    const savedPage = localStorage.getItem('gembe_page');
    if (savedRole && savedPage) {
      setUserRole(savedRole as UserRole);
      setCurrentPage(savedPage);
    }
  }, []);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem('gembe_role', role);
    
    if (role === 'patient') {
      setCurrentPage('patient');
      localStorage.setItem('gembe_page', 'patient');
      toast.success('Patient Portal Access Verified');
    } else if (role === 'provider') {
      setCurrentPage('provider_hub');
      setProviderRole('provider');
      localStorage.setItem('gembe_page', 'provider_hub');
      toast.success('Clinical Environment Secured');
    } else if (role === 'platform_admin') {
      setCurrentPage('provider_hub');
      setProviderRole('super_admin');
      localStorage.setItem('gembe_page', 'provider_hub');
      toast.success('Administrative Privileges Granted');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('landing');
    localStorage.removeItem('gembe_role');
    localStorage.removeItem('gembe_page');
    toast.info('Session Ended Securely');
  };

  const handleNavigate = (page: string, options?: { mode?: 'login' | 'signup', tab?: string }) => {
    if (page === 'auth') {
      setAuthMode(options?.mode || 'login');
      setAuthTab(options?.tab || 'patient');
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Conditionally show Navbar */}
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
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LandingPage currentLang={currentLang} onNavigate={handleNavigate} />
            </motion.div>
          )}
          
          {currentPage === 'auth' && (
            <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AuthPage onLogin={handleLogin} initialMode={authMode} initialTab={authTab} />
            </motion.div>
          )}

          {currentPage === 'patient' && (
            <motion.div key="patient" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DashboardPage 
                currentLang={currentLang} 
                role="patient" 
                onLogout={handleLogout}
              />
            </motion.div>
          )}

          {currentPage === 'provider_hub' && (
            <motion.div key="provider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProviderDashboard role={providerRole} onLogout={handleLogout} />
            </motion.div>
          )}

          {currentPage === 'platform_admin' && (
            <motion.div key="platform" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PlatformDashboard onLogout={handleLogout} />
            </motion.div>
          )}

          {currentPage === 'gembe_dashboard' && (
            <motion.div key="gembe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GembeEduProDashboard onLogout={handleLogout} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;