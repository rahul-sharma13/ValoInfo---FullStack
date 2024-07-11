import React from 'react';
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom';
import Matches from './Routes/Matches';
import { Home, Account, Leaderboard, SignIn, SignUp } from './Routes';
import AgentPage from './components/AgentPage';
import { ThemeProvider } from './context/ThemeContext';
import Footer from './components/Footer';
import Tracker from './Routes/Tracker';
import ProtectedRoute from './components/ProtectedRoute';

import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/:uuid" element={<AgentPage />}>
              <Route path=":uuid" />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element=<ProtectedRoute /> >
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/tracker" element={<Tracker />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
