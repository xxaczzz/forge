/* =============================================
   FORGE — Fitness Tracker
   Data layer, state management, and all views
============================================= */

// ============== DATA: EXERCISE LIBRARY ==============
// equipment — конкретный инвентарь, нужный для упражнения (хотя бы один из списка)
// video — YouTube ID для встроенного плеера с обучающим видео
const EXERCISES = [
  // ===== ГРУДЬ =====
  { id: 'bench-press', name: 'Жим штанги лёжа', muscle: 'chest', secondary: ['triceps', 'shoulders'],
    equipment: ['barbell', 'bench'], compound: true, video: 'rT7DgCr-3pg',
    description: 'Лягте на скамью, опустите штангу к середине груди, выжмите вверх. Лопатки сведены, ноги упёрты в пол.',
    tips: ['Не отрывайте таз от скамьи', 'Штанга движется по лёгкой дуге', 'Полный контроль негативной фазы'] },
  { id: 'db-bench', name: 'Жим гантелей лёжа', muscle: 'chest', secondary: ['triceps', 'shoulders'],
    equipment: ['dumbbells', 'bench'], compound: true, video: 'YQ2s_Y7g5Qk',
    description: 'Лягте на скамью с гантелями в руках. Опустите их к груди, выжмите вверх, сводя в верхней точке.',
    tips: ['Большая амплитуда, чем со штангой', 'Контроль в нижней точке', 'Не стукайте гантели'] },
  { id: 'incline-db-bench', name: 'Жим гантелей на наклонной', muscle: 'chest', secondary: ['shoulders', 'triceps'],
    equipment: ['dumbbells', 'bench-incline'], compound: true, video: '8iPEnn-ltC8',
    description: 'Скамья под углом 30°. Жмите гантели вверх, акцент на верх грудных мышц.',
    tips: ['Угол не более 45° — иначе нагрузится перед дельты', 'Сводите гантели вверху', 'Локти ниже плечевого сустава'] },
  { id: 'pushup', name: 'Отжимания', muscle: 'chest', secondary: ['triceps', 'shoulders', 'core'],
    equipment: [], compound: true, video: 'IODxDxX7oi4',
    description: 'Примите упор лёжа, опуститесь до касания грудью пола, отожмитесь. Тело — прямая линия.',
    tips: ['Локти под углом 45°', 'Напрягайте пресс', 'Не прогибайте поясницу'] },
  { id: 'pushup-wide', name: 'Отжимания широким хватом', muscle: 'chest', secondary: ['shoulders'],
    equipment: [], video: 'XPPfnSEATJA',
    description: 'Отжимания, но руки шире плеч. Акцент смещён на грудь, амплитуда меньше.',
    tips: ['Не разводите слишком широко — травма плеч', 'Грудью к полу', 'Тело прямое'] },
  { id: 'db-fly', name: 'Разводка гантелей', muscle: 'chest', secondary: ['shoulders'],
    equipment: ['dumbbells', 'bench'], video: 'eozdVDA78K0',
    description: 'Лёжа на скамье разводите руки с гантелями в стороны с лёгким сгибом в локтях, затем сводите обратно.',
    tips: ['Не опускайте слишком низко', 'Чувствуйте растяжение груди', 'Лёгкий вес, чистая техника'] },
  { id: 'band-press', name: 'Жим с резинкой', muscle: 'chest', secondary: ['triceps'],
    equipment: ['bands'], video: 'PJpnNakIDHk',
    description: 'Зацепите резинку за спиной. Жмите вперёд от груди, как при жиме штанги.',
    tips: ['Подберите натяжение', 'Полное сведение в финале', 'Контролируйте обратный путь'] },

  // ===== СПИНА =====
  { id: 'pullup', name: 'Подтягивания', muscle: 'back', secondary: ['biceps'],
    equipment: ['pullup-bar'], compound: true, video: 'eGo4IYlbE5g',
    description: 'Повисните на перекладине, подтянитесь до касания подбородком, опуститесь. Хват чуть шире плеч.',
    tips: ['Сводите лопатки', 'Без раскачиваний', 'Полная амплитуда'] },
  { id: 'chin-up', name: 'Подтягивания обратным хватом', muscle: 'back', secondary: ['biceps'],
    equipment: ['pullup-bar'], compound: true, video: 'brhRXlOhsAM',
    description: 'Хват ладонями к себе, на ширине плеч. Больше нагрузки на бицепс.',
    tips: ['Локти прижаты', 'Подбородок над перекладиной', 'Контроль негатива'] },
  { id: 'deadlift', name: 'Становая тяга', muscle: 'back', secondary: ['legs', 'core'],
    equipment: ['barbell'], compound: true, video: 'r4MzxtBKyNE',
    description: 'Штанга на полу. Наклонитесь, возьмитесь хватом чуть шире бёдер, выпрямитесь с прямой спиной.',
    tips: ['Спина прямая всегда', 'Штанга у голеней', 'Таз не вверх раньше груди'] },
  { id: 'bent-row', name: 'Тяга штанги в наклоне', muscle: 'back', secondary: ['biceps'],
    equipment: ['barbell'], compound: true, video: 'kBWAon7ItDw',
    description: 'Наклонитесь вперёд с прямой спиной, тяните штангу к животу, сводите лопатки.',
    tips: ['Корпус под 45°', 'Локти идут назад', 'Не раскачивайтесь'] },
  { id: 'db-row', name: 'Тяга гантели одной рукой', muscle: 'back', secondary: ['biceps'],
    equipment: ['dumbbells'], video: 'pYcpY20QaE8',
    description: 'Упритесь коленом и рукой в скамью (или табурет). Тяните гантель к поясу, опускайте до растяжения.',
    tips: ['Не поворачивайте корпус', 'Тянете локтем, не кистью', 'Пауза в верхней точке'] },
  { id: 'band-row', name: 'Тяга резинки сидя', muscle: 'back', secondary: ['biceps'],
    equipment: ['bands'], video: 'b1OJ7t0e2Tc',
    description: 'Сидя на полу, резинка вокруг ступней. Тяните рукоятки к животу, сводите лопатки.',
    tips: ['Спина прямая', 'Локти близко к корпусу', 'Чувствуйте сведение лопаток'] },
  { id: 'inv-row', name: 'Австралийские подтягивания', muscle: 'back', secondary: ['biceps'],
    equipment: ['pullup-bar'], video: 'KOaCM1HMCWE',
    description: 'Под низкой перекладиной. Тяните грудь к перекладине, тело прямое.',
    tips: ['Чем ниже корпус, тем сложнее', 'Сводите лопатки', 'Тело — линия'] },
  { id: 'kb-swing', name: 'Махи гирей', muscle: 'back', secondary: ['legs', 'core'],
    equipment: ['kettlebell'], compound: true, video: 'YSxHifyI6s8',
    description: 'Махи гирей от уровня колен до груди за счёт резкого разгибания таза.',
    tips: ['Сила из бёдер, не из рук', 'Спина прямая', 'Гиря — продолжение рук'] },

  // ===== НОГИ =====
  { id: 'squat', name: 'Приседания со штангой', muscle: 'legs', secondary: ['core'],
    equipment: ['barbell'], compound: true, video: 'ultWZbUMPL8',
    description: 'Штанга на плечах. Приседайте до параллели бёдер с полом, вставайте через пятки.',
    tips: ['Колени в сторону носков', 'Спина прямая', 'Глубокий вдох в нижней точке'] },
  { id: 'goblet-squat', name: 'Приседания с гантелью', muscle: 'legs', secondary: ['core'],
    equipment: ['dumbbells'], compound: true, video: 'MeIiIdhvXT4',
    description: 'Держите гантель у груди двумя руками. Приседайте глубоко, корпус вертикально.',
    tips: ['Локти внутри коленей', 'Глубокий присед', 'Грудь развёрнута'] },
  { id: 'lunges', name: 'Выпады с гантелями', muscle: 'legs', secondary: ['core'],
    equipment: ['dumbbells'], video: 'D7KaRcUTQeE',
    description: 'С гантелями в руках шагните вперёд, опуститесь до касания коленом пола, вернитесь.',
    tips: ['Колено не выходит за носок', 'Корпус вертикальный', 'Шаг достаточно широкий'] },
  { id: 'bw-squat', name: 'Приседания без веса', muscle: 'legs', secondary: ['core'],
    equipment: [], video: 'aclHkVaku9U',
    description: 'Приседайте до параллели бёдер с полом, руки перед собой, пятки от пола не отрывайте.',
    tips: ['Таз назад, как будто на стул', 'Темп медленный на опускание', 'Грудь развёрнута'] },
  { id: 'bw-lunges', name: 'Выпады без веса', muscle: 'legs', secondary: ['core'],
    equipment: [], video: 'QOVaHwm-Q6U',
    description: 'Шаг вперёд, опускание до касания коленом пола, возврат. Чередуйте ноги.',
    tips: ['Корпус прямо', 'Колено в линии стопы', 'Пятка опорной ноги прижата'] },
  { id: 'romanian', name: 'Румынская тяга', muscle: 'legs', secondary: ['back'],
    equipment: ['dumbbells', 'barbell'], compound: true, video: 'jEy_czb3RKA',
    description: 'С прямыми ногами (лёгкий сгиб) наклоняйтесь, опуская штангу/гантели вдоль ног до растяжения бицепса бедра.',
    tips: ['Спина прямая, таз назад', 'Вес идёт близко к ногам', 'Чувствуйте заднюю поверхность бедра'] },
  { id: 'bulgarian', name: 'Болгарские выпады', muscle: 'legs', secondary: ['core'],
    equipment: ['bench', 'dumbbells'], compound: true, video: '2C-uNgKwPLE',
    description: 'Задняя нога на скамье, передняя впереди. Опускайтесь до касания коленом пола.',
    tips: ['Большой шаг от скамьи', 'Корпус слегка наклонён', 'Вес на пятке передней ноги'] },
  { id: 'glute-bridge', name: 'Ягодичный мост', muscle: 'legs', secondary: ['core'],
    equipment: [], video: 'OUgsJ8-Vi0E',
    description: 'Лёжа на спине, согните ноги, поднимайте таз вверх, сжимая ягодицы.',
    tips: ['Пауза вверху 1-2 сек', 'Не прогибайте поясницу', 'Сжимайте ягодицы'] },

  // ===== ПЛЕЧИ =====
  { id: 'ohp', name: 'Жим штанги стоя', muscle: 'shoulders', secondary: ['triceps', 'core'],
    equipment: ['barbell'], compound: true, video: '2yjwXTZQDDI',
    description: 'Штанга на уровне груди. Выжмите над головой, руки полностью выпрямлены, опустите.',
    tips: ['Пресс напряжён', 'Не прогибайте поясницу', 'Локти чуть впереди грифа'] },
  { id: 'db-press', name: 'Жим гантелей сидя', muscle: 'shoulders', secondary: ['triceps'],
    equipment: ['dumbbells', 'bench'], compound: true, video: 'qEwKCR5JCog',
    description: 'Сидя на скамье с опорой, выжмите гантели над головой, сведите сверху, опустите к плечам.',
    tips: ['Прижмите спину к опоре', 'Не блокируйте локти резко', 'Контроль на опускании'] },
  { id: 'db-press-stand', name: 'Жим гантелей стоя', muscle: 'shoulders', secondary: ['triceps', 'core'],
    equipment: ['dumbbells'], compound: true, video: '6Z15_WdXmVw',
    description: 'Стоя, гантели у плеч. Выжмите вверх, опустите. Корпус стабильный.',
    tips: ['Пресс напряжён', 'Без прогиба поясницы', 'Полная амплитуда'] },
  { id: 'lateral-raise', name: 'Разводка гантелей в стороны', muscle: 'shoulders',
    equipment: ['dumbbells'], video: '3VcKaXpzqRo',
    description: 'Стоя с гантелями у бёдер, разводите руки в стороны до параллели с полом, опускайте.',
    tips: ['Лёгкий сгиб в локтях', 'Не поднимайте выше плеч', 'Медленно, без инерции'] },
  { id: 'pike-pushup', name: 'Отжимания "уголком"', muscle: 'shoulders', secondary: ['triceps'],
    equipment: [], video: 'EA8g7q9jauM',
    description: 'Упор руками, таз поднят высоко, опускайтесь головой вниз между рук.',
    tips: ['Угол около 90° между корпусом и ногами', 'Голова к полу', 'Локти назад'] },

  // ===== РУКИ =====
  { id: 'curl', name: 'Подъём гантелей на бицепс', muscle: 'biceps',
    equipment: ['dumbbells'], video: 'av7-8igSXTs',
    description: 'Стоя с гантелями в опущенных руках, сгибайте руки, поднимая вес к плечам. Локти прижаты.',
    tips: ['Не раскачивайте корпус', 'Полная амплитуда', 'Супинация кисти в верхней точке'] },
  { id: 'hammer-curl', name: 'Молотки на бицепс', muscle: 'biceps',
    equipment: ['dumbbells'], video: 'TwD-YGVP4Bk',
    description: 'Подъём гантелей нейтральным хватом (ладони друг к другу). Прокачивает плечевую мышцу.',
    tips: ['Кисти не вращаются', 'Локти у корпуса', 'Контроль на опускании'] },
  { id: 'band-curl', name: 'Сгибания с резинкой', muscle: 'biceps',
    equipment: ['bands'], video: 'vBGu6ofxmHo',
    description: 'Встаньте на резинку, держите рукоятки. Сгибайте руки к плечам.',
    tips: ['Локти прижаты', 'Полная амплитуда', 'Медленно опускайте'] },
  { id: 'tri-ext', name: 'Французский жим', muscle: 'triceps',
    equipment: ['dumbbells'], video: '_gsUck-7M9I',
    description: 'Лёжа или сидя, опускайте вес за голову, сгибая руки в локтях. Разгибайте обратно.',
    tips: ['Локти фиксированы', 'Плечи вертикально', 'Опускайте медленно'] },
  { id: 'dips', name: 'Отжимания на брусьях', muscle: 'triceps', secondary: ['chest', 'shoulders'],
    equipment: ['parallel-bars'], compound: true, video: '2z8JmcrW-As',
    description: 'На брусьях опуститесь на сгиб рук до 90°, отожмитесь вверх. Корпус вертикальный — трицепс.',
    tips: ['Локти назад', 'Не опускайтесь ниже комфорта плеч', 'Контроль спуска'] },
  { id: 'bench-dips', name: 'Обратные отжимания от скамьи', muscle: 'triceps', secondary: ['shoulders'],
    equipment: ['bench'], video: '6kALZikXxLc',
    description: 'Сидя на краю скамьи, руки сзади. Опуститесь, согнув руки до 90°, выжмитесь.',
    tips: ['Локти назад, не в стороны', 'Спина близко к скамье', 'Полная амплитуда'] },
  { id: 'diamond-pushup', name: 'Алмазные отжимания', muscle: 'triceps', secondary: ['chest'],
    equipment: [], video: 'J0DnG1_S92I',
    description: 'Отжимания с руками вместе под грудью (большие и указательные пальцы образуют ромб).',
    tips: ['Локти вдоль корпуса', 'Грудь к рукам', 'Тело прямое'] },

  // ===== ПРЕСС / КОР =====
  { id: 'plank', name: 'Планка', muscle: 'core',
    equipment: [], video: 'ASdvN_XEl_c', isTime: true,
    description: 'Упор на предплечья и носки, тело — прямая линия. Держите напряжение.',
    tips: ['Таз не проваливается', 'Пресс и ягодицы напряжены', 'Дышите ровно'] },
  { id: 'side-plank', name: 'Боковая планка', muscle: 'core',
    equipment: [], video: 'K2VljzCC16g', isTime: true,
    description: 'Упор на одно предплечье, тело боком к полу. Держите ровную линию.',
    tips: ['Таз вверх', 'Корпус прямой', 'Чередуйте стороны'] },
  { id: 'crunches', name: 'Скручивания', muscle: 'core',
    equipment: [], video: 'Xyd_fa5zoEU',
    description: 'Лёжа на спине, ноги согнуты, поднимайте корпус скручиванием, выдох наверху.',
    tips: ['Не тяните шею', 'Поясница прижата', 'Медленно на опускании'] },
  { id: 'leg-raise', name: 'Подъём ног лёжа', muscle: 'core',
    equipment: [], video: 'JB2oyawG9KI',
    description: 'Лёжа на спине, поднимайте прямые ноги до вертикали, опускайте, не касаясь пола.',
    tips: ['Поясница прижата', 'Контроль на опускании', 'Не раскачивайтесь'] },
  { id: 'mountain-climb', name: 'Альпинист', muscle: 'core', secondary: ['legs'],
    equipment: [], video: 'nmwgirgXLYM',
    description: 'Упор лёжа, поочерёдно подтягивайте колени к груди в быстром темпе.',
    tips: ['Таз стабилен', 'Дыхание ритмичное', 'Корпус прямой'] },
  { id: 'russian-twist', name: 'Русские скручивания', muscle: 'core',
    equipment: [], video: 'wkD8rjkodUI',
    description: 'Сидя, корпус откинут назад, ноги на весу. Поворачивайте корпус из стороны в сторону.',
    tips: ['С весом для усложнения', 'Поясница прямая', 'Поворот корпусом, не руками'] }
];

