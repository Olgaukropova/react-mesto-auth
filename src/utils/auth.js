export const baseUrl = 'https://auth.nomoreparties.co';


export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })

};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
};

export const getContent = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
} 
