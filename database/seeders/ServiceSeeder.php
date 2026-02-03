<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Service::truncate();

        $services = [
            [
                'slug' => 'golden-spa',
                'category' => 'spa',
                'title' => 'Golden Spa',
                'description' => 'Абсолютное расслабление с использованием золотой косметики и древних техник.',
                'detailed_description' => "Наш флагманский Golden Spa — это оазис спокойствия и гармонии. Мы предлагаем уникальные процедуры, вдохновленные философией золотого сечения и природными богатствами Адыгеи.\n\nКомплекс включает в себя индивидуальные спа-люксы с джакузи и панорамным видом на горы, а также термальную зону с финской сауной и хаммамом.",
                'image' => 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2670&auto=format&fit=crop',
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1591343395082-e201a8a27bfd?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1519823551278-64ac927acdbc?q=80&w=2574&auto=format&fit=crop'
                ]),
                'price' => 'от 5,000 ₽',
                'features' => json_encode(['Халаты премиум-класса', 'Чайная церемония', 'Золотая косметика', 'Приватный люкс']),
                'schedule' => '10:00 — 22:00'
            ],
            [
                'slug' => 'hammam-orient',
                'category' => 'spa',
                'title' => 'Хаммам "Orient"',
                'description' => 'Традиционный восточный ритуал очищения с мыльным массажем и пилингом кесе.',
                'detailed_description' => "Погрузитесь в атмосферу восточной сказки в нашем мраморном хаммаме. Ритуал 'Orient' — это не просто очищение тела, но и глубокая перезагрузка сознания.\n\nТеплый пар подготавливает кожу к бережному пилингу рукавичкой кесе, после чего следует облако мыльной пены и расслабляющий массаж.",
                'image' => 'https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=2670&auto=format&fit=crop',
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2670&auto=format&fit=crop'
                ]),
                'price' => '3,500 ₽',
                'features' => json_encode(['Пилинг кесе', 'Мыльный массаж', 'Травяной чай', 'Мраморный зал']),
                'schedule' => '11:00 — 21:00'
            ],
            [
                'slug' => 'infinity-pool',
                'category' => 'spa',
                'title' => 'Infinity Pool Lounge',
                'description' => 'Открытый подогреваемый бассейн с эффектом бесконечности и видом на Кавказский хребет.',
                'detailed_description' => "Наш легендарный Infinity Pool — это место, где вода сливается с небом. Подогреваемый до комфортной температуры даже зимой, он позволяет наслаждаться горными пейзажами в любое время года.\n\nК вашим услугам уютные дизайнерские шезлонги, сервис напитков и закусок прямо к бассейну.",
                'image' => 'https://images.unsplash.com/photo-1572331165267-85462a4acabe?q=80&w=2570&auto=format&fit=crop',
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?q=80&w=2574&auto=format&fit=crop'
                ]),
                'price' => 'Включено в проживание',
                'features' => json_encode(['Подогрев 30°C', 'Вид на горы', 'Pool Bar', 'Вечерняя подсветка']),
                'schedule' => '08:00 — 23:00'
            ],
            [
                'slug' => 'bella-restaurant',
                'category' => 'dining',
                'title' => 'Ресторан "Bella"',
                'description' => 'Авторская кухня от шеф-повара с акцентом на локальные продукты Адыгеи.',
                'detailed_description' => "Ресторан Bella — это место, где гастрономия встречается с искусством. Мы переосмысливаем традиционные рецепты Кавказа, используя современные кулинарные техники.\n\nВ основе нашего меню лежат сыры, мясо и травы с местных ферм, что гарантирует исключительную свежесть каждого блюда.",
                'image' => 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2670&auto=format&fit=crop',
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop'
                ]),
                'price' => 'Средний чек 4,500 ₽',
                'features' => json_encode(['Панорамные окна', 'Винная карта', 'Show-cooking', 'Детское меню']),
                'schedule' => '07:00 — 00:00'
            ],
            [
                'slug' => 'wine-tasting',
                'category' => 'dining',
                'title' => 'Винный Погреб',
                'description' => 'Дегустация эксклюзивных вин в атмосфере старинного погреба.',
                'detailed_description' => "Откройте для себя богатый мир виноделия в нашем аутентичном погребе. Наш сомелье проведет вас через лучшие терруары мира, от классики Бордо до смелых экспериментов российских виноделов.\n\nКаждая дегустация сопровождается идеально подобранным сетом авторских закусок и крафтовых сыров.",
                'image' => 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop',
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1566552881560-0be062e7e4e5?q=80&w=2570&auto=format&fit=crop'
                ]),
                'price' => '8,000 ₽ / чел',
                'features' => json_encode(['Услуги сомелье', 'Сет закусок', 'Редкие винтажи', 'Приватный зал']),
                'schedule' => 'По записи (с 18:00)'
            ],
            [
                'slug' => 'mountain-yoga',
                'category' => 'sport',
                'title' => 'Йога в Горах',
                'description' => 'Практики хатха-йоги и медитации на открытой террасе с панорамным видом.',
                'detailed_description' => "Обретите внутренний баланс в окружении величия Кавказа. Наши занятия йогой проходят на рассвете, когда горный воздух максимально чист, а природа только пробуждается.\n\nПрограмма подходит как для новичков, так и для опытных практиков. Мы предоставляем всё необходимое оборудование премиум-бренда Lululemon.",
                'image' => 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2574&auto=format&fit=crop',
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2520&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=2619&auto=format&fit=crop'
                ]),
                'price' => '2,500 ₽ / занятие',
                'features' => json_encode(['Инвентарь Lululemon', 'Горный чай', 'Рассветные сессии', 'Квалифицированный мастер']),
                'schedule' => '07:00 — 09:00'
            ],
            [
                'slug' => 'premium-gym',
                'category' => 'sport',
                'title' => 'Premium Gym',
                'description' => 'Тренажерный зал последнего поколения с оборудованием Technogym и персональным тренером.',
                'detailed_description' => "Зал оснащен новейшей линейкой тренажеров Technogym Artis. Панорамное остекление создает ощущение тренировки на вершине горы.\n\nСистема очистки воздуха поддерживает идеальный микроклимат, а наши персональные тренеры помогут вам достичь поставленных целей максимально эффективно.",
                'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop',
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2575&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1554344728-77ad90d6ed36?q=80&w=2670&auto=format&fit=crop'
                ]),
                'price' => 'Включено в проживание',
                'features' => json_encode(['Technogym Artis', 'Персональный тренинг', 'Фито-бар', 'Вид на горы']),
                'schedule' => 'Круглосуточно — 24/7'
            ],
            [
                'slug' => 'kids-club',
                'category' => 'concierge',
                'title' => 'Клуб "Лисья Нора"',
                'description' => 'Анимация и развивающие игры для детей в безопасном и вдохновляющем пространстве.',
                'detailed_description' => "Пока вы наслаждаетесь отдыхом, ваши дети совершают собственные открытия в мире Fox Den. Мы создали экологичное пространство для творчества, спорта и обучения.\n\nПрофессиональные педагоги и аниматоры организуют квесты на свежем воздухе, мастер-классы по рисованию и кулинарии.",
                'image' => 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop',
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1566453838084-7ec27e71b308?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=2670&auto=format&fit=crop'
                ]),
                'price' => '1,500 ₽ / час',
                'features' => json_encode(['Видеонаблюдение', 'Здоровый перекус', 'Кэнди-бар', 'Проф. анимация']),
                'schedule' => '09:00 — 21:00'
            ],
            [
                'slug' => 'vip-transfer',
                'category' => 'concierge',
                'title' => 'VIP Трансфер',
                'description' => 'Автомобили представительского класса и профессиональные водители для вашего комфорта.',
                'detailed_description' => "Ваше путешествие начинается с безупречного комфорта. Наш парк представлен автомобилями Mercedes-Benz S-Class и V-Class.\n\nМы организуем встречу в аэропорту, поездки по республике Адыгея и индивидуальные туристические маршруты на самом высоком уровне.",
                'image' => 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop',
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1562141993-27150e214d23?q=80&w=2669&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop'
                ]),
                'price' => 'от 12,000 ₽',
                'features' => json_encode(['Wi-Fi и вода', 'Детское кресло', 'Англоговорящий водитель', 'Ожидание до 1 часа']),
                'schedule' => 'Круглосуточно по запросу'
            ],
            [
                'slug' => 'helicopter-tour',
                'category' => 'concierge',
                'title' => 'Вертолетные Прогулки',
                'description' => 'Захватывающие полеты над плато Лаго-Наки и вершинами Фишт-Оштенского массива.',
                'detailed_description' => "Взгляните на величие Кавказа с высоты птичьего полета. Индивидуальный полет на вертолете — это самый яркий способ увидеть труднодоступные ледники, бирюзовые горные озера и бескрайние альпийские луга.\n\nПрограмма включает пикник на одной из панорамных вершин с видом на заповедные территории.",
                'image' => 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2574&auto=format&fit=crop',
                'gallery' => json_encode([
                    'https://images.unsplash.com/photo-1490604601814-c703e3dffc8c?q=80&w=2670&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop'
                ]),
                'price' => 'от 45,000 ₽',
                'features' => json_encode(['VIP Терминал', 'Пикник на вершине', 'Проф. пилот', 'Шампанское на борту']),
                'schedule' => 'По погодным условиям'
            ]
        ];

        foreach ($services as $service) {
            \App\Models\Service::create($service);
        }
    }
}
