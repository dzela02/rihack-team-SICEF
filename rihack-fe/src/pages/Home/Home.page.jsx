import React from 'react';
import Navigation from '../../components/Navigation';

import './Home.styles.scss';

const Home = () => {
  return (
    <div className="home-page">
      <img
        src="/assets/images/rijeka.png"
        alt=""
        className="home-page__background"
      />
      <Navigation />
      <img
        src="/assets/images/ecorijeka_transparent.png"
        alt=""
        className="home-page__logo"
      />
      <p>
        Aliquam convallis urna in lorem pulvinar tincidunt. Aliquam tempor purus
        nec mi venenatis, vitae porta lectus vestibulum. Etiam lectus lorem,
        mollis gravida tincidunt nec, finibus imperdiet sapien. Nulla facilisi.
        Curabitur a massa leo. Mauris quis placerat massa. Duis tempus ipsum sit
        amet ante posuere mollis. Mauris vulputate vel metus vel pretium. Ut
        cursus vel eros et molestie. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Aliquam convallis
        urna in lorem pulvinar tincidunt. Aliquam tempor purus nec mi venenatis,
        vitae porta lectus vestibulum. Etiam lectus lorem, mollis gravida
        tincidunt nec, finibus imperdiet sapien. Nulla facilisi. Curabitur a
        massa leo. Mauris quis placerat massa. Duis tempus ipsum sit amet ante
        posuere mollis. Mauris vulputate vel metus vel pretium. Ut cursus vel
        eros et molestie. Class aptent taciti sociosqu ad litora torquent per
      </p>
    </div>
  );
};

export default Home;
