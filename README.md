# Система прогнозирования цены на авто по его характеристикам
____
## Введение
### Основные проблемы
Не всегда понятно: **стоит ли автомобиль из объявления указанной цены?**
С точки зрения продавца: **как правильно оценить подержанный автомобиль?**

### Что влияет на стоимость авто:
+ пробег, 
+ марка, 
+ модель, 
+ год выпуска и т.д.,

## Инструментарий
1. Обучение модели: **Microsoft Machine Learning Studio (classic)**
2. Сервер **Node.js, Express.js**
3. Клиент **React.js**
4. База данных **Postgres**

##Датасет
[Ссылка](https://www.kaggle.com/kukuroo3/used-car-price-dataset-competition-format?select=X_train.csv)
**Корреляция пирсона**
![корр](https://live.staticflickr.com/65535/51772981829_9283ece525_c.jpg)

##Эксперимент Microsoft ML studio
![exp](https://live.staticflickr.com/65535/51773227635_5e261c6d85_z.jpg)
###Результаты классификаторов
####Линейная регрессия
![alt text](https://live.staticflickr.com/65535/51772342751_616875116d_n.jpg)
####Дерево решений
![alt text](https://live.staticflickr.com/65535/51772584768_288dc8d6cc_m.jpg)

##Интерфейс приложения

### Начальная страница и форма ввода данных
![form](https://live.staticflickr.com/65535/51771484827_0f41f7b73f_b.jpg)
Взаимодействие с обученной моделью происходит с помощью развернутого в ML Studio API веб-сервиса.

### Вывод результата
Отображается по нажатию кнопки **Предсказать**
![form](https://live.staticflickr.com/65535/51773191710_539584bbb5_b.jpg)

### Статистика по запросам
![form](https://live.staticflickr.com/65535/51772307611_db14859ea0.jpg)

### История запросов за сутки
![form](https://live.staticflickr.com/65535/51773244870_ccde4a8dc9_w.jpg)
