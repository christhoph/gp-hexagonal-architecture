import { Login } from "./components";
import { Register } from "./components/register";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        padding: "2rem",
      }}
    >
      <div>
        <h2>Login</h2>
        <Login />
      </div>

      <div>
        <h2>Register</h2>
        <Register />
      </div>
    </div>
  );
}

export default App;
