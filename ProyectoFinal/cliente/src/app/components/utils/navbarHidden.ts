export const navbarHidden = () => {
  if (window.location.pathname == '/signup') {
    const signupButton = window.document.getElementById('signup-button')!; // ! --> define que es confiable
    signupButton.remove();
    const logoutButton = window.document.getElementById('logout-button')!; // ! --> define que es confiable
    logoutButton.remove();
  }
  if (window.location.pathname == '/login') {
    const loginButton = window.document.getElementById('login-button')!; // ! --> define que es confiable
    loginButton.remove();
    const logoutButton = window.document.getElementById('logout-button')!; // ! --> define que es confiable
    logoutButton.remove();
  }
  if (window.location.pathname.includes('/dashboard')) {
    const loginButton = window.document.getElementById('login-button')!; // ! --> define que es confiable
    loginButton.remove();
    const signupButton = window.document.getElementById('signup-button')!; // ! --> define que es confiable
    signupButton.remove();
  }
  if (window.location.pathname == '/') {
    const logoutButton = window.document.getElementById('logout-button')!; // ! --> define que es confiable
    logoutButton.remove();
  }
  if (window.location.pathname == '/dashboard/ride') {
    const signupButton = window.document.getElementById('signup-button')!; // ! --> define que es confiable
    signupButton.remove();
    const loginButton = window.document.getElementById('login-button')!; // ! --> define que es confiable
    loginButton.remove();
  }
  if (window.location.pathname == '/dashboard/riderinvoices') {
    const signupButton = window.document.getElementById('signup-button')!; // ! --> define que es confiable
    signupButton.remove();
    const loginButton = window.document.getElementById('login-button')!; // ! --> define que es confiable
    loginButton.remove();
  }
  if (window.location.pathname == '/dashboard/riderperfil') {
    const signupButton = window.document.getElementById('signup-button')!; // ! --> define que es confiable
    signupButton.remove();
    const loginButton = window.document.getElementById('login-button')!; // ! --> define que es confiable
    loginButton.remove();
  }
};
