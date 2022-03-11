'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');


    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        // Проверили вводимые данные в инпут и обрезали их, если они будут длинее 21 символа
        if(newFilm) {
            if(newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 21)}...`
            }

            // Запушили строку в массив и отсортировали его по алфавиту
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            // создали новый li в нашем списке
            createMovieList(movieDB.movies, movieList);
        }

        // Сбросили форму
              e.target.reset();
    })
          
    // Удалили картинки в блоке с рекламой
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    
    
    const makeChanges = () => {
        genre.textContent = 'драма';
    
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    }


    // Метод сортировки массива
    const sortArr = (arr) => {
        arr.sort();
    };


    // Создаем новый li с аргументами movieDB.movies и movieList это сам тэг ul
    function createMovieList(films, parent) {
        // Очищаем содержимое ul 
        parent.innerHTML = "";

        // Создаем новые li используя старый массив и добовляя к нему новый элемент, который был введен в input. Используем колбэк фун-ию
        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${ i + 1} ${film}
                <div class="delete"></div>
            </li>
            `;
        })

        // Получаем блок с корзинкой, перебераем все корзинки и удаляем ее, если нажмем. И формируем новый список, на основе удаленного, используя рекурсию
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();

                // Этот метод вырезает элемент, на который мы нажали в 1 количестве
                movieDB.movies.splice(i, 1);

                createMovieList(movieDB.movies, movieList);
            })
        })
    }

    deleteAdv(adv);
    makeChanges();
    sortArr(movieDB.movies);
    createMovieList(movieDB.movies, movieList);
})

