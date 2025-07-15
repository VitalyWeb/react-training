export const validateName = (name) => {
  if (!name.trim()) {
    return "Имя обязательно";
  } 
  else if (!/^[а-яА-Яa-zA-Z\s]+$/.test(name)) {
    return "Имя может содержать только буквы";
  } 
  else {
    return null;
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email обязателен";
  } 
  else if (!emailRegex.test(email)) {
    return "Некорректный формат email";
  } 
  else {
    return null;
  }
};

export const validatePhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');

  if (/^[78]\d{10}$/.test(cleaned)) {
    return null;
  }
  
  if (/^\+7\d{10}$/.test(cleaned)) {
    return null;
  }
  
  if (/^[3489]\d{9}$/.test(cleaned)) {
    return null;
  }
  else{
    return 'Введите телефон в формате +7ХХХХХХХХХХ';
  }
};

export const validatePasswordFirst = (passwordFirst) => {
  if (!passwordFirst) {
    return "Пароль обязателен";
  }

  const minLength = passwordFirst.length >= 8;
  const hasNumber = /\d/.test(passwordFirst);
  const hasSpecialChar = /[!@#$%^&*]/.test(passwordFirst);
  const hasUpper = /[A-Z]/.test(passwordFirst);
  const hasLower = /[a-z]/.test(passwordFirst);

  if (!minLength) {
    return "Пароль должен содержать минимум 8 символов";
  } 
  else if (!hasNumber) {
    return "Пароль должен содержать хотя бы одну цифру";
  } 
  else if (!hasSpecialChar) {
    return "Пароль должен содержать хотя бы один спецсимвол (!@#$%^&*)";
  } 
  else if (!hasUpper) {
    return "Пароль должен содержать хотя бы одну заглавную букву";
  } 
  else if (!hasLower) {
    return "Пароль должен содержать хотя бы одну строчную букву";
  } 
  else {
    return null;
  }
};

export const validatePasswordSecond = (passwordFirst, passwordSecond) => {
  if (passwordSecond && passwordFirst !== passwordSecond) {
    return "Пароли не совпадают";
  } 
  else {
    return null;
  }
};

export const validateAgree = (agree) => {
  if (!agree) {
    return "Необходимо согласие с политикой сайта";
  } 
  else {
    return null;
  }
};
