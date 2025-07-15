import React, { Component } from "react";
import { validateName, validateEmail, validatePhone, validatePasswordFirst, validatePasswordSecond, validateAgree, } from "./validators";

export default class App extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    gender: "",
    passwordFirst: "",
    passwordSecond: "",
    birthday: "",
    subscribe: false,
    agree: false,
    errors: {},
  };

  handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    this.setState({ [name]: newValue }, () => {
      this.validateField(name);
    });
  };

  validateField = (fieldName) => {
    const errors = { ...this.state.errors };
    const { name, email, phone, passwordFirst, passwordSecond, agree } = this.state;

    switch (fieldName) {
      case "name":
        errors.name = validateName(name);
        if (!errors.name) delete errors.name;
        break;

      case "email":
        errors.email = validateEmail(email);
        if (!errors.email) delete errors.email;
        break;

      case "phone":
        errors.phone = validatePhone(phone);
        if (!errors.phone) delete errors.phone;
        break;

      case "passwordFirst":
        errors.passwordFirst = validatePasswordFirst(passwordFirst);
        if (!errors.passwordFirst) delete errors.passwordFirst;
        errors.passwordSecond = validatePasswordSecond(passwordFirst, passwordSecond);
        if (!errors.passwordSecond) delete errors.passwordSecond;
        break;

      case "passwordSecond":
        errors.passwordSecond = validatePasswordSecond(passwordFirst, passwordSecond);
        if (!errors.passwordSecond) delete errors.passwordSecond;
        break;

      case "agree":
        errors.agree = validateAgree(agree);
        if (!errors.agree) delete errors.agree;
        break;

      default:
        break;
    }

    this.setState({ errors });
  };

  validateForm = (e) => {
    e.preventDefault();

    const { name, email, phone, passwordFirst, passwordSecond, agree } = this.state;

    const errors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      passwordFirst: validatePasswordFirst(passwordFirst),
      passwordSecond: validatePasswordSecond(passwordFirst, passwordSecond),
      agree: validateAgree(agree),
    };

    Object.keys(errors).forEach(
      (key) => errors[key] === null && delete errors[key]
    );

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      alert("Форма успешно отправлена!");
      this.setState({
        name: "",
        phone: "",
        email: "",
        gender: "",
        passwordFirst: "",
        passwordSecond: "",
        birthday: "",
        subscribe: false,
        agree: false,
        errors: {},
      });
    }
  };

  render() {
    const { name, phone, email, gender, passwordFirst, passwordSecond, birthday, subscribe, agree, errors } = this.state;

    return (
      <div className="App">
        <form onSubmit={this.validateForm} className="form" noValidate>
          <h2 className="form-title">Регистрация</h2>

          <div className="form-group">
            <input
              type="text"
              className="input"
              value={name}
              placeholder="Имя*"
              name="name"
              onChange={this.handleChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <select
              name="gender"
              value={gender}
              onChange={this.handleChange}
              className="input"
            >
              <option value="" disabled>
                Выберите пол
              </option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="date"
              className="input"
              value={birthday}
              name="birthday"
              onChange={this.handleChange}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <div className="phone-input-container">
              <input
                type="tel"
                className="input"
                value={phone}
                placeholder="Телефон*"
                name="phone"
                onChange={this.handleChange}
              />
            </div>
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <input
              type="email"
              className="input"
              value={email}
              placeholder="Почта*"
              name="email"
              onChange={this.handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group password-group">
            <div className="input-wrapper">
              <input
                type="password"
                className="input"
                value={passwordFirst}
                placeholder="Придумайте пароль*"
                name="passwordFirst"
                onChange={this.handleChange}
                autoComplete="new-password"
              />
              <span className="tooltip-icon">?
                <div className="tooltip-text" role="tooltip">
                  Пароль должен быть: <br />
                  - Не менее 8 символов<br />
                  - Иметь хотя бы 1 заглавную букву<br />
                  - Иметь хотя бы 1 спецсимвол !@#$%^&*<br />
                  - Иметь хотя бы 1 цифру<br />
                  - Состоять только из латинских букв
                </div>
              </span>
            </div>
            {errors.passwordFirst && (
              <div className="error">{errors.passwordFirst}</div>
            )}
          </div>


          <div className="form-group">
            <input
              type="password"
              className="input"
              value={passwordSecond}
              placeholder="Повторите пароль*"
              name="passwordSecond"
              onChange={this.handleChange}
              autoComplete="new-password"
            />
            {errors.passwordSecond && (
              <div className="error">{errors.passwordSecond}</div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="subscribe"
                checked={subscribe}
                onChange={this.handleChange}
              />
              Подписаться на рассылку
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="agree"
                checked={agree}
                onChange={this.handleChange}
              />
              Я согласен с политикой сайта*
            </label>
            {errors.agree && <div className="error">{errors.agree}</div>}
          </div>

          <button type="submit" className="btn">
            Зарегистрироваться
          </button>
        </form>
      </div>
    );
  }
}