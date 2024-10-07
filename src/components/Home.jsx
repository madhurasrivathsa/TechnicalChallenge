// Import the Login component from the Authentication directory
import Login from "./Authentication/Login";

/**
 * Home component that serves as the landing page
 * Currently only renders the Login component
 */
function Home() {
  return (
    <div>
      {/* Render the Login component */}
      <Login />
    </div>
  );
}

export default Home;