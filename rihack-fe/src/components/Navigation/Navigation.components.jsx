import { Button } from '@mui/material';
import React, { useState } from 'react';
import credentialsService from '../../services/credentialsService';
import { useNavigate } from 'react-router-dom';

import './Navigation.styles.scss';

const Navigation = () => {
  const { token, user } = credentialsService;
  const [openNavigation, setOpenNavigation] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navigation">
      {!openNavigation && (
        <img
          src="/assets/images/burger.png"
          alt=""
          className="navigation__burger"
          onClick={() => setOpenNavigation((prev) => !prev)}
        />
      )}
      {openNavigation && (
        <div className="navigation__content">
          <div className="navigation__content__header">
            <img
              src="/assets/images/arrow-left.png"
              alt=""
              className="navigation__content__header__back"
              onClick={() => setOpenNavigation(false)}
            />
            {user?.fullName && <span>{`Welcome ${user?.fullName}`}</span>}
          </div>
          <div className="navigation__content__options">
            {token ? (
              user.role === 'admin' ? (
                <>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      navigate('/');
                    }}
                  >
                    Homepage
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      navigate('/backoffice');
                    }}
                  >
                    Backoffice
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      navigate('/leaderboard');
                    }}
                  >
                    Leaderboard
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      navigate('/settings');
                    }}
                  >
                    Settings
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      credentialsService.removeAuthBody();
                      navigate('/');
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      navigate('/');
                    }}
                  >
                    Homepage
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      navigate('/add-report');
                    }}
                  >
                    Add report
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      navigate('/reports');
                    }}
                  >
                    Reports
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      navigate('/buildings');
                    }}
                  >
                    Buildings
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      navigate('/leaderboard');
                    }}
                  >
                    Leaderboard
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      navigate('/settings');
                    }}
                  >
                    Settings
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenNavigation(false);
                      credentialsService.removeAuthBody();
                      navigate('/');
                    }}
                  >
                    Log out
                  </Button>
                </>
              )
            ) : (
              <>
                <Button onClick={() => navigate('/login')}>Log in</Button>
                <Button onClick={() => navigate('/signup')}>Sign up</Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
