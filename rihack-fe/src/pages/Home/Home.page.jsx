import React from 'react';
import Navigation from '../../components/Navigation';
import { Box, Typography } from '@mui/material';
import credentialsService from '../../services/credentialsService';
import { useNavigate } from 'react-router-dom';

import './Home.styles.scss';

const Home = () => {
  const { token } = credentialsService;

  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-page__header">
        <Navigation />
        <h3>Eco Rijeka - Let's protect our city</h3>
        <img
          src="/assets/images/ecorijeka_transparent.png"
          alt=""
          className="home-page__logo"
        />
      </div>
      <div className="home-page__section">
        <div
          onClick={() =>
            document
              .getElementById('tips')
              .scrollIntoView({ behavior: 'smooth' })
          }
          className="home-page__section-tips"
        >
          <img
            src="/assets/images/waste-tips.png"
            alt=""
            className="home-page__section-image"
          />
          <h3>Waste disposal tips</h3>
        </div>
        <div
          className="home-page__section-report"
          onClick={() => {
            if (token) navigate('/add-report');
            else navigate('/login');
          }}
        >
          <h3>Report undisposed waste</h3>
          <img
            src="/assets/images/waste-report.png"
            alt=""
            className="home-page__section-image"
          />
        </div>
        <div
          className="home-page__section-map"
          onClick={() =>
            document
              .getElementById('map')
              .scrollIntoView({ behavior: 'smooth' })
          }
        >
          <img
            src="/assets/images/waste-map.png"
            alt=""
            className="home-page__section-image"
          />
          <h3>City map</h3>
        </div>
        <div
          className="home-page__section-contact"
          onClick={() =>
            document
              .getElementById('contact')
              .scrollIntoView({ behavior: 'smooth' })
          }
        >
          <h3>Contact competent authorities </h3>
          <img
            src="/assets/images/waste-contact.png"
            alt=""
            className="home-page__section-image"
          />
        </div>
      </div>
      <div className="home-page__info">
        <div className="home-page__info__section">
          <img
            src="/assets/images/tip-drop.png"
            alt=""
            className="home-page__section-image"
          />
          <h3>Dispose of waste regularly</h3>
        </div>
        <div className="home-page__info__section">
          <h3>Help recycle as much waste as possible</h3>
          <img
            src="/assets/images/tip-recycle.png"
            alt=""
            className="home-page__section-image"
          />
        </div>
        <div className="home-page__info__section">
          <img
            src="/assets/images/tip-award.png"
            alt=""
            className="home-page__section-image"
          />
          <h3>Earn badges and show others how aware of environment you are</h3>
        </div>
        <div className="home-page__info__section">
          <h3>Participate actively in solving civil problems</h3>
          <img
            src="/assets/images/tip-community.png"
            alt=""
            className="home-page__section-image"
          />
        </div>
      </div>
      <div id="tips" className="home-page__tips">
        <div className="home-page__tips__section">
          <h3>1. Use a reusable bottle/cup for beverages on-the-go</h3>
          <p>
            You might already have a reusable water bottle, but do you use it
            all the time? You can put that reusable bottle to use, save money,
            and reduce waste. By taking your own water with you, you’ll also
            reduce your chances of purchasing more expensive beverages
            on-the-go.
          </p>
        </div>
        <div className="home-page__tips__section">
          <h3>2. Use reusable grocery bags, and not just for groceries</h3>
          <p>
            Just like a reusable water bottle, you may already have a reusable
            grocery bag, though it’s often forgotten at home. Try writing BAGS
            on the top of your grocery list to help you remember, or keep them
            in the back seat where they aren’t as easy to forget.
          </p>
        </div>
        <div className="home-page__tips__section">
          <h3>3. Purchase wisely and recycle</h3>
          <p>
            You can reduce the amount of waste you produce by purchasing
            products that come with less packaging and/or come in packaging that
            can be recycled. Not all plastics are recyclable in Delaware, so
            check labels before your buy.
          </p>
        </div>
        <div className="home-page__tips__section">
          <h3>4. Avoid single-use food and drink containers and utensils</h3>
          <p>
            Whenever possible, try to avoid single-use coffee cups, disposable
            utensils, straws and napkins. Some businesses will even give you a
            discount on your coffee for bringing your own mug.
          </p>
        </div>
        <div className="home-page__tips__section">
          <h3>5. Curb your use of paper: mail, receipts, magazines</h3>
          <p>
            In today’s digital world, most companies offer bills by email, and
            some even offer incentives to do so. More stores are offering
            e-receipts, too, which are great because they’re harder to lose if
            you need to make a return.
          </p>
        </div>
      </div>
      <div id="map" className="home-page__map">
        <Box>
          <Typography sx={{ fontSize: 20, mb: 3 }}>
            Map of Rijeka City
          </Typography>
          <Box minHeight="50vh">
            <iframe
              title="Rijeka Heatpoints"
              src="https://www.google.com/maps/d/embed?mid=1nQ7YGOzx1N9-VEAsedOaMNjEGleXvyo&ehbc=2E312F"
              width="290"
              height="480"
            ></iframe>
          </Box>
        </Box>
      </div>
      <div id="contact" className="home-page__contact">
        <p>Department of the city administration for the communal system</p>
        <p> Tito square 3 51000 Rijeka </p>
        <p>Tel.: +385 (0)51 209 380 </p>
      </div>
    </div>
  );
};

export default Home;
