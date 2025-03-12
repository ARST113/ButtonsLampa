(function(){
    if(!window.Lampa) return;

    console.log('Cardify Buttons Plugin: init');

    /**
     * 1) Добавим свой CSS (иконки в ряд, фокус и т.д.)
     */
    const style = `
    <style>
    /* Контейнер для набора иконок */
    .icon-buttons {
        display: flex;
        flex-direction: row;
        gap: 1em;
        margin-top: 1em;
    }
    /* Каждая иконка-кнопка */
    .icon-button {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        background-color: rgba(255,255,255,0.05);
        border-radius: 8px;
    }
    .icon-button svg {
        width: 60%;
        height: 60%;
        fill: white; /* цвет иконки */
    }
    /* Эффект при фокусе (класс .focus Lampa ставит автоматически) */
    .icon-button.focus {
        transform: scale(1.1);
        box-shadow: 0 0 10px rgba(255,255,255,0.6);
        z-index: 1;
    }
    </style>
    `;
    $('body').append(style);

    /**
     * 2) Переопределим шаблон "full_start_new"
     *    Вместо старой вёрстки сделаем бэкграунд-картинку + блок с иконками
     *    Обратите внимание, что {backdrop}, {title} и другие плейсхолдеры
     *    берутся из данных Lampa
     */
    Lampa.Template.add('full_start_new', `
    <div class="full-start-new cardify"
         style="background-image:url('{backdrop}');
                background-size:cover;
                background-position:center;">
        <div class="full-start-new__body">
            <div class="full-start-new__right">
                <div class="cardify__left">
                    <!-- Заголовок фильма/сериала -->
                    <div class="full-start-new__title">{title}</div>

                    <!-- Набор иконок вместо кнопки "Смотреть" -->
                    <div class="icon-buttons">
                        <!-- Иконка: Торренты -->
                        <div class="icon-button selector button--torrents">
                            <svg width="24" height="24" viewBox="0 0 50 50">
                                <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z
                                    M40.5,30.963c-3.1,0-4.9-2.4-4.9-2.4S34.1,35,27,35c-1.4,0-3.6-0.837-3.6-0.837l4.17,9.643
                                    C26.727,43.92,25.874,44,25,44c-2.157,0-4.222-0.377-6.155-1.039L9.237,16.851c0,0-0.7-1.2,0.4-1.5
                                    c1.1-0.3,5.4-1.2,5.4-1.2s1.475-0.494,1.8,0.5c0.5,1.3,4.063,11.112,4.063,11.112S22.6,29,27.4,29
                                    c4.7,0,5.9-3.437,5.7-3.937c-1.2-3-4.993-11.862-4.993-11.862s-0.6-1.1,0.8-1.4c1.4-0.3,3.8-0.7,3.8-0.7s1.105-0.163,1.6,0.8
                                    c0.738,1.437,5.193,11.262,5.193,11.262s1.1,2.9,3.3,2.9c0.464,0,0.834-0.046,1.152-0.104
                                    c-0.082,1.635-0.348,3.221-0.817,4.722C42.541,30.867,41.756,30.963,40.5,30.963z"/>
                            </svg>
                        </div>

                        <!-- Иконка: Онлайн -->
                        <div class="icon-button selector button--online">
                            <svg width="24" height="24" viewBox="0 0 36 28">
                                <rect x="1.5" y="1.5" width="33" height="25" rx="3.5" stroke="white" stroke-width="3"/>
                                <rect x="5" y="14" width="17" height="4" rx="2" fill="white"/>
                                <rect x="5" y="20" width="10" height="3" rx="1.5" fill="white"/>
                                <rect x="25" y="20" width="6" height="3" rx="1.5" fill="white"/>
                            </svg>
                        </div>

                        <!-- Иконка: Трейлер -->
                        <div class="icon-button selector button--trailer">
                            <svg width="24" height="24" viewBox="0 0 80 70">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M71.2555 2.08955C74.6975 3.2397 77.4083 6.62804 78.3283
                                    10.9306C80 18.7291 80 35 80 35C80 35 80 51.2709 78.3283
                                    59.0694C77.4083 63.372 74.6975 66.7603 71.2555
                                    67.9104C65.0167 70 40 70 40 70C40 70 14.9833
                                    70 8.74453 67.9104C5.3025 66.7603 2.59172
                                    63.372 1.67172 59.0694C0 51.2709 0 35 0
                                    35C0 35 0 18.7291 1.67172 10.9306C2.59172
                                    6.62804 5.3025 3.2395 8.74453 2.08955C14.9833
                                    0 40 0 40 0C40 0 65.0167 0 71.2555
                                    2.08955ZM55.5909 35.0004L29.9773
                                    49.5714V20.4286L55.5909 35.0004Z"
                                    fill="white"></path>
                            </svg>
                        </div>

                        <!-- Иконка: Избранное (закладка) -->
                        <div class="icon-button selector button--favorite">
                            <svg width="24" height="24" viewBox="0 0 25 30" fill="white">
                                <path d="M6.01892 24C6.27423 27.3562 9.07836 30 12.5 30C15.9216
                                    30 18.7257 27.3562 18.981 24H15.9645C15.7219
                                    25.6961 14.2632 27 12.5 27C10.7367 27 9.27804
                                    25.6961 9.03542 24H6.01892Z"/>
                                <path d="M3.81972 14.5957V10.2679C3.81972 5.41336 7.7181 1.5
                                    12.5 1.5C17.2819 1.5 21.1803 5.41336
                                    21.1803 10.2679V14.5957C21.1803 15.8462
                                    21.5399 17.0709 22.2168 18.1213L23.0727
                                    19.4494C24.2077 21.2106 22.9392 23.5
                                    20.9098 23.5H4.09021C2.06084 23.5 0.792282
                                    21.2106 1.9273 19.4494L2.78317
                                    18.1213C3.46012 17.0709 3.81972 15.8462
                                    3.81972 14.5957Z" stroke="white"
                                    stroke-width="2.5"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Правая колонка: рейтинги, реакции, статус и т.п. -->
                <div class="cardify__right">
                    <div class="full-start-new__reactions selector">
                        <div>#{reactions_none}</div>
                    </div>
                    <div class="full-start-new__rate-line">
                        <div class="full-start__pg hide"></div>
                        <div class="full-start__status hide"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `);

    /**
     * 3) Привязываем действия к этим иконкам, когда активность (экран фильма) загружается.
     *    - Можно слушать событие "activity", и если это "start" (или "ready"), находим нужные кнопки в DOM
     *    - При нажатии (hover:enter) делаем что-то полезное
     */
    Lampa.Listener.follow('activity', function(e){
        if(e.type === 'start'){
            // Проверим, что у нас "фулл" карточка
            if(e.object && e.object.activity && e.object.activity.type === 'full_start'){
                const $layout = e.object.activity.render();

                // Пример: клик по «Торренты»
                $layout.find('.button--torrents').on('hover:enter', ()=>{
                    console.log('Торренты нажаты');
                    // Ваша логика: например, открыть список торрентов
                    // Lampa.Controller.toggle('torrents');
                });

                // Пример: клик по «Онлайн»
                $layout.find('.button--online').on('hover:enter', ()=>{
                    console.log('Онлайн нажато');
                    // Ваша логика: открыть онлайн-источники, например:
                    // Lampa.Controller.toggle('online_mod');
                });

                // Пример: клик по «Трейлер»
                $layout.find('.button--trailer').on('hover:enter', ()=>{
                    console.log('Трейлер нажат');
                    // Если у вас есть плагин Cardify Trailer, можно вызвать вручную
                    // или включить встроенный трейлер
                });

                // Пример: клик по «Избранное»
                $layout.find('.button--favorite').on('hover:enter', ()=>{
                    console.log('Избранное нажато');
                    // Например, добавить в закладки Lampa.Account.toggleFavorite(...)
                });
            }
        }
    });

    console.log('Cardify Buttons Plugin: loaded');
})();