// Локализация групп мышц
const MUSCLE_NAMES = {
  chest: 'Грудь', back: 'Спина', legs: 'Ноги',
  shoulders: 'Плечи', biceps: 'Бицепс', triceps: 'Трицепс', core: 'Пресс'
};

// Конкретный инвентарь — отображается в опросе
const EQUIPMENT_NAMES = {
  'dumbbells': 'Гантели',
  'barbell': 'Штанга',
  'bench': 'Скамья (плоская)',
  'bench-incline': 'Скамья наклонная',
  'pullup-bar': 'Турник',
  'parallel-bars': 'Брусья',
  'bands': 'Резинки',
  'kettlebell': 'Гиря'
};

// Иконки для оборудования
const EQUIPMENT_ICONS = {
  'dumbbells': '🏋️',
  'barbell': '🏋️‍♂️',
  'bench': '🛋️',
  'bench-incline': '📐',
  'pullup-bar': '🔝',
  'parallel-bars': '🅿️',
  'bands': '🎗️',
  'kettlebell': '🔔'
};

// ============== STATE ==============
const STATE = {
  profile: null,
  history: [],
  currentWorkout: null,
  view: 'home',
  timer: null,
  lastBackup: 0,           // timestamp последнего экспорта
  storagePersistent: false, // дал ли браузер persistent storage
  workoutsSinceBackup: 0    // счётчик тренировок с последнего бэкапа
};

function save() {
  try {
    localStorage.setItem('forge-data', JSON.stringify({
      profile: STATE.profile,
      history: STATE.history,
      lastBackup: STATE.lastBackup,
      workoutsSinceBackup: STATE.workoutsSinceBackup
    }));
  } catch(e) {
    console.error(e);
    // Если localStorage переполнен — предупреждаем
    if (e.name === 'QuotaExceededError') {
      toast('Хранилище переполнено! Сделай бэкап и удали старые тренировки.');
    }
  }
}

function load() {
  try {
    const raw = localStorage.getItem('forge-data');
    if (raw) {
      const d = JSON.parse(raw);
      STATE.profile = d.profile || null;
      STATE.history = d.history || [];
      STATE.lastBackup = d.lastBackup || 0;
      STATE.workoutsSinceBackup = d.workoutsSinceBackup || 0;
    }
  } catch(e) { console.error(e); }
}

// ============== STORAGE PERSISTENCE ==============
// Запрашиваем у браузера persistent storage — данные не удалятся автоматически
async function requestPersistentStorage() {
  if (navigator.storage && navigator.storage.persist) {
    try {
      // Проверяем текущее состояние
      const isPersisted = await navigator.storage.persisted();
      if (isPersisted) {
        STATE.storagePersistent = true;
        return true;
      }
      // Запрашиваем
      const granted = await navigator.storage.persist();
      STATE.storagePersistent = granted;
      return granted;
    } catch(e) {
      console.warn('Persistent storage недоступен:', e);
      return false;
    }
  }
  return false;
}

// Получаем информацию о хранилище (использовано / доступно)
async function getStorageEstimate() {
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const est = await navigator.storage.estimate();
      return {
        usage: est.usage || 0,
        quota: est.quota || 0,
        percent: est.quota ? (est.usage / est.quota) * 100 : 0
      };
    } catch(e) { return null; }
  }
  return null;
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2200);
}

// ============== MUSCLE FATIGUE ==============
// Рассчитывает усталость мышц на основе последних 72 часов
function getMuscleFatigue() {
  const now = Date.now();
  const fatigue = {};
  Object.keys(MUSCLE_NAMES).forEach(m => fatigue[m] = 0);

  STATE.history.forEach(workout => {
    const age = (now - workout.date) / (1000 * 60 * 60); // в часах
    if (age > 96) return; // старше 4 дней — свежая мышца
    const decay = Math.max(0, 1 - age / 72); // линейное восстановление за 72ч

    workout.exercises.forEach(ex => {
      const exDef = EXERCISES.find(e => e.id === ex.exerciseId);
      if (!exDef) return;
      const completedSets = ex.sets.filter(s => s.completed).length;
      const load = completedSets * (exDef.compound ? 1.5 : 1);
      fatigue[exDef.muscle] = (fatigue[exDef.muscle] || 0) + load * decay;
      (exDef.secondary || []).forEach(m => {
        fatigue[m] = (fatigue[m] || 0) + load * decay * 0.4;
      });
    });
  });

  return fatigue;
}

function fatigueLevel(value) {
  if (value < 2) return 'fresh';
  if (value < 5) return 'moderate';
  if (value < 9) return 'fatigued';
  return 'exhausted';
}

// ============== EQUIPMENT FILTER ==============
// Упражнение доступно если у него нет требований (вес тела) или хоть один item есть
function exerciseAvailable(ex, userEquipment) {
  if (!ex.equipment || ex.equipment.length === 0) return true; // bodyweight
  return ex.equipment.some(eq => userEquipment.includes(eq));
}

