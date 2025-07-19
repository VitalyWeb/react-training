import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer__content">
      <div className="footer__section">
        <h3 className="footer__title">О нас</h3>
        <p className="footer__text">
          MoviePicker - это сервис для поиска и выбора фильмов и сериалов. 
          Мы помогаем вам находить лучший контент для просмотра.
        </p>
      </div>

      <div className="footer__section">
        <h3 className="footer__title">Контакты</h3>
        <ul className="footer__contacts">
          <li>Email: info@moviepicker.com</li>
          <li>Телефон: +7 (123) 456-78-90</li>
        </ul>
      </div>

      <div className="footer__section">
        <h3 className="footer__title">Соцсети</h3>
        <div className="footer__social">
          <a href="#" className="footer__social-link footer__social-link--vk" aria-label="VKontakte">
            <i className="fab fa-vk"></i>
          </a>
          <a href="#" className="footer__social-link footer__social-link--tg" aria-label="Telegram">
            <i className="fab fa-telegram"></i>
          </a>
          <a href="#" className="footer__social-link footer__social-link--yt" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>

    <div className="footer__bottom">
      <p>© 2025 MoviePicker. Все права защищены.</p>
      <div className="footer__legal">
        <a href="#">Политика конфиденциальности</a>
        <a href="#">Условия использования</a>
      </div>
    </div>
  </footer>
);

export default Footer;