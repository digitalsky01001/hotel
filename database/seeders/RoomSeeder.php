<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Room;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        // Use delete instead of truncate to avoid foreign key constraint issues
        Room::query()->delete();

        $rooms = [
            // Коллекция «Вершины» (Люксы на верхних этажах)
            [
                'name' => 'Royal Peak Suite',
                'slug' => 'royal-peak-suite',
                'collection' => 'Вершины',
                'type' => 'Люкс',
                'price' => 45000,
                'description' => 'Вершина роскоши и технологий. Двухуровневый люкс с панорамным остеклением на 270 градусов и собственной террасой на пике отеля.',
                'amenities' => ['Система Smart Home', 'Собственная сауна', 'Премиальный бар', 'Услуги батлера 24/7', 'Джакузи с видом на горы', 'Кинотеатр', 'Винная комната', 'Терраса 50м²'],
                'images' => [
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2560&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2574&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2574&auto=format&fit=crop'
                ],
            ],
            [
                'name' => 'Celestial Heritage',
                'slug' => 'celestial-heritage',
                'collection' => 'Вершины',
                'type' => 'Люкс',
                'price' => 38000,
                'description' => 'Традиционная эстетика в современном исполнении. Интерьеры с использованием редких пород дерева и натурального камня.',
                'amenities' => ['Каминный зал', 'Библиотека', 'Винный шкаф', 'Теплый пол', 'Приватный лифт'],
                'images' => [
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2574&auto=format&fit=crop'
                ],
            ],
            [
                'name' => 'Empire Suite',
                'slug' => 'empire-suite',
                'collection' => 'Вершины',
                'type' => 'Люкс',
                'price' => 42000,
                'description' => 'Величественный номер для тех, кто ценит масштаб. Просторная гостиная, кабинет и спальня с видом на закат.',
                'amenities' => ['Рабочая зона', 'Акустика Bang & Olufsen', 'Меню подушек', 'Личная гардеробная'],
                'images' => [
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2574&auto=format&fit=crop'
                ],
            ],
            [
                'name' => 'Zenith Presidential',
                'slug' => 'zenith-presidential',
                'collection' => 'Вершины',
                'type' => 'Люкс',
                'price' => 55000,
                'description' => 'Президентский представительский номер. Максимальная приватность и технологическое оснащение последнего поколения.',
                'amenities' => ['Бронированные окна', 'Конференц-зона', 'Кухня шеф-повара', 'Тренажерный зал'],
                'images' => [
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2670&auto=format&fit=crop'
                ],
            ],

            // Коллекция «Гармония» (Близость к природе, полулюксы)
            [
                'name' => 'Forest Sanctuary',
                'slug' => 'forest-sanctuary',
                'collection' => 'Гармония',
                'type' => 'Полулюкс',
                'price' => 25000,
                'description' => 'Уютный полулюкс с панорамным балконом, выходящим прямо в гущу леса. Тишина и пение птиц.',
                'amenities' => ['Йога-мат', 'Телескоп', 'Зеленая зона в номере', 'Органическая косметика'],
                'images' => [
                    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2671&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2670&auto=format&fit=crop'
                ],
            ],
            [
                'name' => 'Alps Horizon',
                'slug' => 'alps-horizon',
                'collection' => 'Гармония',
                'type' => 'Полулюкс',
                'price' => 28000,
                'description' => 'Номер, где утро начинается с вида на заснеженные вершины. Светлые тона и мягкий текстиль.',
                'amenities' => ['Кофемашина Nespresso', 'Зона для чтения', 'Панорамный душ', 'Световой будильник'],
                'images' => [
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2670&auto=format&fit=crop'
                ],
            ],
            [
                'name' => 'River Edge',
                'slug' => 'river-edge',
                'collection' => 'Гармония',
                'type' => 'Полулюкс',
                'price' => 22000,
                'description' => 'Звук горной реки и прохлада леса. Идеальное место для восстановления сил и спокойного отдыха.',
                'amenities' => ['Звукоизоляция Pro', 'Сонная медитация', 'Терраса с гамаком', 'Ароматерапия'],
                'images' => [
                    'https://images.unsplash.com/photo-1560448194-44ed83109a96?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop'
                ],
            ],
            [
                'name' => 'Stone & Moss',
                'slug' => 'stone-moss',
                'collection' => 'Гармония',
                'type' => 'Полулюкс',
                'price' => 24000,
                'description' => 'Эко-дизайн с использованием мха и камня. Ощущение полного единения с кавказской природой.',
                'amenities' => ['Натуральные материалы', 'Очистка воздуха', 'Солевая лампа', 'Био-камин'],
                'images' => [
                    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1515362778563-6a89b7633f93?q=80&w=2670&auto=format&fit=crop'
                ],
            ],

            // Коллекция «Минимализм» (Технологичные стандарты)
            [
                'name' => 'Quantum Room',
                'slug' => 'quantum-room',
                'collection' => 'Минимализм',
                'type' => 'Стандарт',
                'price' => 15000,
                'description' => 'Технологичный стандарт для современного путешественника. Максимум функциональности, минимум лишних деталей.',
                'amenities' => ['Голосовое управление', 'Беспроводная зарядка', 'Smart Glass', 'Эргономичное кресло'],
                'images' => [
                    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop'
                ],
            ],
            [
                'name' => 'Cyber Lite',
                'slug' => 'cyber-lite',
                'collection' => 'Минимализм',
                'type' => 'Стандарт',
                'price' => 12000,
                'description' => 'Компактный и стильный номер с футуристичным дизайном и настраиваемым освещением.',
                'amenities' => ['RGB подсветка', 'USB-C порты везде', 'Apple TV', 'Высокоскоростной Wi-Fi 6'],
                'images' => [
                    'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?q=80&w=1974&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2574&auto=format&fit=crop'
                ],
            ],
            [
                'name' => 'Nexus Studio',
                'slug' => 'nexus-studio',
                'collection' => 'Минимализм',
                'type' => 'Стандарт',
                'price' => 14000,
                'description' => 'Идеальное пространство для работы и отдыха. Рациональное зонирование и современная эстетика.',
                'amenities' => ['Скрытая мебель', 'Паркет из дуба', 'Цифровой сейф', 'Компактная мини-кухня'],
                'images' => [
                    'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1554995207-c18c20360a59?q=80&w=2670&auto=format&fit=crop'
                ],
            ],
            [
                'name' => 'Element Standard',
                'slug' => 'element-standard',
                'collection' => 'Минимализм',
                'type' => 'Стандарт',
                'price' => 11000,
                'description' => 'Базовая роскошь. Всё, что нужно для комфортного пребывания в Bella, ничего лишнего.',
                'amenities' => ['Ортопедический матрас', 'Шторы Blackout', 'Мини-бар', 'Тропический душ'],
                'images' => [
                    'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop'
                ],
            ],
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