// ============== WORKOUT GENERATION ==============
// Генерирует тренировку на день на основе усталости мышц и оборудования
function generateWorkout() {
  const equipment = STATE.profile?.equipment || [];
  const goal = STATE.profile?.goal || 'strength';
  const fatigue = getMuscleFatigue();

  // Отсортировать мышцы от самых свежих к уставшим
  const muscleOrder = Object.keys(MUSCLE_NAMES)
    .sort((a, b) => (fatigue[a] || 0) - (fatigue[b] || 0));

  // Выбираем 3 самые свежие группы мышц
  const targetMuscles = muscleOrder.slice(0, 3);

  // Фильтруем упражнения по оборудованию и целевым мышцам
  const available = EXERCISES.filter(ex =>
    exerciseAvailable(ex, equipment) &&
    (targetMuscles.includes(ex.muscle) || targetMuscles.includes(ex.secondary?.[0]))
  );

  // Приоритет compound упражнений в начале
  const picked = [];
  const usedMuscles = {};
  available.sort((a, b) => (b.compound ? 1 : 0) - (a.compound ? 1 : 0));

  for (const ex of available) {
    if ((usedMuscles[ex.muscle] || 0) >= 2) continue;
    picked.push(ex);
    usedMuscles[ex.muscle] = (usedMuscles[ex.muscle] || 0) + 1;
    if (picked.length >= 5) break;
  }

  // Если мало упражнений, добираем любые подходящие
  if (picked.length < 4) {
    for (const ex of available) {
      if (picked.includes(ex)) continue;
      picked.push(ex);
      if (picked.length >= 5) break;
    }
  }

  // Формируем сеты с прогрессией на основе истории
  return picked.map(ex => {
    const lastSets = getLastSets(ex.id);
    const sets = goal === 'endurance' ? 3 : 4;
    const reps = goal === 'strength' ? 6 : goal === 'endurance' ? 15 : 10;
    const suggestedWeight = lastSets.length
      ? Math.round((lastSets[0].weight + 2.5) * 2) / 2
      : (ex.equipment.length === 0 ? 0 : 10);

    return {
      exerciseId: ex.id,
      sets: Array.from({length: sets}, () => ({
        weight: suggestedWeight,
        reps: reps,
        completed: false
      }))
    };
  });
}

function getLastSets(exerciseId) {
  for (let i = STATE.history.length - 1; i >= 0; i--) {
    const w = STATE.history[i];
    const ex = w.exercises.find(e => e.exerciseId === exerciseId);
    if (ex) {
      return ex.sets.filter(s => s.completed);
    }
  }
  return [];
}

// ============== RENDER HELPERS ==============
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => [...(el || document).querySelectorAll(s)];
const el = (tag, attrs = {}, children = []) => {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c == null) return;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return e;
};

function render(html) {
  const s = document.getElementById('screen');
  s.innerHTML = html;
  return s;
}

function showNav(show) {
  document.getElementById('nav').classList.toggle('hidden', !show);
}

// Открытие модального окна
function openModal(html) {
  const m = document.getElementById('modal');
  document.getElementById('modal-content').innerHTML = html;
  m.classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  if (STATE.timer) {
    clearInterval(STATE.timer.interval);
    STATE.timer = null;
  }
}

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});

// ============== SVG ICONS FOR MUSCLES ==============
// Упрощённый вид тела спереди и сзади
function muscleBodySVG(fatigue) {
  const cls = m => `muscle-part ${fatigueLevel(fatigue[m] || 0)}`;
  return `
    <div class="muscle-body">
      <svg viewBox="0 0 120 240" xmlns="http://www.w3.org/2000/svg">
        <!-- Голова -->
        <circle cx="60" cy="20" r="12" fill="#2a2a2a" stroke="#383838" stroke-width="1"/>
        <!-- Шея -->
        <rect x="55" y="30" width="10" height="8" fill="#2a2a2a"/>
        <!-- Плечи -->
        <path class="${cls('shoulders')}" d="M30 40 Q25 42 22 50 L28 60 L40 55 L40 42 Z"/>
        <path class="${cls('shoulders')}" d="M90 40 Q95 42 98 50 L92 60 L80 55 L80 42 Z"/>
        <!-- Грудь -->
        <path class="${cls('chest')}" d="M40 42 L60 42 L60 75 L40 75 Z M60 42 L80 42 L80 75 L60 75 Z"/>
        <!-- Пресс -->
        <path class="${cls('core')}" d="M45 75 L75 75 L72 120 L48 120 Z"/>
        <!-- Бицепсы -->
        <path class="${cls('biceps')}" d="M22 50 L18 85 L28 90 L32 60 Z"/>
        <path class="${cls('biceps')}" d="M98 50 L102 85 L92 90 L88 60 Z"/>
        <!-- Предплечья -->
        <rect x="15" y="88" width="12" height="30" rx="4" fill="#2a2a2a"/>
        <rect x="93" y="88" width="12" height="30" rx="4" fill="#2a2a2a"/>
        <!-- Ноги (квадрицепсы) -->
        <path class="${cls('legs')}" d="M45 120 L42 180 L55 180 L57 120 Z"/>
        <path class="${cls('legs')}" d="M63 120 L65 180 L78 180 L75 120 Z"/>
        <!-- Голени -->
        <rect x="42" y="180" width="14" height="45" rx="4" fill="#2a2a2a"/>
        <rect x="64" y="180" width="14" height="45" rx="4" fill="#2a2a2a"/>
      </svg>
    </div>
    <div class="muscle-body">
      <svg viewBox="0 0 120 240" xmlns="http://www.w3.org/2000/svg">
        <!-- Голова сзади -->
        <circle cx="60" cy="20" r="12" fill="#2a2a2a" stroke="#383838" stroke-width="1"/>
        <rect x="55" y="30" width="10" height="8" fill="#2a2a2a"/>
        <!-- Плечи (трапеции) -->
        <path class="${cls('shoulders')}" d="M30 40 Q25 42 22 50 L28 60 L40 55 L40 42 Z"/>
        <path class="${cls('shoulders')}" d="M90 40 Q95 42 98 50 L92 60 L80 55 L80 42 Z"/>
        <!-- Спина -->
        <path class="${cls('back')}" d="M40 42 L80 42 L80 110 L40 110 Z"/>
        <!-- Трицепсы -->
        <path class="${cls('triceps')}" d="M22 50 L18 85 L28 90 L32 60 Z"/>
        <path class="${cls('triceps')}" d="M98 50 L102 85 L92 90 L88 60 Z"/>
        <!-- Предплечья -->
        <rect x="15" y="88" width="12" height="30" rx="4" fill="#2a2a2a"/>
        <rect x="93" y="88" width="12" height="30" rx="4" fill="#2a2a2a"/>
        <!-- Ягодицы/низ спины -->
        <path class="${cls('legs')}" d="M42 110 L78 110 L75 130 L45 130 Z"/>
        <!-- Задняя поверхность бедра -->
        <path class="${cls('legs')}" d="M45 130 L42 180 L55 180 L57 130 Z"/>
        <path class="${cls('legs')}" d="M63 130 L65 180 L78 180 L75 130 Z"/>
        <rect x="42" y="180" width="14" height="45" rx="4" fill="#2a2a2a"/>
        <rect x="64" y="180" width="14" height="45" rx="4" fill="#2a2a2a"/>
      </svg>
    </div>
  `;
}

// ============== ONBOARDING ==============
let onboardData = { goal: null, equipment: [], experience: null, step: 0 };

function renderOnboarding() {
  showNav(false);
  const steps = [
    // Шаг 1: цель
    {
      title: 'FORGE',
      sub: 'Умный дневник тренировок.\nПоехали настроим под тебя.',
      button: 'Начать',
      action: () => { onboardData.step = 1; renderOnboarding(); }
    },
    // Шаг 2: цель
    {
      title: 'Какая цель?',
      sub: 'Мы подберём нагрузку под неё.',
      options: [
        { id: 'strength', icon: '🏋️', name: 'Сила', desc: 'Тяжёлые веса, 4-6 повторений' },
        { id: 'muscle', icon: '💪', name: 'Масса', desc: 'Средние веса, 8-12 повторений' },
        { id: 'endurance', icon: '🔥', name: 'Выносливость', desc: 'Лёгкие веса, 15+ повторений' },
        { id: 'general', icon: '✨', name: 'Общая форма', desc: 'Баланс и здоровье' }
      ],
      field: 'goal'
    },
    // Шаг 3: оборудование (детальный список)
    {
      title: 'Что у тебя есть?',
      sub: 'Отметь весь доступный инвентарь.\nБез инвентаря — тоже работает.',
      multi: true,
      options: [
        { id: 'dumbbells', icon: '🏋️', name: 'Гантели', desc: 'Разборные или фиксированные' },
        { id: 'barbell', icon: '🏋️‍♂️', name: 'Штанга', desc: 'Гриф + блины' },
        { id: 'bench', icon: '🛋️', name: 'Скамья', desc: 'Горизонтальная' },
        { id: 'bench-incline', icon: '📐', name: 'Скамья наклонная', desc: 'С регулировкой угла' },
        { id: 'pullup-bar', icon: '🔝', name: 'Турник', desc: 'Дома или на улице' },
        { id: 'parallel-bars', icon: '🅿️', name: 'Брусья', desc: 'Для отжиманий' },
        { id: 'bands', icon: '🎗️', name: 'Резинки', desc: 'Эспандер, фитнес-резинки' },
        { id: 'kettlebell', icon: '🔔', name: 'Гиря', desc: 'Любого веса' }
      ],
      field: 'equipment',
      optional: true // можно пропустить — будут только упражнения с весом тела
    },
    // Шаг 4: опыт
    {
      title: 'Опыт тренировок?',
      sub: 'Подберём стартовые веса.',
      options: [
        { id: 'beginner', icon: '🌱', name: 'Новичок', desc: 'Меньше года' },
        { id: 'intermediate', icon: '🔥', name: 'Средний', desc: '1-3 года регулярно' },
        { id: 'advanced', icon: '⚡', name: 'Продвинутый', desc: '3+ года' }
      ],
      field: 'experience'
    }
  ];

  const step = steps[onboardData.step];

  let html = `<div class="onboard"><div class="onboard-step">`;

  if (onboardData.step === 0) {
    html += `
      <div style="text-align:center;margin-bottom:32px;">
        <div class="logo-mark" style="margin:0 auto 20px;width:48px;height:48px;"></div>
      </div>
      <h1 class="onboard-title">${step.title}</h1>
      <p class="onboard-sub" style="white-space:pre-line;">${step.sub}</p>
      <button class="btn btn-primary btn-block btn-lg" onclick="onboardData.step=1;renderOnboarding()">${step.button}</button>
    `;
  } else {
    const progress = (onboardData.step / (steps.length - 1)) * 100;
    html += `
      <div class="progress-bar" style="margin-bottom:32px;"><div class="progress-bar-fill" style="width:${progress}%"></div></div>
      <div class="eyebrow" style="margin-bottom:8px;">Шаг ${onboardData.step} из ${steps.length - 1}</div>
      <h1 class="onboard-title">${step.title}</h1>
      <p class="onboard-sub">${step.sub}</p>
    `;

    step.options.forEach(opt => {
      const selected = step.multi
        ? onboardData[step.field].includes(opt.id)
        : onboardData[step.field] === opt.id;
      html += `
        <button class="option-btn ${selected ? 'selected' : ''}" onclick="selectOption('${step.field}', '${opt.id}', ${!!step.multi})">
          <span class="option-icon">${opt.icon}</span>
          <span style="flex:1;">
            <strong>${opt.name}</strong>
            <span class="option-desc">${opt.desc}</span>
          </span>
          ${selected ? '<span style="color:var(--accent);">✓</span>' : ''}
        </button>
      `;
    });

    const canContinue = step.optional ? true : (step.multi
      ? onboardData[step.field].length > 0
      : !!onboardData[step.field]);
    const isLast = onboardData.step === steps.length - 1;

    html += `
      <div style="margin-top:24px;display:flex;gap:10px;">
        <button class="btn btn-ghost" onclick="onboardData.step--;renderOnboarding()">Назад</button>
        <button class="btn btn-primary" style="flex:1;" ${canContinue ? '' : 'disabled style="opacity:0.4;flex:1;"'} onclick="${isLast ? 'finishOnboarding()' : 'onboardData.step++;renderOnboarding()'}">
          ${isLast ? 'Готово' : 'Далее'}
        </button>
      </div>
    `;
  }

  html += `</div></div>`;
  render(html);
}

