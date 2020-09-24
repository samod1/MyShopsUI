
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React   from 'react';
import Footer from "../Footer/Footer";
import Body from "../Body/Body";
import {DesktopContainer, MobileContainer} from "../Menu/Menu";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})



  const ResponsiveContainer = ({ children }) => (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
    <MediaContextProvider>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
      <Body></Body>
      <Footer></Footer>
    </MediaContextProvider>

  )

  ResponsiveContainer.propTypes = {
    children: PropTypes.node,
  }

  export default ResponsiveContainer;
