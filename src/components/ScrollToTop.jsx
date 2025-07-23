import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * This component scrolls the window to the top every time the route changes.
 * It doesn't render any visible UI, it just contains the logic.
 * Place this component at the top level of your application, inside the Router.
 */
export default function ScrollToTop() {
  // Extracts the pathname from the current location.
  const { pathname } = useLocation();

  // The useEffect hook runs every time the pathname changes.
  useEffect(() => {
    // Scrolls the window to the top left corner of the document.
    window.scrollTo(0, 0);
  }, [pathname]); // The effect depends on the pathname, so it runs on navigation.

  return null; // This component doesn't render anything.
}