function selectOption(field, value, multi) {
  if (multi) {
    const arr = onboardData[field];
    const i = arr.indexOf(value);
    if (i >= 0) arr.splice(i, 1);
    else arr.push(value);
  } else {
    onboardData[field] = value;
  }
  renderOnboarding();
}

function finishOnboarding() {
  STATE.profile = {
    goal: onboardData.goal,
    equipment: onboardData.equipment,
    experience: onboardData.experience,
    createdAt: Date.now()
  };
  save();
  STATE.view = 'home';
  renderApp();
  // Запрашиваем защиту хранилища — самое подходящее время, юзер только что вложился
  requestPersistentStorage();
}

// ============== HOME SCREEN ==============
function renderHome() {
  const fatigue = getMuscleFatigue();
  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });

  const streakDays = calculateStreak();
  const thisWeek = STATE.history.filter(w => Date.now() - w.date < 7 * 24 * 60 * 60 * 1000).length;
  const totalVolume = STATE.history.reduce((s, w) =>
    s + w.exercises.reduce((a, e) =>
      a + e.sets.filter(x => x.completed).reduce((b, x) => b + x.weight * x.reps, 0), 0), 0);

  render(`
    <div class="screen">
      <div class="header">
        <div class="logo"><span class="logo-mark"></span> FORGE</div>
        <button class="btn-icon" onclick="openSettings()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </button>
      </div>

      ${renderBackupBadge()}

      <div class="today-banner">
        <div class="eyebrow">${today}</div>
        <div class="today-title">Тренировка дня</div>
        <div class="today-sub">На основе восстановления твоих мышц и истории</div>
        <button class="btn btn-primary btn-block btn-lg" onclick="startWorkout()">
          Начать тренировку
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
      </div>

      <div class="stat-grid">
        <div class="stat">
          <div class="stat-value">${streakDays}</div>
          <div class="stat-label">Дней подряд</div>
        </div>
        <div class="stat">
          <div class="stat-value">${thisWeek}</div>
          <div class="stat-label">За неделю</div>
        </div>
        <div class="stat">
          <div class="stat-value">${STATE.history.length}</div>
          <div class="stat-label">Всего тренировок</div>
        </div>
        <div class="stat">
          <div class="stat-value">${formatVolume(totalVolume)}</div>
          <div class="stat-label">Общий тоннаж</div>
        </div>
      </div>

      <h3 class="section-title">
        Восстановление мышц
        <span class="count" onclick="openMuscleHelp()" style="cursor:pointer;">?</span>
      </h3>
      <div class="card">
        <div class="muscle-map">
          ${muscleBodySVG(fatigue)}
        </div>
        <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:12px;">
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">
            <span class="legend-dot" style="background:var(--muscle-fresh)"></span>Готова
          </div>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">
            <span class="legend-dot" style="background:var(--muscle-moderate)"></span>Средне
          </div>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">
            <span class="legend-dot" style="background:var(--muscle-fatigued)"></span>Устала
          </div>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">
            <span class="legend-dot" style="background:var(--muscle-exhausted)"></span>Отдых
          </div>
        </div>
      </div>

      ${STATE.history.length > 0 ? `
        ${renderTopPRs()}
        <h3 class="section-title">Последние тренировки <span class="count">${STATE.history.length}</span></h3>
        ${STATE.history.slice(-3).reverse().map(w => renderWorkoutCard(w)).join('')}
      ` : ''}
    </div>
  `);
}

// Бэйдж напоминания о бэкапе на главной (показывается только когда нужно)
function renderBackupBadge() {
  // Не показываем если данных мало
  if (STATE.history.length < 5) return '';

  const daysSince = STATE.lastBackup
    ? (Date.now() - STATE.lastBackup) / (1000 * 60 * 60 * 24)
    : Infinity;

  // Показываем если бэкап старше 14 дней или его никогда не было
  if (daysSince < 14) return '';

  const isFirst = !STATE.lastBackup;
  const text = isFirst
    ? `${STATE.history.length} тренировок без бэкапа`
    : `Бэкап давно не обновлялся`;

  return `
    <div onclick="exportData()" style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg-elev-2);border:1px solid var(--warning);border-radius:12px;margin-bottom:12px;cursor:pointer;">
      <span style="font-size:18px;">💾</span>
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;font-weight:600;">${text}</div>
        <div style="font-size:11px;color:var(--text-dim);font-family:var(--font-mono);">Тапни чтобы скачать</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted);">
        <path d="M9 6l6 6-6 6"/>
      </svg>
    </div>
  `;
}

