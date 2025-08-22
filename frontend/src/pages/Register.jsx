import Form from "../components/Form";

function Register() {
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-base-200">
      <h1 className="mb-6">Register Page</h1>
      <Form route="/api/user/register/" method="register" />
    </div>
  );
}
export default Register;
