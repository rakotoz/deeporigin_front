export const WithCheckAuth = (Component: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return null;
  }
  return (props: any) => {
    return <Component {...props} />;
  };
};
