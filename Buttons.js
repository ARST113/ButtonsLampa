Lampa.Platform.tv();

(function () {
    'use strict';

    var style = document.createElement('style');
    style.innerHTML = `
        .full-start-new__buttons {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 5px !important;
            justify-content: flex-start;
        }

        /* Чуть ограничим макс. ширину, чтобы не были слишком длинные */
        .full-start__button {
            max-width: 160px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* Скрытие текста у КиноПоиска — по желанию */
        .full-start__button.view--rate span {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    console.log('[SorterPlugin] плагин загружен');

    function startPlugin() {
        try {
            if (Lampa.Storage.get('full_btn_priority') !== undefined) {
                Lampa.Storage.set('full_btn_priority', '{}');
            }

            Lampa.Listener.follow('full', function (e) {
                if (e.type === 'complite') {
                    setTimeout(function () {
                        try {
                            var fullContainer = e.object.activity.render();
                            var targetContainer = fullContainer.find('.full-start-new__buttons');

                            var allButtons = fullContainer.find('.buttons--container .full-start__button')
                                .add(targetContainer.find('.full-start__button'));

                            function hasClass(el, name) {
                                return $(el).attr('class').toLowerCase().includes(name);
                            }

                            var cinema = allButtons.filter(function () { return hasClass(this, 'cinema'); });
                            var online = allButtons.filter(function () { return hasClass(this, 'online'); });
                            var torrent = allButtons.filter(function () { return hasClass(this, 'torrent'); });
                            var trailer = allButtons.filter(function () { return hasClass(this, 'trailer'); });
                            var rest = allButtons.not(cinema).not(online).not(torrent).not(trailer);

                            cinema.detach();
                            online.detach();
                            torrent.detach();
                            trailer.detach();
                            rest.detach();

                            var newOrder = []
                                .concat(cinema.get())
                                .concat(online.get())
                                .concat(torrent.get())
                                .concat(trailer.get())
                                .concat(rest.get());

                            targetContainer.empty();
                            newOrder.forEach(function (btn) {
                                targetContainer.append(btn);
                            });

                            // Блокировка кликов по кнопке КиноПоиска
                            fullContainer.find('.full-start__button.view--rate').each(function () {
                                const btn = $(this);
                                btn.off('hover:enter click');
                                btn.on('hover:enter click', function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log('[SorterPlugin] Кнопка КиноПоиска заблокирована');
                                });
                            });

                            Lampa.Controller.toggle("full_start");
                        } catch (err) {
                            console.error('[SorterPlugin] Ошибка сортировки:', err);
                        }
                    }, 100);
                }
            });

            if (typeof module !== 'undefined' && module.exports) {
                module.exports = {};
            }
        } catch (err) {
            console.error('[SorterPlugin] Ошибка инициализации плагина:', err);
        }
    }

    startPlugin();
})();
