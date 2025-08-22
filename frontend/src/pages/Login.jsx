import RForm from "../components/RForm";
function Login() {
  return (
    <div className="flex  flex-col items-center justify-center min-h-screen bg-base-200">
      <h1 className="mb-6">Login Page</h1>
      <RForm route="/api/token/" method="login" />
    </div>
  );
}
export default Login;
