import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/auth/AuthModal';
import { HomePage } from './pages/HomePage';
import { Dashboard } from './pages/Dashboard';
import { LogsPage } from './pages/LogsPage';
import { MusicPage } from './pages/MusicPage';
import { ProfilePage } from './pages/ProfilePage';
import { UserLog, User } from './types';
import { calculateRecoveryPercentage } from './utils/recoveryCalculation';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<UserLog[]>([]);
  const [recoveryPercentage, setRecoveryPercentage] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 🔹 Load data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('recoveryUser');
    const savedLogs = localStorage.getItem('recoveryLogs');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs);
      setLogs(parsedLogs);
      setRecoveryPercentage(calculateRecoveryPercentage(parsedLogs));
    }
  }, []);

  // 🔹 Save user
  useEffect(() => {
    if (user) {
      localStorage.setItem('recoveryUser', JSON.stringify(user));
    }
  }, [user]);

  // 🔹 Save logs
  useEffect(() => {
    localStorage.setItem('recoveryLogs', JSON.stringify(logs));
    if (logs.length > 0) {
      setRecoveryPercentage(calculateRecoveryPercentage(logs));
    }
  }, [logs]);

  const addLog = (log: Omit<UserLog, 'id' | 'date'>) => {
    const newLog: UserLog = {
      ...log,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleLogin = (loggedInUser: User) => {
    const userLogs = JSON.parse(localStorage.getItem(`recoveryLogs_${loggedInUser.id}`) || '[]');
    setUser(loggedInUser);
    setLogs(userLogs);
    setRecoveryPercentage(calculateRecoveryPercentage(userLogs));
  };

  const handleRegister = (newUser: User) => {
    setUser(newUser);
    setLogs([]);
    setRecoveryPercentage(0);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    
    const users = JSON.parse(localStorage.getItem('recoveryUsers') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('recoveryUsers', JSON.stringify(users));
    }
  };

  const loginAsGuest = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      isGuest: true
    });
  };

  const logout = () => {
    if (user && !user.isGuest) {
      localStorage.setItem(`recoveryLogs_${user.id}`, JSON.stringify(logs));
    }
    
    setUser(null);
    setLogs([]);
    setRecoveryPercentage(0);
    localStorage.removeItem('recoveryUser');
    localStorage.removeItem('recoveryLogs');
  };

  useEffect(() => {
    if (user && !user.isGuest) {
      localStorage.setItem(`recoveryLogs_${user.id}`, JSON.stringify(logs));
    }
  }, [logs, user]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <Navbar 
          user={user} 
          onLoginAsGuest={loginAsGuest}
          onShowAuth={() => setShowAuthModal(true)}
          onLogout={logout}
          recoveryPercentage={recoveryPercentage}
        />

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
        
        <main className="pt-16">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  user={user} 
                  recoveryPercentage={recoveryPercentage}
                  onShowAuth={() => setShowAuthModal(true)}
                />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  logs={logs} 
                  recoveryPercentage={recoveryPercentage}
                  user={user}
                />
              } 
            />
            <Route 
              path="/logs" 
              element={
                <LogsPage 
                  onAddLog={addLog}
                  user={user}
                  logs={logs}
                />
              } 
            />
            <Route 
              path="/music" 
              element={
                <MusicPage 
                  logs={logs}
                  user={user}
                />
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProfilePage 
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  recoveryPercentage={recoveryPercentage}
                  totalLogs={logs.length}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
