import "./App.css";
import Home from "./Pages/Home";
import SignInPage from "./Pages/SignInForm";
import SignUpForm from "./Pages/SignUpForm";
import { AuthProvider, useAuth } from "./Contexts/Auth"; // Make sure to import useAuth and AuthProvider from the correct paths
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <SignInPage />;
  }
  return <Home />;
};

export default App;
