const getMyDetails = () => {
  return $.ajax({
    url: "/api/users/me",
  });
};

const login = (data) => {
  return $.ajax({
    method: "POST",
    url: "api/users/login",
    data,
  });
};

const logout = () => {
  return $.ajax({
    method: "POST",
    url: "api/users/logout",
  });
};

const register = (data) => {
  console.log(data);
  return $.ajax({
    method: "POST",
    url: "api/users/register",
    data,
  });
};

const updateProfile = (data) => {
  return $.ajax({
    method: "POST",
    url: "/api/users/edit",
    data,
  });
};

const submitResource = (data) => {
  return $.ajax({
    method: "POST",
    url: "/api/resources",
    data,
  });
};

const getAllResources = () => {
  return $.ajax({
    url: "/api/resources"
  });
};