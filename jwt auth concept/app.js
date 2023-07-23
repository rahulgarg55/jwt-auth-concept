// Function to create JWT token
function createToken(data) {
    return btoa(JSON.stringify(data));
  }
  // Check if the page is being loaded or refreshed
window.addEventListener('load', function() {
    // Clear the stored token from local storage
    removeTokenFromLocalStorage();
  });
  
  
  // Function to decode JWT token
  function decodeToken(token) {
    return JSON.parse(atob(token));
  }
  
  // Function to store token in local storage
  function setTokenToLocalStorage(token) {
    localStorage.setItem('jwtToken', token);
  }
  
  // Function to store token in session storage
  function setTokenToSessionStorage(token) {
    sessionStorage.setItem('jwtToken', token);
  }
  
  // Function to remove token from local storage
  function removeTokenFromLocalStorage() {
    localStorage.removeItem('jwtToken');
  }
  
  // Function to remove token from session storage
  function removeTokenFromSessionStorage() {
    sessionStorage.removeItem('jwtToken');
  }
  
  // Signup form event handler
  document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
  
    // Perform server-side validation and user creation here (not implemented in this example)
  
    alert('User registered successfully!');
  });
  
  // Login form event handler
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    // Perform server-side validation and authentication here (not implemented in this example)
    // For simplicity, we'll assume the authentication is successful.
  
    // Store the user data in a JWT token
    const userData = {
      username: username,
      // Add any other user-related data you want to store in the token
    };
    const token = createToken(userData);
  
    // Save the token in local storage and session storage
    setTokenToLocalStorage(token);
    setTokenToSessionStorage(token);
  
    // Hide the login form and show the protected area
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('protectedArea').style.display = 'block';
  
    // Display the username in the protected area
    document.getElementById('usernameDisplay').textContent = username;
  });
  
  // Logout button event handler
  document.getElementById('logoutButton').addEventListener('click', function() {
    // Clear the stored tokens from local and session storage
    removeTokenFromLocalStorage();
    removeTokenFromSessionStorage();
  
    // Show the login form and hide the protected area
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('protectedArea').style.display = 'none';
  });
  