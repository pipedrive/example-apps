const Login = () => {
  return (
    <>
      <a
        className="p-2 m-2"
        target="_blank"
        rel="noreferrer"
        href="http://localhost:3000/api/auth/login"
      >
        Please re-authorize
      </a>
      and then
      <a
        href="#"
        onClick={() => {
          window.location.reload();
        }}
      >
        {" "}
        refresh the page
      </a>
    </>
  );
};

export default Login;