// Возвращает блок топ-PR для отображения на главной
function renderTopPRs() {
  // Собираем PR по всем упражнениям
  const allPRs = {};
  STATE.history.forEach(w => {
    w.exercises.forEach(e => {
      const def = EXERCISES.find(x => x.id === e.exerciseId);
      if (!def) return;
      e.sets.forEach(s => {
        if (!s.completed || s.weight === 0) return;
        if (!allPRs[e.exerciseId] || s.weight > allPRs[e.exerciseId].weight) {
          allPRs[e.exerciseId] = {
            name: def.name,
            weight: s.weight,
            reps: s.reps,
            date: w.date
          };
        }
      });
    });
  });

  const top = Object.values(allPRs)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3);

  if (top.length === 0) return '';

  return `
    <h3 class="section-title">
      <span style="display:flex;align-items:center;gap:8px;">
        <span>🏆</span> Личные рекорды
      </span>
      <span class="count">топ ${top.length}</span>
    </h3>
    <div class="card">
      ${top.map((pr, i) => `
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;${i < top.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}">
          <div style="font-family:var(--font-display);color:var(--accent);font-size:24px;width:30px;">${i + 1}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${pr.name}</div>
            <div style="color:var(--text-muted);font-size:12px;font-family:var(--font-mono);">${new Date(pr.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:var(--font-display);color:var(--accent);font-size:18px;line-height:1;">${pr.weight}кг</div>
            <div style="color:var(--text-muted);font-size:11px;font-family:var(--font-mono);">× ${pr.reps}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function calculateStreak() {
  if (STATE.history.length === 0) return 0;
  const dates = [...new Set(STATE.history.map(w =>
    new Date(w.date).toDateString()))].sort((a, b) => new Date(b) - new Date(a));
  let streak = 0;
  let cursor = new Date();
  for (const d of dates) {
    const diff = (cursor - new Date(d)) / (1000 * 60 * 60 * 24);
    if (diff < 2) { streak++; cursor = new Date(d); }
    else break;
  }
  return streak;
}

function formatVolume(kg) {
  if (kg < 1000) return Math.round(kg);
  if (kg < 1000000) return (kg / 1000).toFixed(1) + 'к';
  return (kg / 1000000).toFixed(1) + 'М';
}

function renderWorkoutCard(w) {
  const date = new Date(w.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  const duration = w.duration ? Math.round(w.duration / 60) + ' мин' : '';
  const totalSets = w.exercises.reduce((s, e) => s + e.sets.filter(x => x.completed).length, 0);
  return `
    <div class="card" onclick="showWorkoutDetails(${w.date})" style="cursor:pointer;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
        <div>
          <div style="font-weight:700;font-size:16px;">${date}</div>
          <div style="color:var(--text-dim);font-size:13px;margin-top:2px;">
            ${w.exercises.length} упр. · ${totalSets} подх. ${duration ? '· ' + duration : ''}
          </div>
        </div>
        <div class="eyebrow" style="background:var(--accent-glow);color:var(--accent);padding:4px 8px;border-radius:6px;">Готово</div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        ${w.exercises.slice(0, 3).map(ex => {
          const def = EXERCISES.find(e => e.id === ex.exerciseId);
          return `<span class="pill">${def?.name || ex.exerciseId}</span>`;
        }).join('')}
        ${w.exercises.length > 3 ? `<span class="pill">+${w.exercises.length - 3}</span>` : ''}
      </div>
    </div>
  `;
}


// ============== WORKOUT SCREEN ==============
function startWorkout() {
  STATE.currentWorkout = {
    date: Date.now(),
    startedAt: Date.now(),
    exercises: generateWorkout()
  };
  STATE.view = 'workout';
  renderApp();
}

function renderWorkout() {
  if (!STATE.currentWorkout) {
    STATE.view = 'home';
    renderApp();
    return;
  }

  const w = STATE.currentWorkout;
  const totalSets = w.exercises.reduce((s, e) => s + e.sets.length, 0);
  const doneSets = w.exercises.reduce((s, e) => s + e.sets.filter(x => x.completed).length, 0);
  const progress = totalSets > 0 ? (doneSets / totalSets) * 100 : 0;
  const elapsed = Math.round((Date.now() - w.startedAt) / 60000);

  render(`
    <div class="screen">
      <div class="header">
        <button class="btn-icon" onclick="confirmExitWorkout()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div>
          <div class="eyebrow" style="text-align:center;">Тренировка</div>
          <div style="font-family:var(--font-mono);color:var(--text-dim);font-size:13px;text-align:center;">${elapsed} мин</div>
        </div>
        <button class="btn-icon" onclick="finishWorkout()" style="background:var(--accent);color:#0a0a0a;border:none;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </button>
      </div>

      <div class="progress-bar">
        <div class="progress-bar-fill" style="width:${progress}%"></div>
      </div>
      <div class="eyebrow" style="text-align:center;margin-bottom:16px;">
        ${doneSets} / ${totalSets} подходов · ${Math.round(progress)}%
      </div>

      ${w.exercises.map((ex, idx) => renderExerciseBlock(ex, idx)).join('')}

      <div style="margin-top:20px;">
        <button class="btn btn-secondary btn-block" onclick="openAddExercise()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Добавить упражнение
        </button>
      </div>

      <div style="margin-top:20px;">
        <button class="btn btn-primary btn-block btn-lg" onclick="finishWorkout()">
          Завершить тренировку
        </button>
      </div>
    </div>
  `);
}

function renderExerciseBlock(ex, idx) {
  const def = EXERCISES.find(e => e.id === ex.exerciseId);
  if (!def) return '';

  const lastSets = getLastSets(ex.exerciseId);
  const lastHint = lastSets.length
    ? `Последний раз: ${lastSets[0].weight}кг × ${lastSets[0].reps}`
    : 'Первая тренировка';

  return `
    <div class="card" style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
        <div style="flex:1;">
          <div class="eyebrow" style="margin-bottom:4px;">${MUSCLE_NAMES[def.muscle]}${def.compound ? ' · база' : ''}</div>
          <div style="font-weight:700;font-size:18px;line-height:1.2;">${def.name}</div>
          <div style="color:var(--text-dim);font-size:12px;margin-top:4px;font-family:var(--font-mono);">${lastHint}</div>
        </div>
        <div style="display:flex;gap:6px;">
          ${def.video ? `
            <button class="btn-icon" onclick="showExerciseInfo('${def.id}')" style="width:36px;height:36px;" title="Смотреть видео">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="6 4 20 12 6 20 6 4" fill="currentColor"/>
              </svg>
            </button>
          ` : ''}
          <button class="btn-icon" onclick="swapExercise(${idx})" style="width:36px;height:36px;" title="Заменить">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="set-row" style="border-bottom:1px solid var(--border);padding-bottom:8px;margin-bottom:4px;">
        <div class="eyebrow" style="font-size:10px;">#</div>
        <div class="eyebrow" style="font-size:10px;text-align:center;">${def.isTime ? 'СЕКУНДЫ' : 'КГ'}</div>
        <div class="eyebrow" style="font-size:10px;text-align:center;">${def.isTime ? 'РАУНДЫ' : 'ПОВТОРЫ'}</div>
        <div></div>
      </div>

      ${ex.sets.map((set, si) => `
        <div class="set-row">
          <div class="set-num">${si + 1}</div>
          <input type="number" class="set-input" value="${set.weight}" step="0.5" min="0"
                 onchange="updateSet(${idx}, ${si}, 'weight', this.value)">
          <input type="number" class="set-input" value="${set.reps}" min="0"
                 onchange="updateSet(${idx}, ${si}, 'reps', this.value)">
          <button class="set-check ${set.completed ? 'checked' : ''}" onclick="toggleSet(${idx}, ${si})">
            ${set.completed ? `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            ` : ''}
          </button>
        </div>
      `).join('')}

      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="btn btn-ghost btn-sm" style="flex:1;" onclick="addSet(${idx})">+ Подход</button>
        ${ex.sets.length > 1 ? `<button class="btn btn-ghost btn-sm" onclick="removeSet(${idx})">− Подход</button>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="removeExercise(${idx})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

function updateSet(exIdx, setIdx, field, value) {
  STATE.currentWorkout.exercises[exIdx].sets[setIdx][field] = parseFloat(value) || 0;
}

function toggleSet(exIdx, setIdx) {
  const set = STATE.currentWorkout.exercises[exIdx].sets[setIdx];
  set.completed = !set.completed;
  renderWorkout();
  if (set.completed) {
    const restTime = STATE.profile?.goal === 'strength' ? 180 :
                     STATE.profile?.goal === 'endurance' ? 45 : 90;
    openRestTimer(restTime);
  }
}

function addSet(exIdx) {
  const ex = STATE.currentWorkout.exercises[exIdx];
  const last = ex.sets[ex.sets.length - 1];
  ex.sets.push({ weight: last.weight, reps: last.reps, completed: false });
  renderWorkout();
}

function removeSet(exIdx) {
  const ex = STATE.currentWorkout.exercises[exIdx];
  if (ex.sets.length > 1) ex.sets.pop();
  renderWorkout();
}

function removeExercise(exIdx) {
  if (confirm('Убрать упражнение?')) {
    STATE.currentWorkout.exercises.splice(exIdx, 1);
    renderWorkout();
  }
}

function confirmExitWorkout() {
  const hasProgress = STATE.currentWorkout.exercises.some(e => e.sets.some(s => s.completed));
  if (!hasProgress || confirm('Выйти без сохранения?')) {
    STATE.currentWorkout = null;
    STATE.view = 'home';
    renderApp();
  }
}

function finishWorkout() {
  const w = STATE.currentWorkout;
  if (!w) return;
  const hasProgress = w.exercises.some(e => e.sets.some(s => s.completed));
  if (!hasProgress) {
    if (!confirm('Тренировка пустая. Всё равно сохранить?')) return;
  }

  // Сначала показываем заметки, потом сохраняем и проверяем PR
  showWorkoutNotes(w, () => {
    completeWorkoutSave();
  });
}

function completeWorkoutSave() {
  const w = STATE.currentWorkout;
  if (!w) return;

  w.duration = Math.round((Date.now() - w.startedAt) / 1000);
  // Фильтруем упражнения — оставляем только те, где есть выполненные подходы
  w.exercises = w.exercises.filter(e => e.sets.some(s => s.completed));

  if (w.exercises.length === 0) {
    STATE.currentWorkout = null;
    STATE.view = 'home';
    renderApp();
    return;
  }

  // Детект PR — ДО добавления в историю
  const prs = detectPRs(w);

  STATE.history.push(w);
  STATE.workoutsSinceBackup = (STATE.workoutsSinceBackup || 0) + 1;
  save();
  STATE.currentWorkout = null;

  // Финальный коллбэк — что делаем после всех модалок
  const goHome = () => {
    STATE.view = 'home';
    renderApp();
    // После перехода на главную — проверяем нужно ли напомнить про бэкап
    if (checkBackupReminder()) {
      setTimeout(() => showBackupReminder(), 800);
    }
  };

  if (prs.length > 0) {
    // Сохраняем PR в state на случай показа в истории
    w.prs = prs;
    save();
    // Покажем празднование, потом перейдём на главную
    showPRCelebration(prs, goHome);
  } else {
    toast('Тренировка сохранена 💪');
    goHome();
  }
}

// ============== REST TIMER ==============
function openRestTimer(seconds) {
  const total = seconds;
  let remaining = seconds;

  const update = () => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    const display = `${m}:${s.toString().padStart(2, '0')}`;
    const progress = ((total - remaining) / total) * 100;
    const display_el = document.getElementById('timer-display');
    const progress_el = document.getElementById('timer-progress');
    if (display_el) display_el.textContent = display;
    if (progress_el) progress_el.style.width = progress + '%';
    if (remaining <= 0) {
      clearInterval(STATE.timer.interval);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ==');
      try { audio.play(); } catch(e){}
      closeModal();
      toast('Отдых закончен!');
    }
  };

  openModal(`
    <div class="eyebrow" style="text-align:center;">Отдых</div>
    <div class="timer-display" id="timer-display">${Math.floor(seconds/60)}:${(seconds%60).toString().padStart(2,'0')}</div>
    <div class="timer-progress">
      <div class="timer-progress-bar" id="timer-progress" style="width:0%"></div>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <button class="btn btn-secondary" style="flex:1;" onclick="adjustTimer(-15)">−15с</button>
      <button class="btn btn-secondary" style="flex:1;" onclick="adjustTimer(15)">+15с</button>
    </div>
    <button class="btn btn-primary btn-block" onclick="closeModal()">Пропустить</button>
  `);

  STATE.timer = {
    interval: setInterval(() => { remaining--; update(); }, 1000),
    getRemaining: () => remaining,
    adjust: (delta) => { remaining = Math.max(1, remaining + delta); update(); }
  };
}

function adjustTimer(delta) {
  if (STATE.timer) STATE.timer.adjust(delta);
}

// ============== EXERCISE LIBRARY ==============
function renderExerciseLibrary() {
  const allMuscles = ['all', ...Object.keys(MUSCLE_NAMES)];
  const activeFilter = window._exerciseFilter || 'all';
  const search = window._exerciseSearch || '';

  const filtered = EXERCISES.filter(e => {
    if (activeFilter !== 'all' && e.muscle !== activeFilter) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  render(`
    <div class="screen">
      <div class="header">
        <div>
          <div class="eyebrow">Библиотека</div>
          <div style="font-family:var(--font-display);font-size:24px;">Упражнения</div>
        </div>
        <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">${EXERCISES.length} упр.</div>
      </div>

      <input type="text" placeholder="Поиск упражнения..." value="${search}"
             oninput="window._exerciseSearch = this.value; renderExerciseLibrary()"
             style="margin-bottom:16px;">

      <div class="scroll-x">
        ${allMuscles.map(m => `
          <button class="pill ${activeFilter === m ? 'active' : ''}" style="flex-shrink:0;cursor:pointer;border:none;"
                  onclick="window._exerciseFilter='${m}';renderExerciseLibrary()">
            ${m === 'all' ? 'Все' : MUSCLE_NAMES[m]}
          </button>
        `).join('')}
      </div>

      ${filtered.length === 0 ? `
        <div class="empty">
          <div class="empty-icon">🔍</div>
          <div>Ничего не найдено</div>
        </div>
      ` : filtered.map(ex => `
        <div class="exercise-item" onclick="showExerciseInfo('${ex.id}')">
          <div class="exercise-icon">${ex.name[0]}</div>
          <div class="exercise-info">
            <div class="exercise-name">${ex.name}</div>
            <div class="exercise-meta">
              <span>${MUSCLE_NAMES[ex.muscle]}</span>
              ${ex.compound ? '<span>• база</span>' : ''}
              <span>• ${ex.equipment.length === 0 ? 'без инвентаря' : ex.equipment.map(e => EQUIPMENT_NAMES[e]).join(', ')}</span>
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted);">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </div>
      `).join('')}
    </div>
  `);
}

function showExerciseInfo(exId) {
  const ex = EXERCISES.find(e => e.id === exId);
  if (!ex) return;

  const lastSets = getLastSets(exId);
  const history = STATE.history
    .flatMap(w => w.exercises.filter(e => e.exerciseId === exId)
      .map(e => ({ date: w.date, sets: e.sets.filter(s => s.completed) })))
    .filter(h => h.sets.length > 0)
    .slice(-10);

  const maxWeight = history.length
    ? Math.max(...history.flatMap(h => h.sets.map(s => s.weight)))
    : 0;

  openModal(`
    <div class="eyebrow">${MUSCLE_NAMES[ex.muscle]}${ex.compound ? ' · базовое' : ''}</div>
    <h2 class="modal-title">${ex.name}</h2>

    ${ex.video ? `
      <div style="position:relative;width:100%;padding-bottom:56.25%;background:#000;border-radius:12px;overflow:hidden;margin-bottom:16px;">
        <iframe
          src="https://www.youtube.com/embed/${ex.video}?rel=0&modestbranding=1"
          style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"></iframe>
      </div>
    ` : ''}

    <div style="background:var(--bg-elev-2);padding:14px;border-radius:12px;margin-bottom:16px;">
      <div style="font-size:14px;line-height:1.5;color:var(--text-dim);">${ex.description}</div>
    </div>

    <div class="eyebrow" style="margin-bottom:8px;">Советы по технике</div>
    <ul style="list-style:none;padding:0;margin-bottom:16px;">
      ${ex.tips.map(t => `
        <li style="padding:8px 0;border-bottom:1px solid var(--border);display:flex;gap:10px;font-size:14px;">
          <span style="color:var(--accent);">—</span>
          <span>${t}</span>
        </li>
      `).join('')}
    </ul>

    ${history.length > 0 ? `
      <div class="eyebrow" style="margin-bottom:8px;">Прогресс (последние 10)</div>
      <div style="background:var(--bg-elev-2);border-radius:12px;padding:12px;margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <div>
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">РЕКОРД</div>
            <div style="font-family:var(--font-display);font-size:24px;color:var(--accent);">${maxWeight} кг</div>
          </div>
          <div>
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">ПОСЛЕДНИЙ</div>
            <div style="font-family:var(--font-display);font-size:24px;">${lastSets[0]?.weight || 0} кг</div>
          </div>
        </div>
        ${renderMiniChart(history.map(h => Math.max(...h.sets.map(s => s.weight))))}
      </div>
    ` : ''}

    ${STATE.currentWorkout ? `
      <button class="btn btn-primary btn-block" onclick="addExerciseToWorkout('${ex.id}');closeModal();">
        Добавить в тренировку
      </button>
    ` : ''}
    <button class="btn btn-ghost btn-block" style="margin-top:8px;" onclick="closeModal()">Закрыть</button>
  `);
}

function renderMiniChart(values) {
  if (values.length < 2) return '';
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 280;
    const y = 50 - ((v - min) / range) * 40;
    return `${x},${y}`;
  }).join(' ');
  return `
    <svg viewBox="0 0 280 60" style="width:100%;height:60px;">
      <polyline points="${points}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      ${values.map((v, i) => {
        const x = (i / (values.length - 1)) * 280;
        const y = 50 - ((v - min) / range) * 40;
        return `<circle cx="${x}" cy="${y}" r="3" fill="var(--accent)"/>`;
      }).join('')}
    </svg>
  `;
}

function openAddExercise() {
  const equipment = STATE.profile?.equipment || [];
  const available = EXERCISES.filter(ex => exerciseAvailable(ex, equipment));

  openModal(`
    <div class="eyebrow">Добавить</div>
    <h2 class="modal-title">Выбери упражнение</h2>
    <input type="text" placeholder="Поиск..." id="add-ex-search"
           oninput="filterAddExercise(this.value)" style="margin-bottom:12px;">
    <div id="add-ex-list" style="max-height:50vh;overflow-y:auto;">
      ${available.map(ex => `
        <div class="exercise-item add-ex-item" data-name="${ex.name.toLowerCase()}"
             onclick="addExerciseToWorkout('${ex.id}');closeModal()">
          <div class="exercise-icon">${ex.name[0]}</div>
          <div class="exercise-info">
            <div class="exercise-name">${ex.name}</div>
            <div class="exercise-meta"><span>${MUSCLE_NAMES[ex.muscle]}</span></div>
          </div>
        </div>
      `).join('')}
    </div>
    <button class="btn btn-ghost btn-block" style="margin-top:12px;" onclick="closeModal()">Отмена</button>
  `);
}

function filterAddExercise(q) {
  const items = $$('.add-ex-item');
  const query = q.toLowerCase();
  items.forEach(i => {
    i.style.display = i.dataset.name.includes(query) ? '' : 'none';
  });
}

function addExerciseToWorkout(exId) {
  if (!STATE.currentWorkout) {
    startWorkout();
  }
  const ex = EXERCISES.find(e => e.id === exId);
  const lastSets = getLastSets(exId);
  const sets = STATE.profile?.goal === 'endurance' ? 3 : 4;
  const reps = STATE.profile?.goal === 'strength' ? 6 : STATE.profile?.goal === 'endurance' ? 15 : 10;
  const weight = lastSets.length ? lastSets[0].weight :
    (ex.equipment.length === 0 ? 0 : 10);

  STATE.currentWorkout.exercises.push({
    exerciseId: exId,
    sets: Array.from({length: sets}, () => ({ weight, reps, completed: false }))
  });
  if (STATE.view === 'workout') renderWorkout();
  else { STATE.view = 'workout'; renderApp(); }
}


// ============== STATS SCREEN ==============
function renderStats() {
  if (STATE.history.length === 0) {
    render(`
      <div class="screen">
        <div class="header">
          <div>
            <div class="eyebrow">Аналитика</div>
            <div style="font-family:var(--font-display);font-size:24px;">Прогресс</div>
          </div>
        </div>
        <div class="empty">
          <div class="empty-icon">📊</div>
          <div style="font-weight:600;color:var(--text);margin-bottom:4px;">Пока пусто</div>
          <div>Данные появятся после первой тренировки</div>
          <button class="btn btn-primary" style="margin-top:20px;" onclick="startWorkout()">
            Начать первую тренировку
          </button>
        </div>
      </div>
    `);
    return;
  }

  // Объём за последние 4 недели по неделям
  const now = Date.now();
  const weeks = [];
  for (let i = 3; i >= 0; i--) {
    const start = now - (i + 1) * 7 * 24 * 60 * 60 * 1000;
    const end = now - i * 7 * 24 * 60 * 60 * 1000;
    const workouts = STATE.history.filter(w => w.date >= start && w.date < end);
    const volume = workouts.reduce((s, w) =>
      s + w.exercises.reduce((a, e) =>
        a + e.sets.filter(x => x.completed).reduce((b, x) => b + x.weight * x.reps, 0), 0), 0);
    weeks.push({ count: workouts.length, volume });
  }

  // Распределение по группам мышц
  const muscleStats = {};
  Object.keys(MUSCLE_NAMES).forEach(m => muscleStats[m] = 0);
  STATE.history.forEach(w => {
    w.exercises.forEach(e => {
      const def = EXERCISES.find(x => x.id === e.exerciseId);
      if (def) {
        muscleStats[def.muscle] = (muscleStats[def.muscle] || 0) + e.sets.filter(s => s.completed).length;
      }
    });
  });
  const totalMuscleSets = Object.values(muscleStats).reduce((a, b) => a + b, 0);

  // Топ упражнений
  const exerciseCounts = {};
  STATE.history.forEach(w => {
    w.exercises.forEach(e => {
      exerciseCounts[e.exerciseId] = (exerciseCounts[e.exerciseId] || 0) + 1;
    });
  });
  const topExercises = Object.entries(exerciseCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxVol = Math.max(...weeks.map(w => w.volume), 1);

  render(`
    <div class="screen">
      <div class="header">
        <div>
          <div class="eyebrow">Аналитика</div>
          <div style="font-family:var(--font-display);font-size:24px;">Прогресс</div>
        </div>
      </div>

      <h3 class="section-title">Объём по неделям</h3>
      <div class="card">
        <svg class="chart" viewBox="0 0 300 180" preserveAspectRatio="none">
          ${weeks.map((w, i) => {
            const barW = 60;
            const gap = (300 - barW * 4) / 5;
            const x = gap + i * (barW + gap);
            const h = (w.volume / maxVol) * 140;
            const y = 160 - h;
            return `
              <rect class="chart-bar ${i === weeks.length - 1 ? 'active' : ''}"
                    x="${x}" y="${y}" width="${barW}" height="${h}" rx="4"/>
              <text x="${x + barW/2}" y="175" text-anchor="middle"
                    style="fill:var(--text-muted);font-size:10px;font-family:var(--font-mono);">
                ${i === 3 ? 'Сейчас' : `-${3-i}н`}
              </text>
              ${w.volume > 0 ? `
                <text x="${x + barW/2}" y="${y - 4}" text-anchor="middle"
                      style="fill:var(--text-dim);font-size:10px;font-family:var(--font-mono);">
                  ${formatVolume(w.volume)}
                </text>
              ` : ''}
            `;
          }).join('')}
        </svg>
      </div>

      <h3 class="section-title">Баланс мышц</h3>
      <div class="card">
        ${Object.entries(muscleStats).filter(([_, v]) => v > 0).map(([m, v]) => {
          const pct = totalMuscleSets > 0 ? (v / totalMuscleSets) * 100 : 0;
          return `
            <div style="margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:13px;">
                <span style="font-weight:600;">${MUSCLE_NAMES[m]}</span>
                <span style="font-family:var(--font-mono);color:var(--text-dim);">${v} подх · ${Math.round(pct)}%</span>
              </div>
              <div style="height:6px;background:var(--bg-elev-3);border-radius:3px;overflow:hidden;">
                <div style="height:100%;background:var(--accent);width:${pct}%;transition:width 0.3s;"></div>
              </div>
            </div>
          `;
        }).join('') || '<div class="empty" style="padding:20px 0;">Нет данных</div>'}
      </div>

      ${topExercises.length > 0 ? `
        <h3 class="section-title">Любимые упражнения</h3>
        <div class="card">
          ${topExercises.map(([id, count], i) => {
            const ex = EXERCISES.find(e => e.id === id);
            if (!ex) return '';
            return `
              <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);" onclick="showExerciseInfo('${id}')">
                <div style="font-family:var(--font-display);color:var(--accent);font-size:20px;width:24px;">${i + 1}</div>
                <div style="flex:1;">
                  <div style="font-weight:600;font-size:14px;">${ex.name}</div>
                  <div style="color:var(--text-dim);font-size:12px;">${MUSCLE_NAMES[ex.muscle]}</div>
                </div>
                <div style="font-family:var(--font-mono);color:var(--text-dim);font-size:13px;">${count}×</div>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}

      <h3 class="section-title">История <span class="count">${STATE.history.length}</span></h3>
      ${STATE.history.slice().reverse().map(w => renderWorkoutCard(w)).join('')}
    </div>
  `);
}

function showWorkoutDetails(date) {
  const w = STATE.history.find(x => x.date === date);
  if (!w) return;

  const dateStr = new Date(w.date).toLocaleDateString('ru-RU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  const duration = w.duration ? Math.round(w.duration / 60) + ' мин' : '';
  const totalVolume = w.exercises.reduce((s, e) =>
    s + e.sets.filter(x => x.completed).reduce((a, x) => a + x.weight * x.reps, 0), 0);

  openModal(`
    <div class="eyebrow">${dateStr}</div>
    <h2 class="modal-title">Тренировка</h2>

    <div class="stat-grid">
      <div class="stat">
        <div class="stat-value" style="font-size:20px;">${duration || '—'}</div>
        <div class="stat-label">Длительность</div>
      </div>
      <div class="stat">
        <div class="stat-value" style="font-size:20px;">${formatVolume(totalVolume)}</div>
        <div class="stat-label">Объём кг</div>
      </div>
    </div>

    ${w.prs && w.prs.length > 0 ? `
      <div style="background:linear-gradient(135deg, var(--accent-glow), transparent);border:1px solid var(--accent);border-radius:14px;padding:14px;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="font-size:20px;">🏆</span>
          <span class="eyebrow" style="color:var(--accent);">${w.prs.length} ${w.prs.length === 1 ? 'рекорд' : 'рекорда'} в этот день</span>
        </div>
        ${w.prs.map(pr => `
          <div style="font-size:13px;padding:4px 0;">
            <strong>${pr.name}:</strong>
            ${pr.type === 'weight' ? `${pr.newValue}кг × ${pr.reps}` : `${pr.weight}кг × ${pr.newValue}`}
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${w.notes && (w.notes.mood || w.notes.text) ? `
      <div style="background:var(--bg-elev-2);border-radius:12px;padding:14px;margin-bottom:12px;">
        ${w.notes.mood ? `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:${w.notes.text ? '8px' : '0'};">
            <span style="font-size:24px;">${['😩','😕','😐','🙂','💪'][w.notes.mood - 1]}</span>
            <span style="color:var(--text-dim);font-size:13px;">Самочувствие</span>
          </div>
        ` : ''}
        ${w.notes.text ? `
          <div style="color:var(--text-dim);font-size:14px;line-height:1.4;font-style:italic;">"${w.notes.text}"</div>
        ` : ''}
      </div>
    ` : ''}

    ${w.exercises.map(ex => {
      const def = EXERCISES.find(e => e.id === ex.exerciseId);
      const sets = ex.sets.filter(s => s.completed);
      if (!def || sets.length === 0) return '';
      return `
        <div style="padding:12px 0;border-bottom:1px solid var(--border);">
          <div style="font-weight:700;margin-bottom:6px;">${def.name}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${sets.map(s => `
              <span class="pill" style="font-size:12px;">${s.weight}кг × ${s.reps}</span>
            `).join('')}
          </div>
        </div>
      `;
    }).join('')}

    <div style="display:flex;gap:8px;margin-top:16px;">
      <button class="btn btn-ghost" style="flex:1;" onclick="deleteWorkout(${w.date})">
        Удалить
      </button>
      <button class="btn btn-primary" style="flex:1;" onclick="closeModal()">Закрыть</button>
    </div>
  `);
}

function deleteWorkout(date) {
  if (!confirm('Удалить тренировку?')) return;
  STATE.history = STATE.history.filter(w => w.date !== date);
  save();
  closeModal();
  renderApp();
  toast('Тренировка удалена');
}

// ============== SETTINGS ==============
async function openSettings() {
  // Подгружаем актуальные данные о хранилище
  const estimate = await getStorageEstimate();
  const isPersisted = navigator.storage && navigator.storage.persisted
    ? await navigator.storage.persisted()
    : false;
  STATE.storagePersistent = isPersisted;

  const lastBackupText = STATE.lastBackup
    ? new Date(STATE.lastBackup).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'никогда';

  const daysSince = STATE.lastBackup
    ? Math.round((Date.now() - STATE.lastBackup) / (1000 * 60 * 60 * 24))
    : null;

  const backupStatusColor = !STATE.lastBackup ? 'var(--warning)' :
    daysSince > 30 ? 'var(--warning)' : 'var(--success)';

  const usageText = estimate
    ? `${(estimate.usage / 1024).toFixed(1)} КБ из ~${(estimate.quota / 1024 / 1024).toFixed(0)} МБ`
    : 'недоступно';

  openModal(`
    <div class="eyebrow">Профиль</div>
    <h2 class="modal-title">Настройки</h2>

    <label>Цель</label>
    <select onchange="STATE.profile.goal=this.value;save()" style="margin-bottom:16px;">
      <option value="strength" ${STATE.profile.goal === 'strength' ? 'selected' : ''}>Сила</option>
      <option value="muscle" ${STATE.profile.goal === 'muscle' ? 'selected' : ''}>Масса</option>
      <option value="endurance" ${STATE.profile.goal === 'endurance' ? 'selected' : ''}>Выносливость</option>
      <option value="general" ${STATE.profile.goal === 'general' ? 'selected' : ''}>Общая форма</option>
    </select>

    <label>Инвентарь</label>
    <div style="margin-bottom:16px;">
      ${Object.entries(EQUIPMENT_NAMES).map(([id, name]) => `
        <label style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg-elev-2);border-radius:10px;margin-bottom:6px;cursor:pointer;">
          <input type="checkbox" ${STATE.profile.equipment.includes(id) ? 'checked' : ''}
                 onchange="toggleEquipment('${id}')" style="width:auto;"/>
          <span style="font-size:18px;">${EQUIPMENT_ICONS[id] || ''}</span>
          <span style="text-transform:none;letter-spacing:0;font-size:14px;font-weight:500;color:var(--text);">${name}</span>
        </label>
      `).join('')}
    </div>

    <label>Опыт</label>
    <select onchange="STATE.profile.experience=this.value;save()" style="margin-bottom:24px;">
      <option value="beginner" ${STATE.profile.experience === 'beginner' ? 'selected' : ''}>Новичок</option>
      <option value="intermediate" ${STATE.profile.experience === 'intermediate' ? 'selected' : ''}>Средний</option>
      <option value="advanced" ${STATE.profile.experience === 'advanced' ? 'selected' : ''}>Продвинутый</option>
    </select>

    <!-- ===== БЛОК ХРАНЕНИЯ ДАННЫХ ===== -->
    <div style="border-top:1px solid var(--border);padding-top:16px;margin-bottom:16px;">
      <div class="eyebrow" style="margin-bottom:12px;">💾 Хранение данных</div>

      <!-- Persistent storage статус -->
      <div style="background:var(--bg-elev-2);border-radius:12px;padding:14px;margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="font-size:13px;font-weight:600;">Защита от автоудаления</div>
          <span style="font-family:var(--font-mono);font-size:11px;color:${isPersisted ? 'var(--success)' : 'var(--warning)'};">
            ${isPersisted ? '✓ ВКЛЮЧЕНО' : '⚠ ВЫКЛ'}
          </span>
        </div>
        <p style="color:var(--text-dim);font-size:12px;line-height:1.4;margin-bottom:${isPersisted ? '0' : '10px'};">
          ${isPersisted
            ? 'Браузер не будет автоматически удалять твои данные. Удалить можно только вручную в настройках сайта.'
            : 'Браузер может удалить данные при нехватке места. Включи защиту, чтобы этого избежать.'}
        </p>
        ${!isPersisted ? `
          <button class="btn btn-secondary btn-sm" onclick="enablePersistentStorage()" style="width:100%;">
            Включить защиту
          </button>
        ` : ''}
      </div>

      <!-- Бэкапы -->
      <div style="background:var(--bg-elev-2);border-radius:12px;padding:14px;margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="font-size:13px;font-weight:600;">Последний бэкап</div>
          <span style="font-family:var(--font-mono);font-size:11px;color:${backupStatusColor};">
            ${lastBackupText}${daysSince !== null && daysSince > 0 ? ` (${daysSince} дн)` : ''}
          </span>
        </div>
        <p style="color:var(--text-dim);font-size:12px;line-height:1.4;margin-bottom:10px;">
          Размер данных: ${usageText}
        </p>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-secondary btn-sm" onclick="exportData()" style="flex:1;">
            ⬇ Скачать
          </button>
          <button class="btn btn-secondary btn-sm" onclick="importData()" style="flex:1;">
            ⬆ Загрузить
          </button>
        </div>
      </div>
    </div>

    <button class="btn btn-ghost btn-block" onclick="resetAll()" style="color:var(--danger);margin-bottom:8px;">Сбросить всё</button>
    <button class="btn btn-primary btn-block" onclick="closeModal()">Готово</button>
  `);
}

async function enablePersistentStorage() {
  const granted = await requestPersistentStorage();
  if (granted) {
    toast('✓ Защита включена');
  } else {
    toast('Браузер не предоставил защиту. Делай бэкапы регулярно.');
  }
  // Перерисовываем настройки чтобы обновить статус
  setTimeout(() => openSettings(), 300);
}

function toggleEquipment(id) {
  const arr = STATE.profile.equipment;
  const i = arr.indexOf(id);
  if (i >= 0) arr.splice(i, 1);
  else arr.push(id);
  save();
}

function openMuscleHelp() {
  openModal(`
    <h2 class="modal-title">Восстановление мышц</h2>
    <p style="color:var(--text-dim);line-height:1.5;margin-bottom:16px;">
      Показывает, какие группы мышц готовы к нагрузке, а каким нужен отдых.
      Рассчитывается на основе твоих тренировок за последние 72 часа.
    </p>
    <p style="color:var(--text-dim);line-height:1.5;margin-bottom:16px;">
      Чем ярче красный — тем больше отдыхай. Тренировка дня автоматически подбирается на самые свежие группы.
    </p>
    <button class="btn btn-primary btn-block" onclick="closeModal()">Понятно</button>
  `);
}

function exportData() {
  const data = JSON.stringify({
    profile: STATE.profile,
    history: STATE.history,
    exportedAt: new Date().toISOString(),
    version: 1
  }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `forge-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);

  // Обновляем счётчики
  STATE.lastBackup = Date.now();
  STATE.workoutsSinceBackup = 0;
  save();
  toast('✓ Бэкап сохранён');
}

// ============== IMPORT BACKUP ==============
function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json,.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        // Базовая валидация
        if (!data.profile && !data.history) {
          toast('Файл не похож на бэкап FORGE');
          return;
        }

        // Спрашиваем стратегию: заменить или объединить
        const hasExistingData = STATE.history.length > 0 || STATE.profile;
        if (hasExistingData) {
          showImportDialog(data);
        } else {
          applyImport(data, 'replace');
        }
      } catch(err) {
        toast('Не удалось прочитать файл');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function showImportDialog(data) {
  const importedWorkouts = (data.history || []).length;
  const currentWorkouts = STATE.history.length;
  const importedDate = data.exportedAt
    ? new Date(data.exportedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'неизвестно';

  openModal(`
    <div class="eyebrow">Импорт данных</div>
    <h2 class="modal-title">Что делать?</h2>

    <div style="background:var(--bg-elev-2);border-radius:12px;padding:14px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;">
        <span style="color:var(--text-dim);">В файле:</span>
        <span style="font-family:var(--font-mono);font-weight:700;">${importedWorkouts} трен. от ${importedDate}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:13px;">
        <span style="color:var(--text-dim);">Сейчас:</span>
        <span style="font-family:var(--font-mono);font-weight:700;">${currentWorkouts} трен.</span>
      </div>
    </div>

    <button class="option-btn" onclick="applyImport(${JSON.stringify(data).replace(/"/g, '&quot;')}, 'merge')">
      <span class="option-icon">🔀</span>
      <span style="flex:1;">
        <strong>Объединить</strong>
        <span class="option-desc">Сохранить и текущие, и из бэкапа (по дате)</span>
      </span>
    </button>

    <button class="option-btn" onclick="applyImport(${JSON.stringify(data).replace(/"/g, '&quot;')}, 'replace')">
      <span class="option-icon">⚠️</span>
      <span style="flex:1;">
        <strong style="color:var(--danger);">Заменить</strong>
        <span class="option-desc">Стереть текущие данные и восстановить из бэкапа</span>
      </span>
    </button>

    <button class="btn btn-ghost btn-block" style="margin-top:12px;" onclick="closeModal()">Отмена</button>
  `);
}

function applyImport(data, mode) {
  if (mode === 'replace') {
    if (STATE.history.length > 0 && !confirm('Стереть все текущие данные?')) {
      closeModal();
      return;
    }
    STATE.profile = data.profile || STATE.profile;
    STATE.history = data.history || [];
  } else if (mode === 'merge') {
    // Объединяем по дате — уникальность по timestamp
    const existing = new Set(STATE.history.map(w => w.date));
    const newWorkouts = (data.history || []).filter(w => !existing.has(w.date));
    STATE.history = [...STATE.history, ...newWorkouts].sort((a, b) => a.date - b.date);
    if (!STATE.profile && data.profile) {
      STATE.profile = data.profile;
    }
  }

  save();
  closeModal();
  STATE.view = 'home';
  renderApp();

  const count = (data.history || []).length;
  toast(mode === 'merge'
    ? `✓ Импортировано (объединено)`
    : `✓ Импортировано: ${count} трен.`);
}

// ============== BACKUP REMINDER ==============
// Проверяет нужно ли напомнить о бэкапе после тренировки
function checkBackupReminder() {
  // Напоминаем каждые 10 тренировок ИЛИ если прошло >30 дней с последнего бэкапа
  const REMIND_EVERY_WORKOUTS = 10;
  const REMIND_AFTER_DAYS = 30;

  const daysSinceBackup = STATE.lastBackup
    ? (Date.now() - STATE.lastBackup) / (1000 * 60 * 60 * 24)
    : Infinity;

  const shouldRemind =
    STATE.workoutsSinceBackup >= REMIND_EVERY_WORKOUTS ||
    (STATE.history.length >= 3 && daysSinceBackup > REMIND_AFTER_DAYS);

  if (!shouldRemind) return false;

  return true;
}

function showBackupReminder(onContinue) {
  const days = STATE.lastBackup
    ? Math.round((Date.now() - STATE.lastBackup) / (1000 * 60 * 60 * 24))
    : null;
  const isFirst = !STATE.lastBackup;

  openModal(`
    <div style="text-align:center;margin-bottom:8px;">
      <div style="font-size:48px;margin-bottom:8px;">💾</div>
      <div class="eyebrow">Защити свой прогресс</div>
    </div>
    <h2 class="modal-title" style="text-align:center;">Сделай бэкап</h2>
    <p style="color:var(--text-dim);font-size:14px;line-height:1.5;text-align:center;margin-bottom:20px;">
      ${isFirst
        ? `У тебя уже ${STATE.history.length} ${STATE.history.length === 1 ? 'тренировка' : 'тренировки'}. Скачай файл-бэкап, чтобы не потерять прогресс при очистке кеша браузера.`
        : `С последнего бэкапа прошло ${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}. Время сохранить свежую копию.`}
    </p>

    <button class="btn btn-primary btn-block btn-lg" onclick="exportData();closeModal();(${onContinue ? onContinue.toString() : 'function(){}'})()">
      Скачать бэкап
    </button>
    <button class="btn btn-ghost btn-block" style="margin-top:8px;" onclick="snoozeBackup();closeModal();(${onContinue ? onContinue.toString() : 'function(){}'})()">
      Напомнить позже
    </button>
  `);
}

function snoozeBackup() {
  // Сбрасываем счётчик чтобы не доставать сразу — напомним через ещё 5 трен
  STATE.workoutsSinceBackup = Math.max(0, STATE.workoutsSinceBackup - 5);
  save();
}

function resetAll() {
  if (!confirm('Удалить ВСЕ данные? Это необратимо.')) return;
  if (!confirm('Точно уверен?')) return;
  localStorage.removeItem('forge-data');
  STATE.profile = null;
  STATE.history = [];
  STATE.currentWorkout = null;
  closeModal();
  renderApp();
}

// ============== SWAP EXERCISE ==============
// Заменяет упражнение на другое для той же группы мышц
function swapExercise(idx) {
  const current = STATE.currentWorkout.exercises[idx];
  const currentDef = EXERCISES.find(e => e.id === current.exerciseId);
  if (!currentDef) return;

  const equipment = STATE.profile?.equipment || [];
  const usedIds = STATE.currentWorkout.exercises.map(e => e.exerciseId);

  // Альтернативы: та же мышца, другое упражнение, не уже в тренировке, доступное оборудование
  const alternatives = EXERCISES.filter(ex =>
    ex.muscle === currentDef.muscle &&
    ex.id !== current.exerciseId &&
    !usedIds.includes(ex.id) &&
    exerciseAvailable(ex, equipment)
  );

  if (alternatives.length === 0) {
    toast('Нет альтернатив для этой группы');
    return;
  }

  openModal(`
    <div class="eyebrow">Заменить упражнение</div>
    <h2 class="modal-title">${currentDef.name} →</h2>
    <p style="color:var(--text-dim);font-size:13px;margin-bottom:16px;">
      Альтернативы для группы «${MUSCLE_NAMES[currentDef.muscle]}»
    </p>
    <div style="max-height:50vh;overflow-y:auto;">
      ${alternatives.map(alt => `
        <div class="exercise-item" onclick="confirmSwap(${idx}, '${alt.id}')">
          <div class="exercise-icon">${alt.name[0]}</div>
          <div class="exercise-info">
            <div class="exercise-name">${alt.name}</div>
            <div class="exercise-meta">
              ${alt.compound ? '<span>база</span>' : '<span>изоляция</span>'}
              ${alt.equipment.length === 0 ? '<span>• без инвентаря</span>' :
                '<span>• ' + alt.equipment.map(e => EQUIPMENT_NAMES[e]).join(', ') + '</span>'}
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted);">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </div>
      `).join('')}
    </div>
    <button class="btn btn-ghost btn-block" style="margin-top:12px;" onclick="closeModal()">Отмена</button>
  `);
}

function confirmSwap(idx, newExId) {
  const current = STATE.currentWorkout.exercises[idx];
  const lastSets = getLastSets(newExId);
  const newEx = EXERCISES.find(e => e.id === newExId);

  // Сохраняем количество подходов, обновляем вес/повторы
  const sets = current.sets.length;
  const reps = STATE.profile?.goal === 'strength' ? 6 : STATE.profile?.goal === 'endurance' ? 15 : 10;
  const weight = lastSets.length ? lastSets[0].weight :
    (newEx.equipment.length === 0 ? 0 : 10);

  STATE.currentWorkout.exercises[idx] = {
    exerciseId: newExId,
    sets: Array.from({length: sets}, () => ({ weight, reps, completed: false }))
  };

  closeModal();
  renderWorkout();
  toast('Упражнение заменено');
}

// ============== PERSONAL RECORDS (PR) ==============
// Возвращает PR (рекордный 1ПМ-эквивалент) для упражнения по истории
function getExercisePR(exerciseId, beforeDate = Infinity) {
  let maxWeight = 0;
  let maxReps = 0;
  let maxVolume = 0; // вес × повторы

  STATE.history.forEach(w => {
    if (w.date >= beforeDate) return;
    w.exercises.forEach(e => {
      if (e.exerciseId !== exerciseId) return;
      e.sets.forEach(s => {
        if (!s.completed) return;
        if (s.weight > maxWeight) maxWeight = s.weight;
        if (s.reps > maxReps && s.weight === maxWeight) maxReps = s.reps;
        const vol = s.weight * s.reps;
        if (vol > maxVolume) maxVolume = vol;
      });
    });
  });

  return { weight: maxWeight, reps: maxReps, volume: maxVolume };
}

// Проверяет тренировку на новые рекорды
function detectPRs(workout) {
  const prs = [];

  workout.exercises.forEach(e => {
    const def = EXERCISES.find(x => x.id === e.exerciseId);
    if (!def) return;

    const oldPR = getExercisePR(e.exerciseId, workout.date);

    e.sets.forEach(s => {
      if (!s.completed) return;
      // Новый рекорд по весу
      if (s.weight > oldPR.weight && s.weight > 0) {
        prs.push({
          type: 'weight',
          exerciseId: e.exerciseId,
          name: def.name,
          oldValue: oldPR.weight,
          newValue: s.weight,
          reps: s.reps
        });
      }
      // Новый рекорд по объёму одного подхода
      const vol = s.weight * s.reps;
      if (vol > oldPR.volume && vol > 0 && s.weight === oldPR.weight) {
        prs.push({
          type: 'reps',
          exerciseId: e.exerciseId,
          name: def.name,
          oldValue: oldPR.reps,
          newValue: s.reps,
          weight: s.weight
        });
      }
    });
  });

  // Дедупликация: одно упражнение — один PR
  const seen = new Set();
  return prs.filter(pr => {
    const key = pr.exerciseId + '-' + pr.type;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Показывает экран PR после тренировки
function showPRCelebration(prs, onClose) {
  openModal(`
    <div style="text-align:center;padding:8px 0;">
      <div style="font-size:64px;margin-bottom:8px;">🏆</div>
      <div class="eyebrow" style="color:var(--accent);">Новый рекорд!</div>
      <h2 class="modal-title" style="margin-top:8px;">
        ${prs.length === 1 ? 'Личный рекорд' : prs.length + ' личных рекорда'}
      </h2>
    </div>
    <div style="margin:16px 0;">
      ${prs.map(pr => `
        <div style="background:linear-gradient(135deg, var(--accent-glow), transparent);border:1px solid var(--accent);border-radius:14px;padding:16px;margin-bottom:10px;">
          <div style="font-weight:700;font-size:16px;margin-bottom:6px;">${pr.name}</div>
          ${pr.type === 'weight' ? `
            <div style="display:flex;align-items:center;gap:10px;font-family:var(--font-mono);">
              <span style="color:var(--text-muted);text-decoration:line-through;">${pr.oldValue || '—'}кг</span>
              <span style="color:var(--text-dim);">→</span>
              <span style="color:var(--accent);font-weight:700;font-size:20px;">${pr.newValue}кг</span>
              <span style="color:var(--text-dim);font-size:13px;">× ${pr.reps}</span>
            </div>
          ` : `
            <div style="display:flex;align-items:center;gap:10px;font-family:var(--font-mono);">
              <span style="color:var(--accent);font-weight:700;font-size:20px;">${pr.weight}кг × ${pr.newValue}</span>
              <span style="color:var(--text-dim);font-size:13px;">(было × ${pr.oldValue})</span>
            </div>
          `}
        </div>
      `).join('')}
    </div>
    <button class="btn btn-primary btn-block btn-lg" onclick="closeModal();(${onClose ? onClose.toString() : 'function(){}'})()">
      Шикарно!
    </button>
  `);
}

// ============== WORKOUT NOTES ==============
function showWorkoutNotes(workout, onSave) {
  workout.notes = workout.notes || { mood: 0, text: '' };

  openModal(`
    <div class="eyebrow">Тренировка завершена</div>
    <h2 class="modal-title">Как прошло?</h2>

    <label>Самочувствие</label>
    <div style="display:flex;gap:8px;margin-bottom:20px;">
      ${[1,2,3,4,5].map(n => `
        <button class="mood-btn" data-mood="${n}"
                onclick="setMood(${n})"
                style="flex:1;padding:14px 0;background:var(--bg-elev-2);border:2px solid ${workout.notes.mood === n ? 'var(--accent)' : 'var(--border)'};border-radius:12px;font-size:24px;cursor:pointer;transition:all 0.15s;">
          ${['😩','😕','😐','🙂','💪'][n-1]}
        </button>
      `).join('')}
    </div>

    <label>Заметки (необязательно)</label>
    <textarea id="notes-text" rows="3" placeholder="Как себя чувствовал, что заметил..."
              style="resize:vertical;min-height:80px;font-family:var(--font-body);"
              oninput="if(STATE.currentWorkout)STATE.currentWorkout.notes.text=this.value">${workout.notes.text || ''}</textarea>

    <div style="margin-top:20px;display:flex;gap:8px;">
      <button class="btn btn-ghost" style="flex:1;" onclick="closeModal();(${onSave.toString()})()">
        Пропустить
      </button>
      <button class="btn btn-primary" style="flex:2;" onclick="saveNotesAndContinue(${onSave.toString().replace(/\n/g, ' ')})">
        Сохранить
      </button>
    </div>
  `);
}

function setMood(n) {
  if (STATE.currentWorkout) {
    STATE.currentWorkout.notes = STATE.currentWorkout.notes || {};
    STATE.currentWorkout.notes.mood = n;
  }
  // Перерендерим точечно — обновим border'ы кнопок
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.style.borderColor = parseInt(btn.dataset.mood) === n ? 'var(--accent)' : 'var(--border)';
  });
}

function saveNotesAndContinue(onSave) {
  const text = document.getElementById('notes-text');
  if (text && STATE.currentWorkout) {
    STATE.currentWorkout.notes = STATE.currentWorkout.notes || {};
    STATE.currentWorkout.notes.text = text.value;
  }
  closeModal();
  onSave();
}


function renderApp() {
  if (!STATE.profile) {
    renderOnboarding();
    return;
  }
  showNav(STATE.view !== 'workout');

  switch (STATE.view) {
    case 'home': renderHome(); break;
    case 'workout': renderWorkout(); break;
    case 'exercises': renderExerciseLibrary(); break;
    case 'stats': renderStats(); break;
    default: renderHome();
  }

  // Обновляем активную вкладку
  $$('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === STATE.view);
  });
}

// Обработчики навигации
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    if (tab === 'workout') {
      if (STATE.currentWorkout) {
        STATE.view = 'workout';
      } else {
        startWorkout();
        return;
      }
    } else {
      STATE.view = tab;
    }
    renderApp();
  });
});

// ============== INIT ==============
load();
renderApp();

// Запрашиваем persistent storage при первой загрузке
// (если уже не запросили или есть данные пользователя)
(async () => {
  if (navigator.storage && navigator.storage.persisted) {
    const isPersisted = await navigator.storage.persisted();
    STATE.storagePersistent = isPersisted;
    // Если данные есть и защита не включена — тихо запрашиваем
    // Браузер может предоставить её автоматически если PWA установлено
    if (!isPersisted && (STATE.profile || STATE.history.length > 0)) {
      await requestPersistentStorage();
    }
  }
})();

// Сохраняем при закрытии
window.addEventListener('beforeunload', save);