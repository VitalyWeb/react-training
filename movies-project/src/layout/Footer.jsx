export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__branding">
                    <div className="footer__logo">
                        <i className="fas fa-clapperboard footer__logo-icon" aria-hidden="true"></i>
                        <span className="footer__logo-text">CineSearch</span>
                    </div>
                    <p className="footer__tagline">Поиск лучших фильмов и сериалов — быстро и удобно.</p>
                </div>

                <div className="footer__links">
                    <div className="footer__column">
                        <h4 className="footer__title">Разделы</h4>
                        <ul className="footer__list">
                            <li><a href="#" className="footer__link">Фильмы</a></li>
                            <li><a href="#" className="footer__link">Сериалы</a></li>
                            <li><a href="#" className="footer__link">Мультфильмы</a></li>
                            <li><a href="#" className="footer__link">Новинки</a></li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h4 className="footer__title">О нас</h4>
                        <ul className="footer__list">
                            <li><a href="#" className="footer__link">Контакты</a></li>
                            <li><a href="#" className="footer__link">Поддержка</a></li>
                            <li><a href="#" className="footer__link">Политика конфиденциальности</a></li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h4 className="footer__title">Мы в сети</h4>
                        <div className="footer__socials">
                            <a href="#" className="footer__social-link" aria-label="VK">
                                <i className="fab fa-vk"></i>
                            </a>
                            <a href="#" className="footer__social-link" aria-label="Telegram">
                                <i className="fab fa-telegram"></i>
                            </a>
                            <a href="#" className="footer__social-link" aria-label="YouTube">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <p>&copy; {new Date().getFullYear()} CineSearch. Все права защищены.</p>
            </div>
        </footer>

    );
}