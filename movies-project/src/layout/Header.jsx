export function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <i className="fas fa-clapperboard header__logo-icon" aria-hidden="true"></i>
                    <span className="header__logo-text">CineSearch</span>
                </div>

                <nav class="header__nav">
                    <a href="#" className="header__link">Фильмы</a>
                    <a href="#" className="header__link">Сериалы</a>
                    <a href="#" className="header__link">Мультфильмы</a>
                    <a href="#" className="header__link">Новинки</a>
                </nav>

                <form className="header__search-form">
                    <input
                        type="text"
                        class="header__search-input"
                        placeholder="Поиск..."
                        aria-label="Поиск"
                    />
                    <button type="submit" className="header__search-button" aria-label="Найти">
                        <i className="fas fa-search header__search-icon" aria-hidden="true"></i>
                    </button>
                </form>
            </div>
        </header>

    );
}