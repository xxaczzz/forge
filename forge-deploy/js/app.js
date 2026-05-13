/* =============================================
   FORGE — Fitness Tracker
   Data layer, state management, and all views
============================================= */

// ============== DATA: EXERCISE LIBRARY ==============
// equipment — конкретный инвентарь, нужный для упражнения (хотя бы один из списка)
// video — YouTube ID для встроенного плеера с обучающим видео
const EXERCISES = [
  // ===== CHEST =====
  { id: 'bench-press', category: 'strength', name: 'Barbell Bench Press', muscle: 'chest', secondary: ['triceps', 'shoulders'],
    equipment: ['barbell', 'bench'], compound: true, video: 'rT7DgCr-3pg',
    description: 'Lie on the bench, lower the bar to the middle of your chest, press up. Shoulder blades retracted, feet planted firmly.',
    tips: ['Keep hips on the bench', 'Bar moves in a slight arc', 'Control the eccentric phase'] },
  { id: 'db-bench', category: 'strength', name: 'Dumbbell Bench Press', muscle: 'chest', secondary: ['triceps', 'shoulders'],
    equipment: ['dumbbells', 'bench'], compound: true, video: 'YQ2s_Y7g5Qk',
    description: 'Lie on the bench with dumbbells. Lower them to chest level, press up and squeeze at the top.',
    tips: ['Greater range than barbell', 'Control at the bottom', 'Do not clang dumbbells together'] },
  { id: 'incline-db-bench', category: 'strength', name: 'Incline Dumbbell Press', muscle: 'chest', secondary: ['shoulders', 'triceps'],
    equipment: ['dumbbells', 'bench-incline'], compound: true, video: '8iPEnn-ltC8',
    description: 'Set bench at 30 degrees. Press dumbbells up, focusing on the upper chest.',
    tips: ['No more than 45 degrees or front delts take over', 'Squeeze at the top', 'Elbows below shoulder joint'] },
  { id: 'pushup', category: 'strength', bwFactor: 0.65, name: 'Push-Ups', muscle: 'chest', secondary: ['triceps', 'shoulders', 'core'],
    equipment: [], compound: true, video: 'IODxDxX7oi4',
    description: 'Plank position, lower until chest touches the floor, push back up. Body stays in a straight line.',
    tips: ['Elbows at 45-degree angle', 'Engage your core', 'Do not let hips sag'] },
  { id: 'pushup-wide', category: 'strength', bwFactor: 0.65, name: 'Wide Push-Ups', muscle: 'chest', secondary: ['shoulders'],
    equipment: [], video: 'XPPfnSEATJA',
    description: 'Push-ups with hands wider than shoulders. Shifts emphasis to chest, shorter range of motion.',
    tips: ['Avoid going too wide to protect shoulders', 'Chest to the floor', 'Body stays straight'] },
  { id: 'db-fly', category: 'strength', name: 'Dumbbell Fly', muscle: 'chest', secondary: ['shoulders'],
    equipment: ['dumbbells', 'bench'], video: 'eozdVDA78K0',
    description: 'On a bench, open your arms with a slight bend in elbows, then bring dumbbells back together.',
    tips: ['Do not lower too deep', 'Feel the chest stretch', 'Light weight, clean form'] },
  { id: 'band-press', category: 'strength', name: 'Band Chest Press', muscle: 'chest', secondary: ['triceps'],
    equipment: ['bands'], video: 'PJpnNakIDHk',
    description: 'Anchor the band behind you. Press forward from chest, like a bench press motion.',
    tips: ['Pick the right tension', 'Full squeeze at the end', 'Control the way back'] },

  // ===== BACK =====
  { id: 'pullup', category: 'strength', bwFactor: 0.95, name: 'Pull-Ups', muscle: 'back', secondary: ['biceps'],
    equipment: ['pullup-bar'], compound: true, video: 'eGo4IYlbE5g',
    description: 'Hang from the bar, pull up until chin clears it, lower down. Grip slightly wider than shoulders.',
    tips: ['Squeeze shoulder blades', 'No swinging', 'Full range of motion'] },
  { id: 'chin-up', category: 'strength', bwFactor: 0.95, name: 'Chin-Ups', muscle: 'back', secondary: ['biceps'],
    equipment: ['pullup-bar'], compound: true, video: 'brhRXlOhsAM',
    description: 'Underhand grip, shoulder-width apart. More biceps engagement.',
    tips: ['Elbows tucked', 'Chin over the bar', 'Controlled negative'] },
  { id: 'deadlift', category: 'strength', name: 'Deadlift', muscle: 'back', secondary: ['legs', 'core'],
    equipment: ['barbell'], compound: true, video: 'r4MzxtBKyNE',
    description: 'Bar on the floor. Hinge at hips, grip slightly wider than hips, stand up with a flat back.',
    tips: ['Keep back flat throughout', 'Bar close to shins', 'Hips and chest rise together'] },
  { id: 'bent-row', category: 'strength', name: 'Bent-Over Row', muscle: 'back', secondary: ['biceps'],
    equipment: ['barbell'], compound: true, video: 'kBWAon7ItDw',
    description: 'Hinge forward with flat back, row the bar to your stomach, squeeze shoulder blades.',
    tips: ['Torso at about 45 degrees', 'Elbows go back', 'No body english'] },
  { id: 'db-row', category: 'strength', name: 'Single-Arm Dumbbell Row', muscle: 'back', secondary: ['biceps'],
    equipment: ['dumbbells'], video: 'pYcpY20QaE8',
    description: 'Knee and hand on bench. Row the dumbbell to your hip, lower to a full stretch.',
    tips: ['Do not rotate the torso', 'Lead with the elbow', 'Pause at the top'] },
  { id: 'band-row', category: 'strength', name: 'Seated Band Row', muscle: 'back', secondary: ['biceps'],
    equipment: ['bands'], video: 'b1OJ7t0e2Tc',
    description: 'Sit on the floor, band looped around your feet. Row the handles to your stomach, squeeze blades.',
    tips: ['Flat back', 'Elbows close to body', 'Feel the squeeze between blades'] },
  { id: 'inv-row', category: 'strength', bwFactor: 0.6, name: 'Inverted Rows', muscle: 'back', secondary: ['biceps'],
    equipment: ['pullup-bar'], video: 'KOaCM1HMCWE',
    description: 'Under a low bar. Pull chest to bar, body straight as a plank.',
    tips: ['Lower body angle = harder', 'Squeeze blades', 'Body in a line'] },
  { id: 'kb-swing', category: 'strength', name: 'Kettlebell Swing', muscle: 'back', secondary: ['legs', 'core'],
    equipment: ['kettlebell'], compound: true, video: 'YSxHifyI6s8',
    description: 'Swing the kettlebell from between knees to chest level using explosive hip drive.',
    tips: ['Power from hips, not arms', 'Flat back', 'Kettlebell is an extension of arms'] },

  // ===== LEGS =====
  { id: 'squat', category: 'strength', name: 'Barbell Back Squat', muscle: 'legs', secondary: ['core'],
    equipment: ['barbell'], compound: true, video: 'ultWZbUMPL8',
    description: 'Bar on shoulders. Squat until thighs are parallel to floor, drive up through heels.',
    tips: ['Knees track toes', 'Flat back', 'Big breath at the bottom'] },
  { id: 'goblet-squat', category: 'strength', name: 'Goblet Squat', muscle: 'legs', secondary: ['core'],
    equipment: ['dumbbells'], compound: true, video: 'MeIiIdhvXT4',
    description: 'Hold a dumbbell at chest with both hands. Squat deep, torso vertical.',
    tips: ['Elbows inside knees', 'Deep squat', 'Chest up'] },
  { id: 'lunges', category: 'strength', name: 'Dumbbell Lunges', muscle: 'legs', secondary: ['core'],
    equipment: ['dumbbells'], video: 'D7KaRcUTQeE',
    description: 'Holding dumbbells, step forward, lower until back knee touches floor, return.',
    tips: ['Front knee tracks over toes', 'Torso vertical', 'Take a long enough step'] },
  { id: 'bw-squat', category: 'strength', bwFactor: 0.7, name: 'Bodyweight Squat', muscle: 'legs', secondary: ['core'],
    equipment: [], video: 'aclHkVaku9U',
    description: 'Squat to thighs parallel, arms extended in front, keep heels planted.',
    tips: ['Hips back like sitting', 'Slow eccentric', 'Chest up'] },
  { id: 'bw-lunges', category: 'strength', bwFactor: 0.7, name: 'Bodyweight Lunges', muscle: 'legs', secondary: ['core'],
    equipment: [], video: 'QOVaHwm-Q6U',
    description: 'Step forward, lower until back knee almost touches floor, return. Alternate legs.',
    tips: ['Torso upright', 'Knee tracks over foot', 'Front heel planted'] },
  { id: 'romanian', category: 'strength', name: 'Romanian Deadlift', muscle: 'legs', secondary: ['back'],
    equipment: ['dumbbells', 'barbell'], compound: true, video: 'jEy_czb3RKA',
    description: 'With near-straight legs (slight bend), hinge forward lowering weight along your legs until you feel a hamstring stretch.',
    tips: ['Flat back, hips push back', 'Weight stays close to legs', 'Feel hamstrings stretch'] },
  { id: 'bulgarian', category: 'strength', name: 'Bulgarian Split Squat', muscle: 'legs', secondary: ['core'],
    equipment: ['bench', 'dumbbells'], compound: true, video: '2C-uNgKwPLE',
    description: 'Back foot on bench, front leg forward. Lower until back knee touches floor.',
    tips: ['Big step from bench', 'Slight forward torso lean', 'Weight on front heel'] },
  { id: 'glute-bridge', category: 'strength', bwFactor: 0.5, name: 'Glute Bridge', muscle: 'legs', secondary: ['core'],
    equipment: [], video: 'OUgsJ8-Vi0E',
    description: 'Lie on back, knees bent, drive hips up squeezing glutes.',
    tips: ['Pause 1-2 sec at top', 'Do not arch lower back', 'Squeeze glutes hard'] },

  // ===== SHOULDERS =====
  { id: 'ohp', category: 'strength', name: 'Overhead Press', muscle: 'shoulders', secondary: ['triceps', 'core'],
    equipment: ['barbell'], compound: true, video: '2yjwXTZQDDI',
    description: 'Bar at chest level. Press overhead to full lockout, lower under control.',
    tips: ['Tight core', 'No lower-back arch', 'Elbows slightly in front of bar'] },
  { id: 'db-press', category: 'strength', name: 'Seated Dumbbell Press', muscle: 'shoulders', secondary: ['triceps'],
    equipment: ['dumbbells', 'bench'], compound: true, video: 'qEwKCR5JCog',
    description: 'Seated with back support, press dumbbells overhead, bring them together at top, lower to shoulders.',
    tips: ['Press back into the bench', 'Do not slam elbows', 'Controlled descent'] },
  { id: 'db-press-stand', category: 'strength', name: 'Standing Dumbbell Press', muscle: 'shoulders', secondary: ['triceps', 'core'],
    equipment: ['dumbbells'], compound: true, video: '6Z15_WdXmVw',
    description: 'Standing, dumbbells at shoulders. Press up, lower. Keep torso stable.',
    tips: ['Tight core', 'No lower-back arching', 'Full range'] },
  { id: 'lateral-raise', category: 'strength', name: 'Dumbbell Lateral Raise', muscle: 'shoulders',
    equipment: ['dumbbells'], video: '3VcKaXpzqRo',
    description: 'Standing with dumbbells at sides, raise arms out to parallel with the floor, lower.',
    tips: ['Slight bend in elbows', 'Do not raise above shoulder', 'Slow, no momentum'] },
  { id: 'pike-pushup', category: 'strength', bwFactor: 0.7, name: 'Pike Push-Ups', muscle: 'shoulders', secondary: ['triceps'],
    equipment: [], video: 'EA8g7q9jauM',
    description: 'Hands on floor, hips raised high, lower head between hands.',
    tips: ['About 90 degrees between torso and legs', 'Head to floor', 'Elbows back'] },

  // ===== ARMS =====
  { id: 'curl', category: 'strength', name: 'Dumbbell Curl', muscle: 'biceps',
    equipment: ['dumbbells'], video: 'av7-8igSXTs',
    description: 'Standing with dumbbells at sides, curl up to shoulder level. Elbows pinned.',
    tips: ['No body swinging', 'Full range', 'Supinate at the top'] },
  { id: 'hammer-curl', category: 'strength', name: 'Hammer Curl', muscle: 'biceps',
    equipment: ['dumbbells'], video: 'TwD-YGVP4Bk',
    description: 'Curl with neutral grip (palms facing each other). Targets the brachialis.',
    tips: ['No wrist rotation', 'Elbows close to body', 'Slow lowering'] },
  { id: 'band-curl', category: 'strength', name: 'Band Curl', muscle: 'biceps',
    equipment: ['bands'], video: 'vBGu6ofxmHo',
    description: 'Stand on band, hold handles. Curl up to shoulders.',
    tips: ['Elbows pinned', 'Full range', 'Slow eccentric'] },
  { id: 'tri-ext', category: 'strength', name: 'Triceps Extension', muscle: 'triceps',
    equipment: ['dumbbells'], video: '_gsUck-7M9I',
    description: 'Lying or seated, lower the weight behind your head bending elbows. Extend back up.',
    tips: ['Elbows fixed', 'Upper arms vertical', 'Lower slowly'] },
  { id: 'dips', category: 'strength', bwFactor: 0.9, name: 'Parallel Bar Dips', muscle: 'triceps', secondary: ['chest', 'shoulders'],
    equipment: ['parallel-bars'], compound: true, video: '2z8JmcrW-As',
    description: 'On parallel bars, lower until elbows hit 90 degrees, push back up. Vertical torso targets triceps.',
    tips: ['Elbows back', 'Do not go below shoulder comfort', 'Controlled descent'] },
  { id: 'bench-dips', category: 'strength', bwFactor: 0.55, name: 'Bench Dips', muscle: 'triceps', secondary: ['shoulders'],
    equipment: ['bench'], video: '6kALZikXxLc',
    description: 'Sit on edge of bench, hands behind. Lower body bending arms to 90 degrees, press up.',
    tips: ['Elbows back, not flared', 'Stay close to the bench', 'Full range'] },
  { id: 'diamond-pushup', category: 'strength', bwFactor: 0.65, name: 'Diamond Push-Ups', muscle: 'triceps', secondary: ['chest'],
    equipment: [], video: 'J0DnG1_S92I',
    description: 'Push-ups with hands together under chest (thumbs and index fingers form a diamond).',
    tips: ['Elbows along the body', 'Chest to hands', 'Body straight'] },

  // ===== CORE =====
  { id: 'plank', category: 'strength', bwFactor: 0.35, name: 'Plank', muscle: 'core',
    equipment: [], video: 'ASdvN_XEl_c', isTime: true,
    description: 'On forearms and toes, body in a straight line. Hold the tension.',
    tips: ['Hips do not sag', 'Squeeze abs and glutes', 'Breathe steadily'] },
  { id: 'side-plank', category: 'strength', bwFactor: 0.3, name: 'Side Plank', muscle: 'core',
    equipment: [], video: 'K2VljzCC16g', isTime: true,
    description: 'On one forearm, body sideways to the floor. Hold a straight line.',
    tips: ['Hips up', 'Body straight', 'Switch sides'] },
  { id: 'crunches', category: 'strength', bwFactor: 0.2, name: 'Crunches', muscle: 'core',
    equipment: [], video: 'Xyd_fa5zoEU',
    description: 'On your back, knees bent, curl your torso up, exhale at the top.',
    tips: ['Do not pull on neck', 'Lower back stays pressed down', 'Slow on the way down'] },
  { id: 'leg-raise', category: 'strength', bwFactor: 0.25, name: 'Lying Leg Raise', muscle: 'core',
    equipment: [], video: 'JB2oyawG9KI',
    description: 'On your back, raise straight legs to vertical, lower without touching the floor.',
    tips: ['Lower back pressed down', 'Controlled descent', 'No swinging'] },
  { id: 'mountain-climb', category: 'strength', bwFactor: 0.5, name: 'Mountain Climbers', muscle: 'core', secondary: ['legs'],
    equipment: [], video: 'nmwgirgXLYM',
    description: 'Plank position, alternate driving knees to chest at a quick pace.',
    tips: ['Hips stable', 'Steady breathing', 'Body straight'] },
  { id: 'russian-twist', category: 'strength', bwFactor: 0.2, name: 'Russian Twist', muscle: 'core',
    equipment: [], video: 'wkD8rjkodUI',
    description: 'Sit, lean back, feet off the floor. Rotate torso side to side.',
    tips: ['Add weight for difficulty', 'Flat back', 'Twist with the torso, not arms'] },

  // ===== ДОПОЛНИТЕЛЬНЫЕ СИЛОВЫЕ =====
  { id: 'floor-press', category: 'strength', name: 'Floor Press', muscle: 'chest', secondary: ['triceps'],
    equipment: ['dumbbells'], compound: true, video: 'NPHkjJYx-fU',
    description: 'Lie on the floor with dumbbells. Lower until upper arms touch the floor, then press up.',
    tips: ['Pause briefly when elbows touch floor', 'Limited range protects shoulders', 'Squeeze chest at top'] },
  { id: 'floor-fly', category: 'strength', name: 'Floor Fly', muscle: 'chest',
    equipment: ['dumbbells'], video: 'eozdVDA78K0',
    description: 'Lying on the floor, open arms with slight bend, bring dumbbells back together over chest.',
    tips: ['Limited range vs bench protects shoulders', 'Light weight, clean form', 'Squeeze at the top'] },
  { id: 'hip-thrust', category: 'strength', name: 'Hip Thrust', muscle: 'legs', secondary: ['core'], bwFactor: 0.65,
    equipment: [], compound: true, video: 'xDmFkJxPzeM',
    description: 'Sit on floor, knees bent, drive hips up squeezing glutes hard at top.',
    tips: ['Pause 1-2 sec at top', 'Keep chin tucked', 'Push through heels'] },
  { id: 'calf-raise', category: 'strength', name: 'Calf Raise', muscle: 'legs', bwFactor: 0.85,
    equipment: [], video: '-M4-G8p8fmc',
    description: 'Stand straight, rise up on the balls of your feet, hold briefly, lower under control.',
    tips: ['Full range — go up high, down low', 'Pause at top for 1 sec', 'Slow eccentric'] },
  { id: 'face-pull', category: 'strength', name: 'Band Face Pull', muscle: 'back', secondary: ['shoulders'],
    equipment: ['bands'], video: 'rep-qVOkqgk',
    description: 'Anchor band at face level. Pull handles towards face, elbows high, squeeze rear delts.',
    tips: ['Elbows higher than wrists', 'Squeeze shoulder blades', 'Great for posture'] },
  { id: 'pull-apart', category: 'strength', name: 'Band Pull-Apart', muscle: 'back', secondary: ['shoulders'],
    equipment: ['bands'], video: 'osRimvxXlKQ',
    description: 'Hold band in front at shoulder height, pull hands apart by squeezing shoulder blades.',
    tips: ['Arms stay straight', 'Squeeze blades fully', 'Slow on the way back'] },
  { id: 'front-raise', category: 'strength', name: 'Dumbbell Front Raise', muscle: 'shoulders',
    equipment: ['dumbbells'], video: 'sxeY3aOmHv0',
    description: 'Raise dumbbells in front of you to shoulder height, lower under control.',
    tips: ['Slight bend in elbows', 'No swinging', 'Stop at shoulder height'] },
  { id: 'rear-delt-fly', category: 'strength', name: 'Bent-Over Rear Delt Fly', muscle: 'shoulders', secondary: ['back'],
    equipment: ['dumbbells'], video: 'ttvfGg9d76c',
    description: 'Hinge forward with flat back. Open arms wide squeezing rear delts and shoulder blades.',
    tips: ['Slight bend in elbows', 'Lead with back of hands', 'Light weight, feel the squeeze'] },

  // ===== МОБИЛИТИ / ЗАРЯДКА =====
  // category: 'mobility' — эти упражнения скрыты в обычной библиотеке, используются только в зарядке
  { id: 'cat-cow', category: 'mobility', name: 'Cat-Cow Stretch', muscle: 'back', secondary: ['core'],
    equipment: ['mat'], video: 'kqnua4rHVVA', isTime: true,
    description: 'On all fours, arch your back up (cat), then drop belly and lift head (cow). Flow smoothly.',
    tips: ['Move with your breath', 'Slow, controlled motion', 'Engage core throughout'] },
  { id: 'bird-dog', category: 'mobility', name: 'Bird Dog', muscle: 'core', secondary: ['back'],
    equipment: ['mat'], video: 'wiFNA3sqjCA',
    description: 'On all fours, extend opposite arm and leg until straight, hold briefly, switch sides.',
    tips: ['Keep hips square', 'Engage core', 'Slow and stable, no swinging'] },
  { id: 'dead-bug', category: 'mobility', name: 'Dead Bug', muscle: 'core',
    equipment: ['mat'], video: '4XLEnwUr1d8',
    description: 'On back, arms up, legs at 90 degrees. Lower opposite arm and leg simultaneously, return.',
    tips: ['Lower back stays pressed down', 'Slow, controlled motion', 'Breathe steadily'] },
  { id: 'inchworm', category: 'mobility', name: 'Inchworm', muscle: 'core', secondary: ['shoulders', 'legs'],
    equipment: ['mat'], video: 'ZY2ji_Ho0dA',
    description: 'Stand, hinge forward, walk hands out to plank, walk feet up to hands, repeat.',
    tips: ['Keep legs as straight as comfortable', 'Engage core in plank', 'Smooth flow'] },
  { id: 'world-greatest', category: 'mobility', name: "World's Greatest Stretch", muscle: 'legs', secondary: ['back', 'shoulders'],
    equipment: ['mat'], video: '-CiWQ2IvY34',
    description: 'Lunge forward, hand to floor inside front foot, rotate torso reaching up. Switch sides.',
    tips: ['Reach high with rotating arm', 'Keep back leg active', 'Hold 2-3 sec each side'] },
  { id: 'child-pose', category: 'mobility', name: "Child's Pose", muscle: 'back', secondary: ['shoulders'],
    equipment: ['mat'], video: 'eqVMAPM00DM', isTime: true,
    description: 'Kneel, sit back on heels, fold forward with arms extended. Relax and breathe.',
    tips: ['Forehead to mat', 'Arms long and active', 'Deep breaths'] },
  { id: 'cobra-stretch', category: 'mobility', name: 'Cobra Stretch', muscle: 'back', secondary: ['core'],
    equipment: ['mat'], video: 'JDcdhTuycOI', isTime: true,
    description: 'Lie face down, hands by shoulders. Press chest up, arching gently, look forward.',
    tips: ['Hips stay on floor', 'Soft elbows', 'No pinching in lower back'] },
  { id: 'arm-circles', category: 'mobility', name: 'Arm Circles', muscle: 'shoulders',
    equipment: [], video: 'UVMEnIaY8aU', isTime: true,
    description: 'Stand with arms extended to sides. Make small circles forward, then backward.',
    tips: ['Start small, get bigger', 'Both directions', 'Stay relaxed'] },
  { id: 'shoulder-rolls', category: 'mobility', name: 'Shoulder Rolls', muscle: 'shoulders',
    equipment: [], video: 'X7NtgY9kCCM', isTime: true,
    description: 'Roll shoulders forward in big circles, then reverse and roll backward.',
    tips: ['Big, slow circles', 'Both directions', 'Relax neck'] },
  { id: 'jumping-jacks', category: 'mobility', name: 'Jumping Jacks', muscle: 'legs', secondary: ['shoulders', 'core'],
    equipment: [], video: 'c4DAnQ6DtF8', isTime: true,
    description: 'Jump while spreading legs and raising arms overhead, then return. Repeat at steady pace.',
    tips: ['Land softly on balls of feet', 'Steady rhythm', 'Engage core'] },
  { id: 'banded-walk', category: 'mobility', name: 'Banded Lateral Walk', muscle: 'legs',
    equipment: ['bands'], video: 'N28Hpdezg7Q',
    description: 'Mini band above knees. Stand in mini-squat, step sideways keeping tension on band.',
    tips: ['Constant tension on band', 'Stay in athletic stance', 'Toes forward'] },
  { id: 'forward-fold', category: 'mobility', name: 'Standing Forward Fold', muscle: 'back', secondary: ['legs'],
    equipment: [], video: 'goN4rWbQUn4', isTime: true,
    description: 'Stand, hinge at hips, fold forward letting arms hang. Bend knees if needed.',
    tips: ['Bend knees as much as needed', 'Relax neck and arms', 'Breathe into the back'] }
];

// Muscle groups
const MUSCLE_NAMES = {
  chest: 'Chest', back: 'Back', legs: 'Legs',
  shoulders: 'Shoulders', biceps: 'Biceps', triceps: 'Triceps', core: 'Core'
};

// Equipment
const EQUIPMENT_NAMES = {
  'dumbbells': 'Dumbbells',
  'barbell': 'Barbell',
  'bench': 'Bench (flat)',
  'bench-incline': 'Bench (incline)',
  'pullup-bar': 'Pull-up bar',
  'parallel-bars': 'Parallel bars',
  'bands': 'Resistance bands',
  'kettlebell': 'Kettlebell',
  'mat': 'Yoga mat'
};

// SVG-иконки оборудования. Размер 28×28, в стиле приложения, акцентный цвет.
function equipmentSVG(id, size = 28) {
  const icons = {
    // Гантель: горизонтальный гриф с двумя дисками
    'dumbbells': `
      <rect x="2" y="11" width="3" height="6" rx="1" fill="currentColor"/>
      <rect x="5" y="13" width="2" height="2" fill="currentColor"/>
      <rect x="7" y="12" width="10" height="4" fill="currentColor"/>
      <rect x="17" y="13" width="2" height="2" fill="currentColor"/>
      <rect x="19" y="11" width="3" height="6" rx="1" fill="currentColor"/>
    `,
    // Штанга: длинный гриф с большими дисками
    'barbell': `
      <rect x="2" y="13" width="2" height="2" fill="currentColor"/>
      <rect x="4" y="9" width="3" height="10" rx="1" fill="currentColor"/>
      <rect x="7" y="13" width="10" height="2" fill="currentColor"/>
      <rect x="17" y="9" width="3" height="10" rx="1" fill="currentColor"/>
      <rect x="20" y="13" width="2" height="2" fill="currentColor"/>
    `,
    // Скамья (плоская): сверху доска, снизу две опоры
    'bench': `
      <rect x="3" y="9" width="18" height="3" rx="1" fill="currentColor"/>
      <rect x="5" y="12" width="2" height="9" fill="currentColor"/>
      <rect x="17" y="12" width="2" height="9" fill="currentColor"/>
    `,
    // Наклонная скамья: доска под углом + опоры
    'bench-incline': `
      <path d="M 3 17 L 21 6 L 21 9 L 3 20 Z" fill="currentColor"/>
      <rect x="4" y="17" width="2" height="5" fill="currentColor"/>
      <rect x="18" y="9" width="2" height="13" fill="currentColor"/>
    `,
    // Турник: горизонтальная перекладина + опоры
    'pullup-bar': `
      <rect x="2" y="5" width="20" height="2.5" rx="1" fill="currentColor"/>
      <rect x="3" y="7" width="2" height="14" fill="currentColor"/>
      <rect x="19" y="7" width="2" height="14" fill="currentColor"/>
      <circle cx="12" cy="11" r="1.5" fill="currentColor" opacity="0.5"/>
    `,
    // Брусья: две параллельные перекладины
    'parallel-bars': `
      <rect x="2" y="6" width="9" height="2" rx="1" fill="currentColor"/>
      <rect x="13" y="6" width="9" height="2" rx="1" fill="currentColor"/>
      <rect x="3" y="8" width="2" height="14" fill="currentColor"/>
      <rect x="8" y="8" width="2" height="14" fill="currentColor"/>
      <rect x="14" y="8" width="2" height="14" fill="currentColor"/>
      <rect x="19" y="8" width="2" height="14" fill="currentColor"/>
    `,
    // Резинка: волнистая линия
    'bands': `
      <path d="M 2 12 Q 6 6 10 12 T 18 12 T 22 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="2" cy="12" r="2" fill="currentColor"/>
      <circle cx="22" cy="12" r="2" fill="currentColor"/>
    `,
    // Гиря: круглая чаша с ручкой сверху
    'kettlebell': `
      <path d="M 8 6 Q 8 3 12 3 Q 16 3 16 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 7 8 L 17 8 L 19 21 L 5 21 Z" fill="currentColor"/>
    `,
    // Коврик для йоги: свёрнутый рулон
    'mat': `
      <rect x="3" y="6" width="18" height="14" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <line x1="6" y1="9" x2="18" y2="9" stroke="currentColor" stroke-width="1" opacity="0.6"/>
      <line x1="6" y1="13" x2="18" y2="13" stroke="currentColor" stroke-width="1" opacity="0.6"/>
      <line x1="6" y1="17" x2="18" y2="17" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    `
  };
  const path = icons[id] || `<circle cx="12" cy="12" r="6" fill="currentColor"/>`;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" style="color:var(--accent);flex-shrink:0;">${path}</svg>`;
}

// Иконки оборудования (готовый SVG-разметка для использования в HTML)
const EQUIPMENT_ICONS = {
  'dumbbells': equipmentSVG('dumbbells'),
  'barbell': equipmentSVG('barbell'),
  'bench': equipmentSVG('bench'),
  'bench-incline': equipmentSVG('bench-incline'),
  'pullup-bar': equipmentSVG('pullup-bar'),
  'parallel-bars': equipmentSVG('parallel-bars'),
  'bands': equipmentSVG('bands'),
  'kettlebell': equipmentSVG('kettlebell'),
  'mat': equipmentSVG('mat')
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
  workoutsSinceBackup: 0,    // счётчик тренировок с последнего бэкапа
  // ===== MORNING ROUTINE (полностью изолировано от силовой логики) =====
  routines: [],            // история выполненных зарядок
  morningStreak: 0,        // счётчик дней подряд
  morningLastDate: null,   // YYYY-MM-DD последней зарядки
  currentRoutine: null     // активная зарядка (state машина плеера)
};

function save() {
  try {
    localStorage.setItem('forge-data', JSON.stringify({
      profile: STATE.profile,
      history: STATE.history,
      lastBackup: STATE.lastBackup,
      workoutsSinceBackup: STATE.workoutsSinceBackup,
      // morning data (изолировано)
      routines: STATE.routines,
      morningStreak: STATE.morningStreak,
      morningLastDate: STATE.morningLastDate
    }));
  } catch(e) {
    console.error(e);
    // Если localStorage переполнен — предупреждаем
    if (e.name === 'QuotaExceededError') {
      toast('Storage is full! Make a backup and delete old workouts.');
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
      // morning data — старые бэкапы могут не иметь этих полей, дефолтим
      STATE.routines = d.routines || [];
      STATE.morningStreak = d.morningStreak || 0;
      STATE.morningLastDate = d.morningLastDate || null;
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
      console.warn('Persistent storage unavailable:', e);
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
  // Только силовые — мобилити для зарядки и здесь не годятся
  const available = EXERCISES.filter(ex =>
    ex.category !== 'mobility' &&
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
let modalCloseCallback = null;

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
  // Если был установлен callback — вызываем после анимации
  if (modalCloseCallback) {
    const cb = modalCloseCallback;
    modalCloseCallback = null;
    setTimeout(cb, 200);
  }
}

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});

// ============== SVG ICONS FOR MUSCLES ==============
// Упрощённый вид тела спереди и сзади
function muscleBodySVG(fatigue) {
  const cls = m => `muscle-part ${fatigueLevel(fatigue[m] || 0)}`;
  // V-shape пропорции, viewBox 100×200
  // Координаты согласованы с workoutSilhouetteSVG для визуальной целостности
  return `
    <div class="muscle-body">
      <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Голова -->
        <circle cx="50" cy="14" r="8" fill="#2a2a2a" stroke="#383838" stroke-width="0.8"/>
        <!-- Шея -->
        <rect x="46" y="21" width="8" height="5" fill="#2a2a2a"/>

        <!-- Плечи (дельты) — большие эллипсы поверх -->
        <ellipse class="${cls('shoulders')}" cx="20" cy="36" rx="11" ry="9"/>
        <ellipse class="${cls('shoulders')}" cx="80" cy="36" rx="11" ry="9"/>

        <!-- Грудь — две половины -->
        <path class="${cls('chest')}" d="M30 30 L50 30 L50 58 L34 62 L30 56 Z"/>
        <path class="${cls('chest')}" d="M70 30 L50 30 L50 58 L66 62 L70 56 Z"/>

        <!-- Бицепсы -->
        <path class="${cls('biceps')}" d="M11 44 L9 78 L22 80 L24 46 Z"/>
        <path class="${cls('biceps')}" d="M89 44 L91 78 L78 80 L76 46 Z"/>

        <!-- Предплечья -->
        <rect x="9" y="80" width="11" height="24" rx="3" fill="#2a2a2a"/>
        <rect x="80" y="80" width="11" height="24" rx="3" fill="#2a2a2a"/>

        <!-- Пресс -->
        <path class="${cls('core')}" d="M34 62 L66 62 L62 96 L38 96 Z"/>

        <!-- Бёдра -->
        <path class="${cls('legs')}" d="M38 96 L34 148 L46 150 L50 96 Z"/>
        <path class="${cls('legs')}" d="M62 96 L66 148 L54 150 L50 96 Z"/>

        <!-- Голени -->
        <rect x="35" y="150" width="11" height="40" rx="3" fill="#2a2a2a"/>
        <rect x="54" y="150" width="11" height="40" rx="3" fill="#2a2a2a"/>
      </svg>
    </div>
    <div class="muscle-body">
      <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Голова -->
        <circle cx="50" cy="14" r="8" fill="#2a2a2a" stroke="#383838" stroke-width="0.8"/>
        <rect x="46" y="21" width="8" height="5" fill="#2a2a2a"/>

        <!-- СПИНА: 4 зоны V-формы до y=80 -->
        <path class="${cls('back')}" d="M30 30 L70 30 L68 44 L32 44 Z"/>
        <path class="${cls('back')}" d="M32 44 L68 44 L67 60 L33 60 Z"/>
        <path class="${cls('back')}" d="M33 60 L67 60 L65 80 L35 80 Z"/>
        <!-- Ягодицы — занимают зону 80-96, чтобы ноги начались с y=96 -->
        <path class="${cls('legs')}" d="M35 80 L65 80 L62 96 L38 96 Z"/>

        <!-- Плечи (поверх спины) -->
        <ellipse class="${cls('shoulders')}" cx="20" cy="36" rx="11" ry="9"/>
        <ellipse class="${cls('shoulders')}" cx="80" cy="36" rx="11" ry="9"/>

        <!-- Трицепсы -->
        <path class="${cls('triceps')}" d="M11 44 L9 78 L22 80 L24 46 Z"/>
        <path class="${cls('triceps')}" d="M89 44 L91 78 L78 80 L76 46 Z"/>

        <!-- Предплечья -->
        <rect x="9" y="80" width="11" height="24" rx="3" fill="#2a2a2a"/>
        <rect x="80" y="80" width="11" height="24" rx="3" fill="#2a2a2a"/>

        <!-- Бёдра — те же координаты что спереди -->
        <path class="${cls('legs')}" d="M38 96 L34 148 L46 150 L50 96 Z"/>
        <path class="${cls('legs')}" d="M62 96 L66 148 L54 150 L50 96 Z"/>

        <!-- Голени -->
        <rect x="35" y="150" width="11" height="40" rx="3" fill="#2a2a2a"/>
        <rect x="54" y="150" width="11" height="40" rx="3" fill="#2a2a2a"/>
      </svg>
    </div>
  `;
}

// ============== MORNING PROGRAM (единая программа зарядки) ==============
// Все упражнения идут подряд. Юзер выбирает в моменте — делать или скипнуть.
// Между шагами автоматически добавляется "Get ready" пауза
const ROUTINE_GET_READY_SEC = 15;

const MORNING_PROGRAM = {
  id: 'morning',
  name: 'Morning Routine',
  icon: '🌅',
  description: 'Wake up your body',
  steps: [
    // Разминка позвоночника и суставов
    { exerciseId: 'cat-cow', duration: 30 },
    { exerciseId: 'arm-circles', duration: 30 },
    { exerciseId: 'shoulder-rolls', duration: 30 },
    // Растяжка и мобилити
    { exerciseId: 'world-greatest', duration: 30 },
    { exerciseId: 'inchworm', reps: 8 },
    { exerciseId: 'bird-dog', reps: 10 },
    { exerciseId: 'dead-bug', reps: 10 },
    { exerciseId: 'cobra-stretch', duration: 30 },
    { exerciseId: 'child-pose', duration: 30 },
    { exerciseId: 'forward-fold', duration: 30 },
    // Активация мышц
    { exerciseId: 'banded-walk', reps: 12 },
    { exerciseId: 'pull-apart', reps: 15 },
    // Силовые
    { exerciseId: 'bw-squat', reps: 15 },
    { exerciseId: 'pushup', reps: 10 },
    { exerciseId: 'plank', duration: 30 },
    // Кардио в конце
    { exerciseId: 'jumping-jacks', duration: 45 }
  ]
};

// Получить определение упражнения для шага зарядки
function routineStepExercise(step) {
  return EXERCISES.find(e => e.id === step.exerciseId);
}

// Расчёт максимальной длительности программы в секундах (если делать всё)
function programDurationSec(program) {
  let total = 0;
  program.steps.forEach((step, i) => {
    const stepSec = step.duration || (step.reps * 3);
    total += stepSec;
    if (i < program.steps.length - 1) total += ROUTINE_GET_READY_SEC;
  });
  return total;
}

// ============== ONBOARDING ==============
let onboardData = { goal: null, equipment: [], experience: null, bodyweight: null, step: 0 };

function renderOnboarding() {
  showNav(false);
  const steps = [
    // Шаг 1: цель
    {
      title: 'FORGE',
      sub: 'Smart workout journal.\nLet\'s set it up for you.',
      button: 'Start',
      action: () => { onboardData.step = 1; renderOnboarding(); }
    },
    // Шаг 2: цель
    {
      title: 'What\'s your goal?',
      sub: 'We will tailor your training to it.',
      options: [
        { id: 'strength', icon: '🏋️', name: 'Strength', desc: 'Heavy weights, 4-6 reps' },
        { id: 'muscle', icon: '💪', name: 'Hypertrophy', desc: 'Medium weights, 8-12 reps' },
        { id: 'endurance', icon: '🔥', name: 'Endurance', desc: 'Light weights, 15+ reps' },
        { id: 'general', icon: '✨', name: 'General fitness', desc: 'Balance and health' }
      ],
      field: 'goal'
    },
    // Шаг 3: оборудование (детальный список)
    {
      title: 'What do you have?',
      sub: 'Check all your available equipment.\nNo equipment? Also works.',
      multi: true,
      options: [
        { id: 'dumbbells', icon: equipmentSVG('dumbbells', 32), name: 'Dumbbells', desc: 'Adjustable or fixed' },
        { id: 'barbell', icon: equipmentSVG('barbell', 32), name: 'Barbell', desc: 'Bar + plates' },
        { id: 'bench', icon: equipmentSVG('bench', 32), name: 'Bench', desc: 'Flat bench' },
        { id: 'bench-incline', icon: equipmentSVG('bench-incline', 32), name: 'Incline bench', desc: 'Adjustable angle' },
        { id: 'pullup-bar', icon: equipmentSVG('pullup-bar', 32), name: 'Pull-up bar', desc: 'Home or outdoor' },
        { id: 'parallel-bars', icon: equipmentSVG('parallel-bars', 32), name: 'Parallel bars', desc: 'For dips' },
        { id: 'bands', icon: equipmentSVG('bands', 32), name: 'Bands', desc: 'Resistance bands' },
        { id: 'kettlebell', icon: equipmentSVG('kettlebell', 32), name: 'Kettlebell', desc: 'Any weight' }
      ],
      field: 'equipment',
      optional: true // можно пропустить — будут только упражнения с весом тела
    },
    // Шаг 4: опыт
    {
      title: 'Training experience?',
      sub: 'We will set your starting weights.',
      options: [
        { id: 'beginner', icon: '🌱', name: 'Beginner', desc: 'Less than a year' },
        { id: 'intermediate', icon: '🔥', name: 'Intermediate', desc: '1-3 years regularly' },
        { id: 'advanced', icon: '⚡', name: 'Advanced', desc: '3+ years' }
      ],
      field: 'experience'
    },
    // Шаг 5: вес тела (для расчёта калорий)
    {
      title: 'Your bodyweight?',
      sub: 'Used to estimate calories burned.\nOptional.',
      type: 'number',
      field: 'bodyweight',
      placeholder: '75',
      unit: 'kg',
      min: 30,
      max: 250,
      optional: true
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
      <div class="eyebrow" style="margin-bottom:8px;">Step ${onboardData.step} of ${steps.length - 1}</div>
      <h1 class="onboard-title">${step.title}</h1>
      <p class="onboard-sub">${step.sub}</p>
    `;

    step.options && step.options.forEach(opt => {
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

    // Числовой ввод (для веса тела)
    if (step.type === 'number') {
      const currentValue = onboardData[step.field] || '';
      html += `
        <div style="display:flex;align-items:center;gap:12px;background:var(--bg-elev);border:1px solid var(--border-strong);border-radius:14px;padding:8px 16px;margin-bottom:10px;">
          <input type="number" id="onboard-num-input"
                 inputmode="numeric"
                 value="${currentValue}"
                 placeholder="${step.placeholder || ''}"
                 min="${step.min || 0}"
                 max="${step.max || 999}"
                 oninput="onboardData['${step.field}'] = this.value ? parseFloat(this.value) : null"
                 style="flex:1;background:transparent;border:none;font-family:var(--font-display);font-size:48px;text-align:center;padding:8px 0;color:var(--text);"
                 autofocus>
          <span style="font-family:var(--font-mono);color:var(--text-dim);font-size:18px;font-weight:600;">${step.unit || ''}</span>
        </div>
      `;
    }

    const canContinue = step.optional ? true : (step.multi
      ? onboardData[step.field].length > 0
      : !!onboardData[step.field]);
    const isLast = onboardData.step === steps.length - 1;

    html += `
      <div style="margin-top:24px;display:flex;gap:10px;">
        <button class="btn btn-ghost" onclick="onboardData.step--;renderOnboarding()">Back</button>
        <button class="btn btn-primary" style="flex:1;" ${canContinue ? '' : 'disabled style="opacity:0.4;flex:1;"'} onclick="${isLast ? 'finishOnboarding()' : 'onboardData.step++;renderOnboarding()'}">
          ${isLast ? 'Done' : 'Next'}
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
    bodyweight: onboardData.bodyweight || null,
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
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

  const streakDays = calculateStreak();
  const thisWeek = STATE.history.filter(w => Date.now() - w.date < 7 * 24 * 60 * 60 * 1000).length;
  const totalVolume = STATE.history.reduce((s, w) => s + computeVolume(w), 0);

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
        <div class="today-title">Today's workout</div>
        <div class="today-sub">Based on your muscle recovery and history</div>
        <button class="btn btn-primary btn-block btn-lg" onclick="startWorkout()">
          Start workout
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
      </div>

      <div class="stat-grid">
        <div class="stat">
          <div class="stat-value">${streakDays}</div>
          <div class="stat-label">Day streak</div>
        </div>
        <div class="stat">
          <div class="stat-value">${thisWeek}</div>
          <div class="stat-label">This week</div>
        </div>
        <div class="stat">
          <div class="stat-value">${STATE.history.length}</div>
          <div class="stat-label">Total workouts</div>
        </div>
        <div class="stat">
          <div class="stat-value">${formatVolume(totalVolume)}</div>
          <div class="stat-label">Total volume</div>
        </div>
      </div>

      <h3 class="section-title">
        Muscle recovery
        <span class="count" onclick="openMuscleHelp()" style="cursor:pointer;">?</span>
      </h3>
      <div class="card">
        <div class="muscle-map">
          ${muscleBodySVG(fatigue)}
        </div>
        <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:12px;">
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">
            <span class="legend-dot" style="background:var(--muscle-fresh)"></span>Fresh
          </div>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">
            <span class="legend-dot" style="background:var(--muscle-moderate)"></span>Moderate
          </div>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">
            <span class="legend-dot" style="background:var(--muscle-fatigued)"></span>Fatigued
          </div>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">
            <span class="legend-dot" style="background:var(--muscle-exhausted)"></span>Rest
          </div>
        </div>
      </div>

      ${STATE.history.length > 0 ? `
        ${renderTopPRs()}
        <h3 class="section-title">Recent workouts <span class="count">${STATE.history.length}</span></h3>
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
    ? `${STATE.history.length} workouts without backup`
    : `Backup is outdated`;

  return `
    <div onclick="exportData()" style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg-elev-2);border:1px solid var(--warning);border-radius:12px;margin-bottom:12px;cursor:pointer;">
      <span style="font-size:18px;">💾</span>
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;font-weight:600;">${text}</div>
        <div style="font-size:11px;color:var(--text-dim);font-family:var(--font-mono);">Tap to backup</div>
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
        <span>🏆</span> Personal records
      </span>
      <span class="count">top ${top.length}</span>
    </h3>
    <div class="card">
      ${top.map((pr, i) => `
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;${i < top.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}">
          <div style="font-family:var(--font-display);color:var(--accent);font-size:24px;width:30px;">${i + 1}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${pr.name}</div>
            <div style="color:var(--text-muted);font-size:12px;font-family:var(--font-mono);">${new Date(pr.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:var(--font-display);color:var(--accent);font-size:18px;line-height:1;">${pr.weight}kg</div>
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
  if (kg < 1000000) return (kg / 1000).toFixed(1) + 'k';
  return (kg / 1000000).toFixed(1) + 'M';
}

// Форматирует длительность в стиле Fitbod: 50m, 1h30m, 2h5m
function formatDuration(seconds) {
  if (!seconds) return '';
  const totalMin = Math.round(seconds / 60);
  if (totalMin < 60) return totalMin + 'm';
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `${h}h${m}m` : `${h}h`;
}

function renderWorkoutCard(w) {
  const date = new Date(w.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  const duration = formatDuration(w.duration);
  const totalSets = w.exercises.reduce((s, e) => s + e.sets.filter(x => x.completed).length, 0);
  return `
    <div class="card" onclick="showWorkoutDetails(${w.date})" style="cursor:pointer;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
        <div>
          <div style="font-weight:700;font-size:16px;">${date}</div>
          <div style="color:var(--text-dim);font-size:13px;margin-top:2px;">
            ${w.exercises.length} ex. · ${totalSets} sets ${duration ? '· ' + duration : ''}
          </div>
        </div>
        <div class="eyebrow" style="background:var(--accent-glow);color:var(--accent);padding:4px 8px;border-radius:6px;">Done</div>
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
          <div class="eyebrow" style="text-align:center;">Workout</div>
          <div style="font-family:var(--font-mono);color:var(--text-dim);font-size:13px;text-align:center;">${elapsed} min</div>
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
        ${doneSets} / ${totalSets} sets · ${Math.round(progress)}%
      </div>

      ${w.exercises.map((ex, idx) => renderExerciseBlock(ex, idx)).join('')}

      <div style="margin-top:20px;">
        <button class="btn btn-secondary btn-block" onclick="openAddExercise()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add exercise
        </button>
      </div>

      <div style="margin-top:20px;">
        <button class="btn btn-primary btn-block btn-lg" onclick="finishWorkout()">
          Finish workout
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
    ? `Last time: ${lastSets[0].weight}kg × ${lastSets[0].reps}`
    : 'First time';

  return `
    <div class="card" style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
        <div style="flex:1;">
          <div class="eyebrow" style="margin-bottom:4px;">${MUSCLE_NAMES[def.muscle]}${def.compound ? ' · compound' : ''}</div>
          <div style="font-weight:700;font-size:18px;line-height:1.2;">${def.name}</div>
          <div style="color:var(--text-dim);font-size:12px;margin-top:4px;font-family:var(--font-mono);">${lastHint}</div>
        </div>
        <div style="display:flex;gap:6px;">
          ${def.video ? `
            <button class="btn-icon" onclick="showExerciseInfo('${def.id}')" style="width:36px;height:36px;" title="Watch video">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="6 4 20 12 6 20 6 4" fill="currentColor"/>
              </svg>
            </button>
          ` : ''}
          <button class="btn-icon" onclick="swapExercise(${idx})" style="width:36px;height:36px;" title="Replace">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="set-row" style="border-bottom:1px solid var(--border);padding-bottom:8px;margin-bottom:4px;">
        <div class="eyebrow" style="font-size:10px;">#</div>
        <div class="eyebrow" style="font-size:10px;text-align:center;">${def.isTime ? 'SECONDS' : 'KG'}</div>
        <div class="eyebrow" style="font-size:10px;text-align:center;">${def.isTime ? 'ROUNDS' : 'REPS'}</div>
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
        <button class="btn btn-ghost btn-sm" style="flex:1;" onclick="addSet(${idx})">+ Set</button>
        ${ex.sets.length > 1 ? `<button class="btn btn-ghost btn-sm" onclick="removeSet(${idx})">− Set</button>` : ''}
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
  if (confirm('Remove this exercise?')) {
    STATE.currentWorkout.exercises.splice(exIdx, 1);
    renderWorkout();
  }
}

function confirmExitWorkout() {
  const hasProgress = STATE.currentWorkout.exercises.some(e => e.sets.some(s => s.completed));
  if (!hasProgress || confirm('Exit without saving?')) {
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
    if (!confirm('Workout is empty. Save anyway?')) return;
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

  // Показываем сводку после всех PR-празднований
  const showSummary = () => {
    showWorkoutDetails(w.date);
  };

  if (prs.length > 0) {
    // Сохраняем PR в state на случай показа в истории
    w.prs = prs;
    save();
    // Покажем празднование PR, потом сводку, потом главную
    showPRCelebration(prs, () => {
      showSummary();
      // goHome будет вызван когда юзер закроет сводку
      // Но т.к. модалка может быть закрыта по клику вне, добавим safety
      // Просто ставим callback на закрытие модалки
      modalCloseCallback = goHome;
    });
  } else {
    toast('Workout saved 💪');
    showSummary();
    modalCloseCallback = goHome;
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
      toast('Rest is over!');
    }
  };

  openModal(`
    <div class="eyebrow" style="text-align:center;">Rest</div>
    <div class="timer-display" id="timer-display">${Math.floor(seconds/60)}:${(seconds%60).toString().padStart(2,'0')}</div>
    <div class="timer-progress">
      <div class="timer-progress-bar" id="timer-progress" style="width:0%"></div>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <button class="btn btn-secondary" style="flex:1;" onclick="adjustTimer(-15)">−15s</button>
      <button class="btn btn-secondary" style="flex:1;" onclick="adjustTimer(15)">+15s</button>
    </div>
    <button class="btn btn-primary btn-block" onclick="closeModal()">Skip</button>
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
    // Мобилити скрыты в обычной библиотеке (показываются только в Зарядке)
    if (e.category === 'mobility') return false;
    if (activeFilter !== 'all' && e.muscle !== activeFilter) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  render(`
    <div class="screen">
      <div class="header">
        <div>
          <div class="eyebrow">Library</div>
          <div style="font-family:var(--font-display);font-size:24px;">Exercises</div>
        </div>
        <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">${EXERCISES.filter(e => e.category !== 'mobility').length} ex.</div>
      </div>

      <input type="text" placeholder="Search exercise..." value="${search}"
             oninput="window._exerciseSearch = this.value; renderExerciseLibrary()"
             style="margin-bottom:16px;">

      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
        ${allMuscles.map(m => `
          <button class="pill ${activeFilter === m ? 'active' : ''}" style="cursor:pointer;border:none;"
                  onclick="window._exerciseFilter='${m}';renderExerciseLibrary()">
            ${m === 'all' ? 'All' : MUSCLE_NAMES[m]}
          </button>
        `).join('')}
      </div>

      ${filtered.length === 0 ? `
        <div class="empty">
          <div class="empty-icon">🔍</div>
          <div>No results</div>
        </div>
      ` : filtered.map(ex => `
        <div class="exercise-item" onclick="showExerciseInfo('${ex.id}')">
          <div class="exercise-icon">${ex.name[0]}</div>
          <div class="exercise-info">
            <div class="exercise-name">${ex.name}</div>
            <div class="exercise-meta">
              <span>${MUSCLE_NAMES[ex.muscle]}</span>
              ${ex.compound ? '<span>• compound</span>' : ''}
              <span>• ${ex.equipment.length === 0 ? 'no equipment' : ex.equipment.map(e => EQUIPMENT_NAMES[e]).join(', ')}</span>
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
    <div class="eyebrow">${MUSCLE_NAMES[ex.muscle]}${ex.compound ? ' · compound' : ''}</div>
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

    <div class="eyebrow" style="margin-bottom:8px;">Form tips</div>
    <ul style="list-style:none;padding:0;margin-bottom:16px;">
      ${ex.tips.map(t => `
        <li style="padding:8px 0;border-bottom:1px solid var(--border);display:flex;gap:10px;font-size:14px;">
          <span style="color:var(--accent);">—</span>
          <span>${t}</span>
        </li>
      `).join('')}
    </ul>

    ${history.length > 0 ? `
      <div class="eyebrow" style="margin-bottom:8px;">Progress (last 10)</div>
      <div style="background:var(--bg-elev-2);border-radius:12px;padding:12px;margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <div>
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">RECORD</div>
            <div style="font-family:var(--font-display);font-size:24px;color:var(--accent);">${maxWeight} kg</div>
          </div>
          <div>
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">LAST</div>
            <div style="font-family:var(--font-display);font-size:24px;">${lastSets[0]?.weight || 0} kg</div>
          </div>
        </div>
        ${renderMiniChart(history.map(h => Math.max(...h.sets.map(s => s.weight))))}
      </div>
    ` : ''}

    ${STATE.currentWorkout ? `
      <button class="btn btn-primary btn-block" onclick="addExerciseToWorkout('${ex.id}');closeModal();">
        Add to workout
      </button>
    ` : ''}
    <button class="btn btn-ghost btn-block" style="margin-top:8px;" onclick="closeModal()">Close</button>
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
  // Только силовые — мобилити недоступны в силовой тренировке
  const available = EXERCISES.filter(ex =>
    ex.category !== 'mobility' && exerciseAvailable(ex, equipment)
  );

  openModal(`
    <div class="eyebrow">Add</div>
    <h2 class="modal-title">Choose exercise</h2>
    <input type="text" placeholder="Search..." id="add-ex-search"
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
    <button class="btn btn-ghost btn-block" style="margin-top:12px;" onclick="closeModal()">Cancel</button>
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

// ============== MORNING ROUTINE: SCREENS ==============

// Утилита для звукового сигнала + вибрации (используется и в силовых, и в зарядке)
function playTimerEndSignal() {
  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ==');
    audio.play();
  } catch(e) {}
}

// Получает 'YYYY-MM-DD' для даты в локали
function dateKey(d) {
  d = d || new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Извлекаем массив сделанных id (новый формат) — поддерживая старые записи v2
function getCompletedIds(record) {
  if (Array.isArray(record.completedExerciseIds)) return record.completedExerciseIds;
  return [];
}

// Считает количество сделанных упражнений (для совместимости со старыми записями v2)
function getCompletedCount(record) {
  if (Array.isArray(record.completedExerciseIds)) return record.completedExerciseIds.length;
  if (typeof record.completedExercises === 'number') return record.completedExercises;
  return 0;
}

// Пересчёт стрика после новой зарядки (если хотя бы 1 упражнение сделано)
function updateMorningStreakAfterRoutine() {
  const today = dateKey();
  if (STATE.morningLastDate === today) {
    // уже была сегодня — не увеличиваем стрик повторно
    return;
  }
  // Проверяем была ли вчера зарядка
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = dateKey(yesterday);
  if (STATE.morningLastDate === yesterdayKey) {
    STATE.morningStreak = (STATE.morningStreak || 0) + 1;
  } else {
    // прервалась цепочка — начинаем с 1
    STATE.morningStreak = 1;
  }
  STATE.morningLastDate = today;
}

// Главный экран Morning — единая программа
function renderMorningHome() {
  const todayKey = dateKey();
  const doneToday = STATE.morningLastDate === todayKey;
  const recent = (STATE.routines || []).slice(-5).reverse();
  const program = MORNING_PROGRAM;
  const totalSec = programDurationSec(program);
  const min = Math.ceil(totalSec / 60);

  render(`
    <div class="screen">
      <div class="header">
        <div>
          <div class="eyebrow">Morning</div>
          <div style="font-family:var(--font-display);font-size:24px;">Wake up</div>
        </div>
      </div>

      ${STATE.morningStreak > 0 ? `
        <div style="background:var(--bg-elev);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:16px;display:flex;align-items:center;gap:12px;">
          <div style="font-size:32px;">🔥</div>
          <div style="flex:1;">
            <div style="font-family:var(--font-display);font-size:24px;color:var(--accent);">${STATE.morningStreak}</div>
            <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;">${STATE.morningStreak === 1 ? 'day' : 'days'} in a row</div>
          </div>
          ${doneToday ? `<div style="font-size:11px;color:var(--accent);font-family:var(--font-mono);">✓ DONE TODAY</div>` : ''}
        </div>
      ` : ''}

      <!-- Главная карточка единой программы -->
      <div style="background:var(--bg-elev);border:1px solid var(--border);border-radius:14px;padding:20px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div style="font-size:36px;">${program.icon}</div>
          <div style="flex:1;">
            <div style="font-family:var(--font-display);font-size:22px;">${program.name}</div>
            <div style="font-size:12px;color:var(--text-dim);">${program.description}</div>
          </div>
        </div>
        <div style="font-size:11px;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:16px;">
          ${program.steps.length} exercises • up to ~${min} min · skip what you don't need
        </div>
        <button class="btn btn-primary btn-block" onclick="startRoutine()">
          START ROUTINE →
        </button>
      </div>

      <!-- Список упражнений до запуска -->
      <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">
        Today's exercises
      </div>
      ${program.steps.map((step, i) => {
        const ex = routineStepExercise(step);
        if (!ex) return '';
        const detail = step.duration ? `${step.duration}s` : `×${step.reps}`;
        return `
          <div style="background:var(--bg-elev-2);border:1px solid var(--border);border-radius:10px;padding:10px;margin-bottom:6px;display:flex;align-items:center;gap:10px;">
            <div style="width:28px;height:28px;border-radius:6px;background:var(--bg-elev-3);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:12px;color:var(--accent);">${i + 1}</div>
            <div style="flex:1;font-size:13px;">${ex.name}</div>
            <div style="font-family:var(--font-mono);font-size:12px;color:var(--text-muted);">${detail}</div>
          </div>
        `;
      }).join('')}

      ${recent.length > 0 ? `
        <div style="margin-top:24px;">
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Recent</div>
          ${recent.map(r => {
            const date = new Date(r.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const min = Math.round(r.duration / 60);
            const minDisplay = min < 1 ? '<1m' : `${min}m`;
            const completedCount = getCompletedCount(r);
            return `
              <div style="display:flex;align-items:center;gap:8px;padding:10px 8px;border-bottom:1px solid var(--border);">
                <button onclick="openRoutineSummary('${r.id}')" style="flex:1;display:flex;justify-content:space-between;align-items:center;background:transparent;border:none;font-size:13px;cursor:pointer;color:var(--text);font-family:inherit;text-align:left;padding:0;">
                  <span style="color:var(--text-dim);min-width:60px;">${date.toUpperCase()}</span>
                  <span style="flex:1;text-align:center;">🌅 ${completedCount} ${completedCount === 1 ? 'ex' : 'ex'}</span>
                  <span style="color:var(--text-muted);font-family:var(--font-mono);">${minDisplay}</span>
                </button>
                <button onclick="event.stopPropagation();shareRoutineById('${r.id}')" aria-label="Share" style="background:transparent;border:none;cursor:pointer;padding:6px;color:var(--text-muted);display:flex;align-items:center;justify-content:center;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                </button>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}
    </div>
  `);
}

// Запуск зарядки (программа всегда одна — MORNING_PROGRAM)
function startRoutine() {
  const program = MORNING_PROGRAM;
  STATE.currentRoutine = {
    programId: program.id,
    stepIndex: 0,                    // текущий шаг
    phase: 'exercise',               // 'exercise' | 'rest'
    timeLeft: program.steps[0].duration || null,  // null для упражнений с повторами
    totalSteps: program.steps.length,
    startedAt: Date.now(),
    paused: false,
    interval: null,
    completedIds: [],                // id успешно сделанных упражнений
    skippedIds: []                   // id скипнутых
  };
  STATE.view = 'routine-player';
  renderApp();
  // Запускаем таймер если timed-упражнение
  if (STATE.currentRoutine.timeLeft) {
    startRoutineTimer();
  }
}

// Тикалка таймера зарядки
function startRoutineTimer() {
  const r = STATE.currentRoutine;
  if (!r) return;
  if (r.interval) clearInterval(r.interval);
  r.interval = setInterval(() => {
    if (r.paused) return;
    r.timeLeft -= 1;
    updateRoutinePlayerTimer();
    if (r.timeLeft <= 0) {
      clearInterval(r.interval);
      r.interval = null;
      playTimerEndSignal();
      // Автопереход к следующему шагу — таймер на упражнении истёк = упражнение сделано
      if (r.phase === 'exercise') {
        const step = MORNING_PROGRAM.steps[r.stepIndex];
        if (step && !r.completedIds.includes(step.exerciseId)) {
          r.completedIds.push(step.exerciseId);
        }
      }
      routineNextStep();
    }
  }, 1000);
}

// Обновляет только таймер на экране (без полного ререндера)
function updateRoutinePlayerTimer() {
  const r = STATE.currentRoutine;
  if (!r) return;
  const el = document.getElementById('routine-timer-value');
  if (el) {
    el.textContent = r.timeLeft !== null ? r.timeLeft : '—';
  }
  // Прогрессбар таймера
  const ring = document.getElementById('routine-timer-ring');
  if (ring && r.timeLeft !== null) {
    const step = MORNING_PROGRAM.steps[r.stepIndex];
    const totalForStep = r.phase === 'rest' ? ROUTINE_GET_READY_SEC : (step.duration || 0);
    if (totalForStep > 0) {
      const fraction = r.timeLeft / totalForStep;
      const C = 2 * Math.PI * 90; // circumference (radius 90)
      ring.style.strokeDashoffset = C * (1 - fraction);
    }
  }
}

// Переход к следующему шагу или фаза отдыха
function routineNextStep() {
  const r = STATE.currentRoutine;
  if (!r) return;
  const program = MORNING_PROGRAM;

  if (r.phase === 'exercise') {
    // После упражнения: либо отдых перед следующим, либо завершение
    if (r.stepIndex >= program.steps.length - 1) {
      // Это было последнее упражнение → финиш
      finishRoutine();
      return;
    }
    // Иначе — фаза отдыха
    r.phase = 'rest';
    r.timeLeft = ROUTINE_GET_READY_SEC;
    renderApp();
    startRoutineTimer();
  } else {
    // После отдыха: следующее упражнение
    r.stepIndex += 1;
    r.phase = 'exercise';
    const nextStep = program.steps[r.stepIndex];
    r.timeLeft = nextStep.duration || null;
    renderApp();
    if (r.timeLeft) startRoutineTimer();
  }
}

// Завершение зарядки (после последнего шага или ручное)
function finishRoutine() {
  const r = STATE.currentRoutine;
  if (!r) return;
  if (r.interval) { clearInterval(r.interval); r.interval = null; }

  const completedAt = Date.now();
  const duration = Math.round((completedAt - r.startedAt) / 1000);

  // Сохраняем в STATE.routines (новый формат v3)
  const record = {
    id: 'r-' + completedAt,
    programId: r.programId,
    timestamp: completedAt,
    duration: duration,
    completedExerciseIds: [...r.completedIds],
    skippedExerciseIds: [...r.skippedIds]
  };
  STATE.routines = STATE.routines || [];
  STATE.routines.push(record);

  // Стрик считается если хотя бы 1 упражнение сделано
  if (r.completedIds.length > 0) {
    updateMorningStreakAfterRoutine();
  }

  // Сохраняем
  save();

  // Сводка
  STATE.currentRoutine = null;
  showRoutineSummary(record);
}

// Прерывание (пользователь нажал Exit)
function exitRoutine() {
  if (!STATE.currentRoutine) return;
  const r = STATE.currentRoutine;
  // Если что-то уже сделал — спросим точно ли выйти
  if (r.completedIds.length > 0) {
    if (!confirm('Exit and lose progress? Your routine is not yet saved.')) return;
  }
  if (r.interval) clearInterval(r.interval);
  STATE.currentRoutine = null;
  STATE.view = 'morning';
  renderApp();
  toast('Routine cancelled');
}

// Skip-упражнение (пользователь решил не делать)
function skipExercise() {
  const r = STATE.currentRoutine;
  if (!r) return;
  if (r.phase === 'exercise') {
    const step = MORNING_PROGRAM.steps[r.stepIndex];
    if (step && !r.skippedIds.includes(step.exerciseId)) {
      r.skippedIds.push(step.exerciseId);
    }
  }
  if (r.interval) { clearInterval(r.interval); r.interval = null; }
  routineNextStep();
}

// Кнопка "DONE" для упражнений с повторами (когда таймера нет)
function markExerciseDone() {
  const r = STATE.currentRoutine;
  if (!r) return;
  if (r.phase === 'exercise') {
    const step = MORNING_PROGRAM.steps[r.stepIndex];
    if (step && !r.completedIds.includes(step.exerciseId)) {
      r.completedIds.push(step.exerciseId);
    }
  }
  routineNextStep();
}

// Skip rest-фазы (между упражнениями) — сразу к следующему
function skipRestPhase() {
  const r = STATE.currentRoutine;
  if (!r) return;
  if (r.interval) { clearInterval(r.interval); r.interval = null; }
  routineNextStep();
}

// Pause/Resume
function toggleRoutinePause() {
  const r = STATE.currentRoutine;
  if (!r) return;
  r.paused = !r.paused;
  // Обновим только текст кнопки
  const btn = document.getElementById('routine-pause-btn');
  if (btn) btn.textContent = r.paused ? '▶' : '⏸';
}

// Плеер зарядки
function renderRoutinePlayer() {
  const r = STATE.currentRoutine;
  if (!r) {
    STATE.view = 'morning';
    renderApp();
    return;
  }
  const program = MORNING_PROGRAM;

  if (r.phase === 'rest') {
    // Экран отдыха
    const next = program.steps[r.stepIndex + 1];
    const nextEx = next ? routineStepExercise(next) : null;
    render(`
      <div class="screen" style="background:var(--bg);">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0 16px;">
          <button class="btn btn-secondary" style="padding:6px 12px;font-size:12px;" onclick="exitRoutine()">✕ Exit</button>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">
            STEP ${r.stepIndex + 2} OF ${r.totalSteps}
          </div>
        </div>

        <div style="text-align:center;padding:32px 0;">
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">Get ready</div>
          <div style="font-family:var(--font-display);font-size:24px;color:var(--text-dim);margin-bottom:24px;">
            ${nextEx ? 'Next: ' + nextEx.name : 'Next exercise'}
          </div>

          ${routineTimerCircle(r.timeLeft, ROUTINE_GET_READY_SEC)}

          <div style="margin-top:32px;display:flex;gap:8px;justify-content:center;">
            <button class="btn btn-secondary" id="routine-pause-btn" onclick="toggleRoutinePause()" style="min-width:60px;">⏸</button>
            <button class="btn btn-primary" onclick="skipRestPhase()">SKIP REST →</button>
          </div>
        </div>
      </div>
    `);
    return;
  }

  // Экран упражнения
  const step = program.steps[r.stepIndex];
  const ex = routineStepExercise(step);
  if (!ex) {
    exitRoutine();
    return;
  }

  const isTimed = !!step.duration;
  const completedCount = r.completedIds.length;
  const skippedCount = r.skippedIds.length;

  render(`
    <div class="screen" style="background:var(--bg);">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0 16px;">
        <button class="btn btn-secondary" style="padding:6px 12px;font-size:12px;" onclick="exitRoutine()">✕ Exit</button>
        <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">
          ${r.stepIndex + 1} / ${r.totalSteps} · ✓${completedCount} ✕${skippedCount}
        </div>
      </div>

      <!-- Прогресс программы -->
      <div style="height:4px;background:var(--bg-elev-2);border-radius:2px;margin-bottom:16px;overflow:hidden;">
        <div style="height:100%;background:var(--accent);width:${((r.stepIndex) / r.totalSteps) * 100}%;transition:width 0.3s;"></div>
      </div>

      <div style="text-align:center;">
        <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:6px;">${ex.muscle}</div>
        <div style="font-family:var(--font-display);font-size:28px;margin-bottom:16px;">${ex.name}</div>

        <!-- Видео -->
        ${ex.video ? `
          <div style="position:relative;width:100%;padding-bottom:56.25%;background:var(--bg-elev-2);border-radius:12px;overflow:hidden;margin-bottom:20px;">
            <iframe src="https://www.youtube.com/embed/${ex.video}?autoplay=0&modestbranding=1&rel=0"
                    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
          </div>
        ` : ''}

        <!-- Таймер или повторы -->
        ${isTimed
          ? routineTimerCircle(r.timeLeft, step.duration)
          : `
            <div style="padding:24px 0;">
              <div style="font-family:var(--font-display);font-size:64px;color:var(--accent);">×${step.reps}</div>
              <div style="font-size:13px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;">reps</div>
            </div>
          `
        }

        <!-- Описание -->
        <div style="text-align:left;background:var(--bg-elev);border:1px solid var(--border);border-radius:10px;padding:12px;margin:16px 0;font-size:13px;color:var(--text-dim);line-height:1.5;">
          ${ex.description}
        </div>

        <!-- 3 кнопки: Pause / Skip / Done(или авто-таймер для timed) -->
        <div style="display:flex;gap:8px;">
          <button class="btn btn-secondary" id="routine-pause-btn" onclick="toggleRoutinePause()" style="min-width:60px;">⏸</button>
          <button class="btn btn-secondary" style="flex:1;" onclick="skipExercise()">SKIP</button>
          ${isTimed
            ? ''
            : `<button class="btn btn-primary" style="flex:1;" onclick="markExerciseDone()">DONE →</button>`
          }
        </div>
      </div>
    </div>
  `);
}

// Круговой таймер с большим числом по центру
function routineTimerCircle(timeLeft, totalSec) {
  const C = 2 * Math.PI * 90;
  const fraction = timeLeft / totalSec;
  const offset = C * (1 - fraction);
  return `
    <div style="position:relative;width:200px;height:200px;margin:0 auto;">
      <svg viewBox="0 0 200 200" style="width:100%;height:100%;transform:rotate(-90deg);">
        <circle cx="100" cy="100" r="90" fill="none" stroke="var(--bg-elev-2)" stroke-width="8"/>
        <circle id="routine-timer-ring" cx="100" cy="100" r="90" fill="none" stroke="var(--accent)" stroke-width="8"
                stroke-dasharray="${C}" stroke-dashoffset="${offset}" stroke-linecap="round"
                style="transition:stroke-dashoffset 1s linear;"/>
      </svg>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
        <div id="routine-timer-value" style="font-family:var(--font-display);font-size:56px;color:var(--accent);line-height:1;">${timeLeft !== null ? timeLeft : '—'}</div>
        <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.15em;margin-top:4px;">seconds</div>
      </div>
    </div>
  `;
}

// Сводка после новой зарядки
function showRoutineSummary(record) {
  const program = MORNING_PROGRAM;
  const min = Math.round(record.duration / 60);
  const minDisplay = min < 1 ? '<1' : min;
  const completedCount = getCompletedCount(record);
  // Сохраняю id для шеринга
  window._lastRoutineRecord = record;

  openModal(`
    <div style="text-align:center;">
      <div style="font-size:48px;margin-bottom:8px;">${program.icon}</div>
      <div style="font-family:var(--font-display);font-size:28px;color:var(--accent);margin-bottom:4px;">DONE!</div>
      <div style="color:var(--text-dim);margin-bottom:24px;">
        ${completedCount} ${completedCount === 1 ? 'exercise' : 'exercises'} done · ${minDisplay} min
      </div>

      ${STATE.morningStreak > 1 ? `
        <div style="background:var(--bg-elev);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:24px;">
          <div style="font-size:32px;">🔥</div>
          <div style="font-family:var(--font-display);font-size:32px;color:var(--accent);">${STATE.morningStreak}</div>
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;">days in a row</div>
        </div>
      ` : (completedCount > 0 ? `
        <div style="background:var(--bg-elev);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:24px;">
          <div style="font-size:32px;">🎉</div>
          <div style="font-family:var(--font-display);font-size:18px;color:var(--accent);margin-top:4px;">First day done</div>
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;">come back tomorrow</div>
        </div>
      ` : `
        <div style="background:var(--bg-elev);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:24px;">
          <div style="font-size:14px;color:var(--text-dim);">No exercises completed</div>
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">streak not counted</div>
        </div>
      `)}

      <div style="display:flex;gap:8px;">
        ${completedCount > 0 ? `<button class="btn btn-secondary" style="flex:1;" onclick="shareRoutine(window._lastRoutineRecord)">SHARE</button>` : ''}
        <button class="btn btn-primary" style="flex:1;" onclick="closeModal();STATE.view='morning';renderApp()">DONE</button>
      </div>
    </div>
  `);
}

// Открыть сводку старой зарядки из Recent (с кнопкой Share)
function openRoutineSummary(recordId) {
  const record = (STATE.routines || []).find(r => r.id === recordId);
  if (!record) return;
  const program = MORNING_PROGRAM;
  const min = Math.round(record.duration / 60);
  const minDisplay = min < 1 ? '<1' : min;
  const dateStr = new Date(record.timestamp).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  const completedIds = getCompletedIds(record);
  const completedCount = getCompletedCount(record);

  window._lastRoutineRecord = record;

  // Показываем сделанные упражнения; если запись старая (v2) — показываем все из текущей программы
  const isLegacy = !Array.isArray(record.completedExerciseIds);

  openModal(`
    <div style="text-align:center;">
      <div class="eyebrow" style="text-align:center;">${dateStr}</div>
      <div style="font-size:48px;margin:8px 0;">${program.icon}</div>
      <div style="font-family:var(--font-display);font-size:24px;margin-bottom:4px;">Morning Routine</div>
      <div style="color:var(--text-dim);font-size:14px;margin-bottom:16px;">
        ${minDisplay} min · ${completedCount} ${completedCount === 1 ? 'exercise' : 'exercises'} done
        ${isLegacy ? '<span style="font-size:11px;color:var(--text-muted);"> (legacy)</span>' : ''}
      </div>

      ${!isLegacy && completedIds.length > 0 ? `
        <div style="text-align:left;background:var(--bg-elev);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:16px;">
          ${completedIds.map((id, i) => {
            const ex = EXERCISES.find(e => e.id === id);
            if (!ex) return '';
            const step = MORNING_PROGRAM.steps.find(s => s.exerciseId === id);
            const detail = step ? (step.duration ? `${step.duration}s` : `×${step.reps}`) : '';
            return `
              <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px;${i < completedIds.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}">
                <span style="color:var(--text);">✓ ${ex.name}</span>
                <span style="color:var(--text-muted);font-family:var(--font-mono);">${detail}</span>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}

      <div style="display:flex;gap:8px;">
        <button class="btn btn-secondary" style="flex:1;" onclick="closeModal()">CLOSE</button>
        ${completedCount > 0 ? `<button class="btn btn-primary" style="flex:1;" onclick="shareRoutine(window._lastRoutineRecord)">SHARE</button>` : ''}
      </div>
    </div>
  `);
}

// Share по id (для тапа на иконку Share прямо в Recent)
function shareRoutineById(recordId) {
  const record = (STATE.routines || []).find(r => r.id === recordId);
  if (!record) return;
  shareRoutine(record);
}


// ============== STATS SCREEN ==============
function renderStats() {
  if (STATE.history.length === 0) {
    render(`
      <div class="screen">
        <div class="header">
          <div>
            <div class="eyebrow">Analytics</div>
            <div style="font-family:var(--font-display);font-size:24px;">Progress</div>
          </div>
        </div>
        <div class="empty">
          <div class="empty-icon">📊</div>
          <div style="font-weight:600;color:var(--text);margin-bottom:4px;">No data yet</div>
          <div>Data will appear after your first workout</div>
          <button class="btn btn-primary" style="margin-top:20px;" onclick="startWorkout()">
            Start first workout
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
    const volume = workouts.reduce((s, w) => s + computeVolume(w), 0);
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
          <div class="eyebrow">Analytics</div>
          <div style="font-family:var(--font-display);font-size:24px;">Progress</div>
        </div>
      </div>

      <h3 class="section-title">Weekly volume</h3>
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
                ${i === 3 ? 'Now' : `-${3-i}w`}
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

      <h3 class="section-title">Muscle balance</h3>
      <div class="card">
        ${Object.entries(muscleStats).filter(([_, v]) => v > 0).map(([m, v]) => {
          const pct = totalMuscleSets > 0 ? (v / totalMuscleSets) * 100 : 0;
          return `
            <div style="margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:13px;">
                <span style="font-weight:600;">${MUSCLE_NAMES[m]}</span>
                <span style="font-family:var(--font-mono);color:var(--text-dim);">${v} sets · ${Math.round(pct)}%</span>
              </div>
              <div style="height:6px;background:var(--bg-elev-3);border-radius:3px;overflow:hidden;">
                <div style="height:100%;background:var(--accent);width:${pct}%;transition:width 0.3s;"></div>
              </div>
            </div>
          `;
        }).join('') || '<div class="empty" style="padding:20px 0;">No data</div>'}
      </div>

      ${topExercises.length > 0 ? `
        <h3 class="section-title">Top exercises</h3>
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

      <h3 class="section-title">History <span class="count">${STATE.history.length}</span></h3>
      ${STATE.history.slice().reverse().map(w => renderWorkoutCard(w)).join('')}
    </div>
  `);
}

// ============== WORKOUT SUMMARY HELPERS ==============

// Эффективная нагрузка одного подхода (кг × повторы), с учётом bwFactor для bodyweight упражнений
// Если weight > 0 — обычное произведение
// Если weight = 0 (bodyweight) — используем bodyweight × bwFactor × reps
function setVolume(set, exDef) {
  if (!set.completed) return 0;
  if (set.weight > 0) {
    return set.weight * set.reps;
  }
  // Bodyweight упражнение
  const bw = STATE.profile?.bodyweight || 75;
  const factor = (exDef && exDef.bwFactor) || 0.5;
  return bw * factor * set.reps;
}

// Полный объём тренировки в кг (с учётом bodyweight)
function computeVolume(workout) {
  return workout.exercises.reduce((total, e) => {
    const def = EXERCISES.find(x => x.id === e.exerciseId);
    return total + e.sets.reduce((s, set) => s + setVolume(set, def), 0);
  }, 0);
}

// Приблизительная оценка калорий за тренировку
// Формула: тоннаж * базовый коэф + длительность * MET-фактор
// Учитывает вес юзера если есть
function estimateCalories(workout) {
  const bodyweight = STATE.profile?.bodyweight || 75;
  let calories = 0;

  workout.exercises.forEach(e => {
    const def = EXERCISES.find(x => x.id === e.exerciseId);
    if (!def) return;
    e.sets.forEach(s => {
      if (!s.completed) return;
      // Используем единую формулу — эффективная работа в кг × повторы
      const work = setVolume(s, def);
      // Множитель: компаунд тратит больше энергии
      const mult = def.compound ? 0.10 : 0.07;
      calories += work * mult;
    });
  });

  // Добавляем базовый расход за время (упрощённый MET ~5 для силовой = 5 ккал/мин на 70кг)
  if (workout.duration) {
    const minutes = workout.duration / 60;
    calories += (bodyweight / 70) * 5 * minutes * 0.3;
  }

  return Math.round(calories);
}

// Собирает все задействованные группы мышц с весами (primary+secondary)
function getWorkedMuscles(workout) {
  const muscles = {};
  workout.exercises.forEach(e => {
    const def = EXERCISES.find(x => x.id === e.exerciseId);
    if (!def) return;
    const completedSets = e.sets.filter(s => s.completed).length;
    if (completedSets === 0) return;
    muscles[def.muscle] = (muscles[def.muscle] || 0) + completedSets * 1.5;
    (def.secondary || []).forEach(m => {
      muscles[m] = (muscles[m] || 0) + completedSets * 0.5;
    });
  });
  // Сортируем по нагрузке, оставляем топ-5
  return Object.entries(muscles)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([m]) => m);
}

// Маленькая SVG-иконка целевой мышцы (используется в шапке сводки)
function muscleIcon(muscle, active = true) {
  const fill = active ? 'var(--accent)' : 'var(--bg-elev-3)';
  const bg = 'var(--bg-elev-2)';
  const stroke = 'var(--border-strong)';

  const icons = {
    chest: `<rect x="14" y="18" width="20" height="14" rx="3" fill="${fill}"/>
            <line x1="24" y1="18" x2="24" y2="32" stroke="${bg}" stroke-width="2"/>`,
    back: `<path d="M14 14 L34 14 L32 34 L16 34 Z" fill="${fill}"/>
           <line x1="24" y1="14" x2="24" y2="34" stroke="${bg}" stroke-width="2"/>`,
    legs: `<rect x="14" y="14" width="8" height="22" rx="3" fill="${fill}"/>
           <rect x="26" y="14" width="8" height="22" rx="3" fill="${fill}"/>`,
    shoulders: `<circle cx="16" cy="20" r="6" fill="${fill}"/>
                <circle cx="32" cy="20" r="6" fill="${fill}"/>
                <rect x="20" y="22" width="8" height="10" fill="${fill}"/>`,
    biceps: `<ellipse cx="24" cy="20" rx="6" ry="9" fill="${fill}"/>
             <rect x="20" y="26" width="8" height="10" rx="2" fill="${fill}" opacity="0.5"/>`,
    triceps: `<ellipse cx="24" cy="22" rx="7" ry="10" fill="${fill}"/>`,
    core: `<rect x="18" y="14" width="12" height="20" rx="4" fill="${fill}"/>
           <line x1="24" y1="14" x2="24" y2="34" stroke="${bg}" stroke-width="1.5"/>
           <line x1="18" y1="22" x2="30" y2="22" stroke="${bg}" stroke-width="1.5"/>
           <line x1="18" y1="28" x2="30" y2="28" stroke="${bg}" stroke-width="1.5"/>`
  };

  return `
    <div style="width:54px;height:54px;background:${bg};border:1px solid ${stroke};border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
      <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
        ${icons[muscle] || `<circle cx="24" cy="24" r="10" fill="${fill}"/>`}
      </svg>
    </div>
  `;
}

// Анатомический силуэт человека (спереди + сзади) с подсветкой работавших мышц
// muscles — массив id ['chest', 'back', ...]
// Используется в HTML-сводке вместо иконок-плиток
function workoutSilhouetteSVG(muscles) {
  const set = new Set(muscles);
  const accent = 'var(--accent)';
  const dim = 'var(--bg-elev-3)';
  const stroke = 'var(--border-strong)';
  const skin = 'var(--bg-elev-2)';

  // Возвращает заливку для каждой группы — accent если работала, dim если нет
  const c = (m) => set.has(m) ? accent : dim;

  // Силуэт: V-образный мужской с пропорциями
  // ViewBox 100×200. Плечи широкие (20-80), талия узкая (38-62).
  // Спина и фронт согласованы по контуру и высоте.
  return `
    <div style="display:flex;justify-content:center;align-items:flex-start;gap:24px;padding:8px 0;">
      <!-- ВИД СПЕРЕДИ -->
      <svg viewBox="0 0 100 200" width="105" height="240" xmlns="http://www.w3.org/2000/svg">
        <!-- голова -->
        <circle cx="50" cy="14" r="8" fill="${skin}" stroke="${stroke}" stroke-width="0.8"/>
        <!-- шея -->
        <rect x="46" y="21" width="8" height="5" fill="${skin}"/>

        <!-- ПЛЕЧИ (дельты) — большие эллипсы по бокам -->
        <ellipse cx="20" cy="36" rx="11" ry="9" fill="${c('shoulders')}" stroke="${stroke}" stroke-width="0.8"/>
        <ellipse cx="80" cy="36" rx="11" ry="9" fill="${c('shoulders')}" stroke="${stroke}" stroke-width="0.8"/>

        <!-- ГРУДЬ — две половины -->
        <path d="M30 30 L50 30 L50 58 L34 62 L30 56 Z" fill="${c('chest')}" stroke="${stroke}" stroke-width="0.8"/>
        <path d="M70 30 L50 30 L50 58 L66 62 L70 56 Z" fill="${c('chest')}" stroke="${stroke}" stroke-width="0.8"/>

        <!-- БИЦЕПСЫ — массивные -->
        <path d="M11 44 L9 78 L22 80 L24 46 Z" fill="${c('biceps')}" stroke="${stroke}" stroke-width="0.8"/>
        <path d="M89 44 L91 78 L78 80 L76 46 Z" fill="${c('biceps')}" stroke="${stroke}" stroke-width="0.8"/>

        <!-- Предплечья -->
        <rect x="9" y="80" width="11" height="24" rx="3" fill="${skin}" stroke="${stroke}" stroke-width="0.6"/>
        <rect x="80" y="80" width="11" height="24" rx="3" fill="${skin}" stroke="${stroke}" stroke-width="0.6"/>

        <!-- ПРЕСС / КОР — V-образная талия -->
        <path d="M34 62 L66 62 L62 96 L38 96 Z" fill="${c('core')}" stroke="${stroke}" stroke-width="0.8"/>
        ${set.has('core') ? `
          <line x1="50" y1="64" x2="50" y2="94" stroke="rgba(0,0,0,0.4)" stroke-width="0.8"/>
          <line x1="40" y1="74" x2="60" y2="74" stroke="rgba(0,0,0,0.4)" stroke-width="0.7"/>
          <line x1="40" y1="84" x2="60" y2="84" stroke="rgba(0,0,0,0.4)" stroke-width="0.7"/>
        ` : ''}

        <!-- Бёдра / квадрицепсы — начинаются с y=96 -->
        <path d="M38 96 L34 148 L46 150 L50 96 Z" fill="${c('legs')}" stroke="${stroke}" stroke-width="0.8"/>
        <path d="M62 96 L66 148 L54 150 L50 96 Z" fill="${c('legs')}" stroke="${stroke}" stroke-width="0.8"/>

        <!-- Голени -->
        <rect x="35" y="150" width="11" height="40" rx="3" fill="${skin}" stroke="${stroke}" stroke-width="0.6"/>
        <rect x="54" y="150" width="11" height="40" rx="3" fill="${skin}" stroke="${stroke}" stroke-width="0.6"/>
      </svg>

      <!-- ВИД СЗАДИ -->
      <svg viewBox="0 0 100 200" width="105" height="240" xmlns="http://www.w3.org/2000/svg">
        <!-- голова -->
        <circle cx="50" cy="14" r="8" fill="${skin}" stroke="${stroke}" stroke-width="0.8"/>
        <rect x="46" y="21" width="8" height="5" fill="${skin}"/>

        <!-- СПИНА: 4 зоны V-формы, до y=80 (без расширений) -->
        <!-- Трапеции -->
        <path d="M30 30 L70 30 L68 44 L32 44 Z" fill="${c('back')}" stroke="${stroke}" stroke-width="0.8"/>
        <!-- Верх спины -->
        <path d="M32 44 L68 44 L67 60 L33 60 Z" fill="${c('back')}" stroke="${stroke}" stroke-width="0.8"/>
        <!-- Широчайшие -->
        <path d="M33 60 L67 60 L65 80 L35 80 Z" fill="${c('back')}" stroke="${stroke}" stroke-width="0.8"/>
        <!-- Ягодицы — занимают зону 80-96, чтобы ноги начались с y=96 как спереди -->
        <path d="M35 80 L65 80 L62 96 L38 96 Z" fill="${c('legs')}" stroke="${stroke}" stroke-width="0.8"/>
        <!-- Линия позвоночника (только до y=80, в спине) -->
        <line x1="50" y1="30" x2="50" y2="80" stroke="rgba(0,0,0,0.45)" stroke-width="0.8"/>
        <!-- Лёгкая граница между низом спины и ягодицами -->
        <line x1="38" y1="80" x2="62" y2="80" stroke="rgba(0,0,0,0.3)" stroke-width="0.5"/>
        <!-- Лопатки (если активна спина) -->
        ${set.has('back') ? `
          <path d="M40 50 Q44 56 48 56" stroke="rgba(0,0,0,0.35)" stroke-width="0.7" fill="none"/>
          <path d="M60 50 Q56 56 52 56" stroke="rgba(0,0,0,0.35)" stroke-width="0.7" fill="none"/>
        ` : ''}

        <!-- ПЛЕЧИ — поверх спины -->
        <ellipse cx="20" cy="36" rx="11" ry="9" fill="${c('shoulders')}" stroke="${stroke}" stroke-width="0.8"/>
        <ellipse cx="80" cy="36" rx="11" ry="9" fill="${c('shoulders')}" stroke="${stroke}" stroke-width="0.8"/>

        <!-- ТРИЦЕПСЫ -->
        <path d="M11 44 L9 78 L22 80 L24 46 Z" fill="${c('triceps')}" stroke="${stroke}" stroke-width="0.8"/>
        <path d="M89 44 L91 78 L78 80 L76 46 Z" fill="${c('triceps')}" stroke="${stroke}" stroke-width="0.8"/>

        <!-- Предплечья -->
        <rect x="9" y="80" width="11" height="24" rx="3" fill="${skin}" stroke="${stroke}" stroke-width="0.6"/>
        <rect x="80" y="80" width="11" height="24" rx="3" fill="${skin}" stroke="${stroke}" stroke-width="0.6"/>

        <!-- Бёдра — те же координаты что спереди -->
        <path d="M38 96 L34 148 L46 150 L50 96 Z" fill="${c('legs')}" stroke="${stroke}" stroke-width="0.8"/>
        <path d="M62 96 L66 148 L54 150 L50 96 Z" fill="${c('legs')}" stroke="${stroke}" stroke-width="0.8"/>

        <!-- Голени -->
        <rect x="35" y="150" width="11" height="40" rx="3" fill="${skin}" stroke="${stroke}" stroke-width="0.6"/>
        <rect x="54" y="150" width="11" height="40" rx="3" fill="${skin}" stroke="${stroke}" stroke-width="0.6"/>
      </svg>
    </div>
  `;
}

// ============== WORKOUT SUMMARY MODAL ==============
function showWorkoutDetails(date) {
  const w = STATE.history.find(x => x.date === date);
  if (!w) return;

  const dateStr = new Date(w.date).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
  const duration = formatDuration(w.duration);
  const totalVolume = computeVolume(w);
  const calories = estimateCalories(w);
  const targetMuscles = getWorkedMuscles(w);
  const completedExercises = w.exercises.filter(e => e.sets.some(s => s.completed));
  const prCount = (w.prs || []).length;

  // Заголовок: "Грудь, Спина, Плечи..."
  const muscleTitle = targetMuscles.map(m => MUSCLE_NAMES[m]).join(', ');

  openModal(`
    <div id="workout-summary-card" style="background:linear-gradient(160deg, var(--bg-elev), var(--bg-elev-2));border-radius:16px;padding:20px;margin:-20px -20px 16px;">

      <!-- Шапка: лого + дата -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="logo-mark" style="width:18px;height:18px;"></span>
          <span style="font-family:var(--font-display);font-size:14px;letter-spacing:0.05em;">FORGE</span>
        </div>
        <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.1em;">
          ${dateStr}${duration ? ' · ' + duration : ''}
        </div>
      </div>

      <!-- Анатомический силуэт с подсветкой работавших мышц -->
      ${workoutSilhouetteSVG(targetMuscles)}

      <!-- Список названий мышц -->
      <h2 style="font-family:var(--font-display);font-size:22px;line-height:1.15;margin-bottom:20px;text-align:left;">
        ${muscleTitle}
      </h2>

      <!-- Статы: Калории / Объём / Рекорды -->
      <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin-bottom:20px;">
        <div>
          <div style="color:var(--text-dim);font-size:12px;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Calories</div>
          <div style="display:flex;align-items:baseline;gap:4px;">
            <span style="font-family:var(--font-display);font-size:24px;">${calories}</span>
            <span style="color:var(--text-dim);font-size:12px;">kcal</span>
          </div>
        </div>
        <div>
          <div style="color:var(--text-dim);font-size:12px;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Volume</div>
          <div style="display:flex;align-items:baseline;gap:4px;">
            <span style="font-family:var(--font-display);font-size:24px;">${formatVolume(totalVolume)}</span>
            <span style="color:var(--text-dim);font-size:12px;">kg</span>
          </div>
        </div>
        <div>
          <div style="color:var(--text-dim);font-size:12px;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Records</div>
          <div style="display:flex;align-items:baseline;gap:4px;">
            <span style="font-family:var(--font-display);font-size:24px;color:${prCount > 0 ? 'var(--accent)' : 'var(--text)'};">${prCount}</span>
            <span style="font-size:14px;">${prCount > 0 ? '🏆' : ''}</span>
          </div>
        </div>
      </div>

      <!-- Превью упражнений (YouTube thumbnails) -->
      <div style="display:flex;gap:6px;overflow-x:auto;margin:0 -20px 14px;padding:0 20px 4px;scrollbar-width:none;">
        ${completedExercises.slice(0, 6).map(e => {
          const def = EXERCISES.find(x => x.id === e.exerciseId);
          if (!def) return '';
          const thumb = def.video
            ? `<img src="https://img.youtube.com/vi/${def.video}/mqdefault.jpg"
                    style="width:100%;height:100%;object-fit:cover;"
                    loading="lazy"
                    onerror="this.style.display='none';this.parentElement.style.background='var(--bg-elev-3)';">`
            : '';
          return `
            <div style="position:relative;width:88px;height:120px;flex-shrink:0;background:var(--bg-elev-3);border-radius:8px;overflow:hidden;">
              ${thumb}
              <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.85));padding:14px 6px 4px;">
                <div style="color:white;font-size:9px;font-weight:600;line-height:1.1;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.8);">
                  ${def.name}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Список упражнений (текст) -->
      <div style="color:var(--text-dim);font-size:13px;line-height:1.5;">
        ${completedExercises.map(e => {
          const def = EXERCISES.find(x => x.id === e.exerciseId);
          return def ? def.name : '';
        }).filter(Boolean).join(', ')}
      </div>
    </div>

    ${w.prs && w.prs.length > 0 ? `
      <div style="background:linear-gradient(135deg, var(--accent-glow), transparent);border:1px solid var(--accent);border-radius:14px;padding:14px;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="font-size:20px;">🏆</span>
          <span class="eyebrow" style="color:var(--accent);">${w.prs.length} ${w.prs.length === 1 ? 'record' : 'records'} this day</span>
        </div>
        ${w.prs.map(pr => `
          <div style="font-size:13px;padding:4px 0;">
            <strong>${pr.name}:</strong>
            ${pr.type === 'weight' ? `${pr.newValue}kg × ${pr.reps}` : `${pr.weight}kg × ${pr.newValue}`}
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${w.notes && (w.notes.mood || w.notes.text) ? `
      <div style="background:var(--bg-elev-2);border-radius:12px;padding:14px;margin-bottom:12px;">
        ${w.notes.mood ? `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:${w.notes.text ? '8px' : '0'};">
            <span style="font-size:24px;">${['😩','😕','😐','🙂','💪'][w.notes.mood - 1]}</span>
            <span style="color:var(--text-dim);font-size:13px;">How you felt</span>
          </div>
        ` : ''}
        ${w.notes.text ? `
          <div style="color:var(--text-dim);font-size:14px;line-height:1.4;font-style:italic;">"${w.notes.text}"</div>
        ` : ''}
      </div>
    ` : ''}

    <!-- Детали по подходам (свёрнуто) -->
    <details style="margin-bottom:12px;">
      <summary style="color:var(--text-dim);font-size:13px;cursor:pointer;padding:8px 0;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.1em;">
        ▸ Sets
      </summary>
      <div style="padding-top:8px;">
        ${completedExercises.map(ex => {
          const def = EXERCISES.find(e => e.id === ex.exerciseId);
          const sets = ex.sets.filter(s => s.completed);
          if (!def) return '';
          return `
            <div style="padding:10px 0;border-bottom:1px solid var(--border);">
              <div style="font-weight:600;font-size:14px;margin-bottom:6px;">${def.name}</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                ${sets.map(s => `<span class="pill" style="font-size:12px;">${s.weight}kg × ${s.reps}</span>`).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </details>

    <!-- Кнопки действий -->
    <div style="display:flex;gap:8px;margin-top:16px;">
      <button class="btn btn-secondary" onclick="shareWorkout(${w.date})" style="flex:2;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
        Share
      </button>
      <button class="btn-icon" onclick="deleteWorkout(${w.date})" title="Delete">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
        </svg>
      </button>
      <button class="btn btn-primary" onclick="closeModal()" style="flex:1;">Close</button>
    </div>
  `);
}

// ============== SHARE WORKOUT ==============
// Генерирует красивую картинку-сводку через Canvas и делится через Web Share API
async function shareWorkout(date) {
  const w = STATE.history.find(x => x.date === date);
  if (!w) return;

  toast('Preparing image...');

  try {
    const blob = await renderWorkoutImage(w);

    // Текстовое описание
    const dateStr = new Date(w.date).toLocaleDateString('en-US', {
      day: 'numeric', month: 'long'
    });
    const totalVolume = computeVolume(w);
    const calories = estimateCalories(w);
    const muscles = getWorkedMuscles(w).map(m => MUSCLE_NAMES[m]).join(', ');
    const duration = formatDuration(w.duration);

    const text = `💪 Workout ${dateStr}\n${muscles}\n\n` +
                 `⚡ ${calories} kcal · 📊 ${formatVolume(totalVolume)} kg${duration ? ' · ⏱ ' + duration : ''}` +
                 (w.prs && w.prs.length > 0 ? `\n🏆 ${w.prs.length} new ${w.prs.length === 1 ? 'PR' : 'PRs'}!` : '') +
                 `\n\nvia FORGE`;

    const file = new File([blob], `forge-workout-${dateStr}.png`, { type: 'image/png' });

    // Пробуем нативный шеринг с картинкой (iOS/Android Chrome/Safari)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'My workout',
          text: text
        });
        return;
      } catch(err) {
        if (err.name === 'AbortError') return; // юзер отменил — норм
        console.warn('Share with file failed, fallback:', err);
      }
    }

    // Fallback 1: шеринг только текста (без картинки)
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My workout', text: text });
        return;
      } catch(err) {
        if (err.name === 'AbortError') return;
        console.warn('Share text failed, fallback:', err);
      }
    }

    // Fallback 2: десктоп — скачиваем картинку + копируем текст
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forge-workout-${dateStr}.png`;
    a.click();
    URL.revokeObjectURL(url);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        toast('Image saved, text copied');
      } catch(e) {
        toast('Image saved');
      }
    } else {
      toast('Image saved');
    }
  } catch(err) {
    console.error('shareWorkout failed:', err);
    toast('Could not create image');
  }
}

// Рендерит сводку тренировки в PNG через Canvas
async function renderWorkoutImage(w) {
  const W = 1080, H = 1350; // вертикальный формат для Stories/Slack
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Цвета (повторяют тему приложения)
  const COLORS = {
    bg: '#0a0a0a',
    bgElev: '#141414',
    bgElev2: '#1c1c1c',
    bgElev3: '#242424',
    border: '#262626',
    borderStrong: '#383838',
    text: '#f5f5f5',
    textDim: '#9a9a9a',
    textMuted: '#5a5a5a',
    accent: '#d4ff3a'
  };

  // Фон с градиентом
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, COLORS.bgElev);
  grad.addColorStop(1, COLORS.bg);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Glow в углу
  const glow = ctx.createRadialGradient(W * 0.85, H * 0.1, 0, W * 0.85, H * 0.1, 500);
  glow.addColorStop(0, 'rgba(212, 255, 58, 0.18)');
  glow.addColorStop(1, 'rgba(212, 255, 58, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  const PAD = 60;
  let y = 70;

  // === ШАПКА: лого + дата ===
  // Логотип (ромб)
  ctx.save();
  ctx.translate(PAD + 18, y + 18);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(-18, -18, 36, 36);
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(-12, -12, 24, 24);
  ctx.restore();

  // FORGE текст
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 32px "Archivo Black", system-ui, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('FORGE', PAD + 50, y + 18);

  // Дата справа
  const dateStr = new Date(w.date).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric'
  }).toUpperCase();
  const duration = w.duration ? ' · ' + formatDuration(w.duration).toUpperCase() : '';
  ctx.fillStyle = COLORS.textDim;
  ctx.font = '600 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(dateStr + duration, W - PAD, y + 18);
  ctx.textAlign = 'left';

  y += 90;

  // === АНАТОМИЧЕСКИЙ СИЛУЭТ ===
  const targetMuscles = getWorkedMuscles(w);
  const silhouetteH = 300;
  drawWorkoutSilhouette(ctx, targetMuscles, W / 2, y, silhouetteH, COLORS);
  y += silhouetteH + 40;

  // === ЗАГОЛОВОК (мышцы) ===
  const muscleTitle = targetMuscles.map(m => MUSCLE_NAMES[m]).join(', ');
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 56px "Archivo Black", system-ui, sans-serif';

  // Перенос длинного заголовка
  const lines = wrapText(ctx, muscleTitle, W - PAD * 2);
  lines.slice(0, 2).forEach((line, i) => {
    ctx.fillText(line, PAD, y + i * 64);
  });
  y += lines.slice(0, 2).length * 64 + 20;

  // === СТАТЫ ===
  const calories = estimateCalories(w);
  const totalVolume = computeVolume(w);
  const prCount = (w.prs || []).length;

  const stats = [
    { label: 'CALORIES', value: calories, unit: 'kcal', color: COLORS.text },
    { label: 'VOLUME', value: formatVolume(totalVolume), unit: 'kg', color: COLORS.text },
    { label: 'RECORDS', value: prCount, unit: prCount > 0 ? '🏆' : '', color: prCount > 0 ? COLORS.accent : COLORS.text }
  ];

  y += 30;
  const statW = (W - PAD * 2) / 3;
  stats.forEach((s, i) => {
    const x = PAD + i * statW;
    ctx.fillStyle = COLORS.textMuted;
    ctx.font = '600 18px "JetBrains Mono", monospace';
    ctx.fillText(s.label, x, y);

    ctx.fillStyle = s.color;
    ctx.font = 'bold 64px "Archivo Black", system-ui, sans-serif';
    const valueText = String(s.value);
    ctx.fillText(valueText, x, y + 70);

    if (s.unit) {
      const valueWidth = ctx.measureText(valueText).width;
      ctx.fillStyle = COLORS.textDim;
      ctx.font = '600 22px "Inter Tight", system-ui, sans-serif';
      ctx.fillText(s.unit, x + valueWidth + 8, y + 70);
    }
  });

  y += 120;

  // === ПРЕВЬЮ УПРАЖНЕНИЙ ===
  const completedExercises = w.exercises.filter(e => e.sets.some(s => s.completed));
  const previewCount = Math.min(5, completedExercises.length);
  const previewW = 170;
  const previewH = 230;
  const previewGap = 14;
  const previewsTotal = previewCount * previewW + (previewCount - 1) * previewGap;
  let previewX = (W - previewsTotal) / 2;

  // Рисуем плейсхолдеры сразу, потом загружаем картинки асинхронно
  const previewSlots = [];
  for (let i = 0; i < previewCount; i++) {
    const def = EXERCISES.find(x => x.id === completedExercises[i].exerciseId);
    if (!def) continue;

    const px = previewX + i * (previewW + previewGap);

    // Фон-плейсхолдер
    ctx.fillStyle = COLORS.bgElev3;
    roundRect(ctx, px, y, previewW, previewH, 12);
    ctx.fill();

    previewSlots.push({ def, x: px, y });
  }

  // Загружаем все YouTube thumbnails параллельно
  const imagePromises = previewSlots.map(slot => {
    return new Promise((resolve) => {
      if (!slot.def.video) {
        resolve({ slot, img: null });
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve({ slot, img });
      img.onerror = () => resolve({ slot, img: null });
      img.src = `https://img.youtube.com/vi/${slot.def.video}/mqdefault.jpg`;
    });
  });

  const results = await Promise.all(imagePromises);

  // Рисуем картинки и подписи
  results.forEach(({ slot, img }) => {
    ctx.save();
    // Кадрируем по rounded rect
    roundRect(ctx, slot.x, slot.y, previewW, previewH, 12);
    ctx.clip();

    if (img) {
      // YouTube thumbnail имеет соотношение 320x180 (16:9)
      // Нам нужно вписать в 170x230 (вертикаль) — обрезаем по центру
      const imgRatio = img.width / img.height;
      const slotRatio = previewW / previewH;
      let drawW, drawH, drawX, drawY;
      if (imgRatio > slotRatio) {
        drawH = previewH;
        drawW = drawH * imgRatio;
        drawX = slot.x - (drawW - previewW) / 2;
        drawY = slot.y;
      } else {
        drawW = previewW;
        drawH = drawW / imgRatio;
        drawX = slot.x;
        drawY = slot.y - (drawH - previewH) / 2;
      }
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // Градиент-затемнение снизу для подписи
    const labelGrad = ctx.createLinearGradient(0, slot.y + previewH - 80, 0, slot.y + previewH);
    labelGrad.addColorStop(0, 'rgba(0,0,0,0)');
    labelGrad.addColorStop(1, 'rgba(0,0,0,0.9)');
    ctx.fillStyle = labelGrad;
    ctx.fillRect(slot.x, slot.y + previewH - 80, previewW, 80);

    // Название упражнения
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px "Inter Tight", system-ui, sans-serif';
    ctx.textAlign = 'center';
    const nameLines = wrapText(ctx, slot.def.name, previewW - 16);
    nameLines.slice(0, 2).forEach((line, i) => {
      ctx.fillText(line, slot.x + previewW / 2, slot.y + previewH - 28 + i * 18);
    });
    ctx.textAlign = 'left';

    ctx.restore();
  });

  y += previewH + 30;

  // === СПИСОК НАЗВАНИЙ ===
  ctx.fillStyle = COLORS.textDim;
  ctx.font = '500 22px "Inter Tight", system-ui, sans-serif';
  const exNames = completedExercises.map(e => {
    const def = EXERCISES.find(x => x.id === e.exerciseId);
    return def ? def.name : '';
  }).filter(Boolean).join(', ');

  const exLines = wrapText(ctx, exNames, W - PAD * 2);
  exLines.slice(0, 3).forEach((line, i) => {
    if (i === 2 && exLines.length > 3) {
      // Многоточие
      ctx.fillText(line.replace(/[^,]+$/, '...').trim(), PAD, y + i * 30);
    } else {
      ctx.fillText(line, PAD, y + i * 30);
    }
  });

  y += Math.min(exLines.length, 3) * 30 + 30;

  // === ФУТЕР ===
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('FORGE — 100% FREE FOREVER', W / 2, H - 50);
  ctx.textAlign = 'left';

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95);
  });
}

// Хелпер: rounded rectangle path
// ============== SHARE: ROUTINE (утренняя зарядка) ==============
async function shareRoutine(routineRecord) {
  if (!routineRecord) return;
  toast('Preparing image...');

  try {
    const blob = await renderRoutineImage(routineRecord);

    const program = MORNING_PROGRAM;
    const dateStr = new Date(routineRecord.timestamp).toLocaleDateString('en-US', {
      day: 'numeric', month: 'long'
    });
    const min = Math.round(routineRecord.duration / 60);
    const minDisplay = min < 1 ? '<1' : min;
    const completedCount = getCompletedCount(routineRecord);
    const streakLine = STATE.morningStreak > 1 ? `\n🔥 ${STATE.morningStreak} day streak` : '';

    const text = `🌅 Morning routine ${dateStr}\n${completedCount} ${completedCount === 1 ? 'exercise' : 'exercises'} · ${minDisplay} min${streakLine}\n\nvia FORGE`;
    const file = new File([blob], `forge-routine-${dateStr}.png`, { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'My morning routine', text: text });
        return;
      } catch(err) {
        if (err.name === 'AbortError') return;
        console.warn('Share with file failed, fallback:', err);
      }
    }

    if (navigator.share) {
      try {
        await navigator.share({ title: 'My morning routine', text: text });
        return;
      } catch(err) {
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback десктоп: скачать + скопировать текст
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forge-routine-${dateStr}.png`;
    a.click();
    URL.revokeObjectURL(url);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        toast('Image saved, text copied');
      } catch(e) {
        toast('Image saved');
      }
    } else {
      toast('Image saved');
    }
  } catch(err) {
    console.error('shareRoutine failed:', err);
    toast('Could not create image');
  }
}

// Рендер картинки зарядки (1080×1350) — без силуэта, без YouTube превью
async function renderRoutineImage(record) {
  const program = MORNING_PROGRAM;
  const W = 1080;

  // Берём только сделанные упражнения для отображения
  const completedIds = getCompletedIds(record);
  const isLegacy = !Array.isArray(record.completedExerciseIds);

  // Для legacy записей (v2) показываем все упражнения программы (нет данных о том что сделано)
  const stepsToShow = isLegacy
    ? program.steps
    : program.steps.filter(s => completedIds.includes(s.exerciseId));

  // Считаем нужную высоту динамически
  const HEADER_H = 130;       // лого + дата
  const CENTRAL_H = 310;      // иконка + name + description
  const STATS_H = 165;        // 3 stat-карточки
  const EXERCISES_LABEL_H = 35;
  const EXERCISE_CARD_H = 88;
  const FOOTER_H = 130;       // отступ снизу + надпись (запас 60px после последней карточки)

  const exerciseCount = stepsToShow.length;
  // Минимум одна карточка чтобы canvas не был странно коротким
  const cardsCount = Math.max(exerciseCount, 1);
  const H = HEADER_H + CENTRAL_H + STATS_H + EXERCISES_LABEL_H + cardsCount * EXERCISE_CARD_H + FOOTER_H;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const COLORS = {
    bg: '#0a0a0a',
    bgElev: '#141414',
    bgElev2: '#1c1c1c',
    bgElev3: '#242424',
    border: '#262626',
    borderStrong: '#383838',
    text: '#f5f5f5',
    textDim: '#9a9a9a',
    textMuted: '#5a5a5a',
    accent: '#d4ff3a'
  };

  // Фон с градиентом
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, COLORS.bgElev);
  grad.addColorStop(1, COLORS.bg);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Glow в углу — оранжево-жёлтый (утро)
  const glow = ctx.createRadialGradient(W * 0.85, H * 0.1, 0, W * 0.85, H * 0.1, 500);
  glow.addColorStop(0, 'rgba(255, 200, 50, 0.20)');
  glow.addColorStop(1, 'rgba(255, 200, 50, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  const PAD = 60;
  let y = 70;

  // Логотип FORGE сверху-слева
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(PAD, y, 50, 50);
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(PAD + 18, y + 18, 14, 14);
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText('FORGE', PAD + 70, y + 8);

  // Дата сверху-справа
  const dateStr = new Date(record.timestamp).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }).toUpperCase();
  const min = Math.round(record.duration / 60);
  const minDisplay = min < 1 ? '<1m' : `${min}M`;
  ctx.font = '20px "SF Mono", Menlo, Monaco, monospace';
  ctx.fillStyle = COLORS.textDim;
  ctx.textAlign = 'right';
  ctx.fillText(`${dateStr}  ·  ${minDisplay}`, W - PAD, y + 18);
  ctx.textAlign = 'left';
  y += 130;

  // Большая иконка программы по центру
  ctx.font = '120px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(program.icon, W / 2, y);
  y += 150;

  // Название программы + "MORNING ROUTINE"
  ctx.fillStyle = COLORS.textDim;
  ctx.font = '20px "SF Mono", Menlo, Monaco, monospace';
  ctx.fillText('MORNING ROUTINE', W / 2, y);
  y += 35;

  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 80px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';
  ctx.fillText(program.name.toUpperCase(), W / 2, y);
  y += 100;

  // Description
  ctx.fillStyle = COLORS.textDim;
  ctx.font = '28px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';
  ctx.fillText(program.description, W / 2, y);
  y += 80;

  // Stats row: длительность, упражнений, стрик
  ctx.textAlign = 'left';
  const cardW = (W - PAD * 2 - 30) / (STATE.morningStreak > 0 ? 3 : 2);
  const statsY = y;

  const drawStat = (i, label, value, valueColor) => {
    const x = PAD + (cardW + 15) * i;
    // Карточка
    ctx.fillStyle = COLORS.bgElev2;
    roundRect(ctx, x, statsY, cardW, 130, 16);
    ctx.fill();
    // Border
    ctx.strokeStyle = COLORS.border;
    ctx.lineWidth = 1;
    roundRect(ctx, x, statsY, cardW, 130, 16);
    ctx.stroke();
    // Label
    ctx.fillStyle = COLORS.textMuted;
    ctx.font = '18px "SF Mono", Menlo, Monaco, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(label.toUpperCase(), x + 24, statsY + 22);
    // Value
    ctx.fillStyle = valueColor || COLORS.text;
    ctx.font = 'bold 56px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';
    ctx.fillText(value, x + 24, statsY + 56);
  };

  drawStat(0, 'Duration', minDisplay);
  drawStat(1, 'Exercises', String(getCompletedCount(record)));
  if (STATE.morningStreak > 0) {
    drawStat(2, 'Streak', `🔥${STATE.morningStreak}`, COLORS.accent);
  }

  y = statsY + 165;

  // Список сделанных упражнений
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '20px "SF Mono", Menlo, Monaco, monospace';
  ctx.textAlign = 'left';
  ctx.fillText(isLegacy ? 'EXERCISES' : 'COMPLETED', PAD, y);
  y += 35;

  if (stepsToShow.length === 0) {
    // На случай если запись пустая — рисуем placeholder
    ctx.fillStyle = COLORS.bgElev2;
    roundRect(ctx, PAD, y, W - PAD * 2, 80, 14);
    ctx.fill();
    ctx.fillStyle = COLORS.textDim;
    ctx.font = '24px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('No exercises completed', W / 2, y + 40);
    y += 88;
  } else {
    stepsToShow.forEach((step, i) => {
      const ex = routineStepExercise(step);
      if (!ex) return;

      // Карточка упражнения
      ctx.fillStyle = COLORS.bgElev2;
      roundRect(ctx, PAD, y, W - PAD * 2, 80, 14);
      ctx.fill();

      // Номер
      ctx.fillStyle = COLORS.bgElev3;
      roundRect(ctx, PAD + 16, y + 16, 48, 48, 10);
      ctx.fill();
      ctx.fillStyle = COLORS.accent;
      ctx.font = 'bold 22px "SF Mono", Menlo, Monaco, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), PAD + 40, y + 40);

      // Имя упражнения
      ctx.fillStyle = COLORS.text;
      ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(ex.name, PAD + 80, y + 40);

      // Detail (длительность или повторы) справа
      const detail = step.duration ? `${step.duration}s` : `×${step.reps}`;
      ctx.fillStyle = COLORS.textDim;
      ctx.font = '24px "SF Mono", Menlo, Monaco, monospace';
      ctx.textAlign = 'right';
      ctx.fillText(detail, W - PAD - 24, y + 40);

      y += 88;
    });
  }

  // Footer
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = '20px "SF Mono", Menlo, Monaco, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('FORGE — 100% FREE FOREVER', W / 2, H - 70);

  // Готово — в blob
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png', 0.92));
}


function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Хелпер: перенос текста по ширине
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const test = current ? current + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// Хелпер: рисует упрощённую иконку мышцы на canvas
// Рисует анатомический силуэт человека (спереди + сзади) на Canvas
// muscles — массив id ['chest', 'back', ...]
// cx — центр X, ty — top Y, h — высота фигуры
function drawWorkoutSilhouette(ctx, muscles, cx, ty, h, COLORS) {
  const set = new Set(muscles);
  const c = (m) => set.has(m) ? COLORS.accent : COLORS.bgElev3;

  // ViewBox 100×200, как в SVG
  const figW = h * (100 / 200);
  const gap = 60;
  const totalW = figW * 2 + gap;
  const leftX = cx - totalW / 2;

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = COLORS.borderStrong;

  const drawFigure = (originX, isFront) => {
    const sx = (n) => originX + (n / 100) * figW;
    const sy = (n) => ty + (n / 200) * h;

    const drawShape = (fillColor, pathFn) => {
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      pathFn();
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const drawEllipse = (fillColor, ex, ey, rx, ry) => {
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.ellipse(ex, ey, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    };

    // Голова
    ctx.fillStyle = COLORS.bgElev2;
    ctx.beginPath();
    ctx.arc(sx(50), sy(14), Math.min(figW * 8 / 100, h * 8 / 200), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Шея
    ctx.fillStyle = COLORS.bgElev2;
    ctx.fillRect(sx(46), sy(21), sx(54) - sx(46), sy(26) - sy(21));

    if (isFront) {
      // ВИД СПЕРЕДИ
      // Грудь — ПОД плечами
      drawShape(c('chest'), () => {
        ctx.moveTo(sx(30), sy(30));
        ctx.lineTo(sx(50), sy(30));
        ctx.lineTo(sx(50), sy(58));
        ctx.lineTo(sx(34), sy(62));
        ctx.lineTo(sx(30), sy(56));
      });
      drawShape(c('chest'), () => {
        ctx.moveTo(sx(70), sy(30));
        ctx.lineTo(sx(50), sy(30));
        ctx.lineTo(sx(50), sy(58));
        ctx.lineTo(sx(66), sy(62));
        ctx.lineTo(sx(70), sy(56));
      });

      // Плечи — поверх груди
      drawEllipse(c('shoulders'), sx(20), sy(36), (sx(31) - sx(9)) / 2, (sy(45) - sy(27)) / 2);
      drawEllipse(c('shoulders'), sx(80), sy(36), (sx(91) - sx(69)) / 2, (sy(45) - sy(27)) / 2);

      // Бицепсы
      drawShape(c('biceps'), () => {
        ctx.moveTo(sx(11), sy(44));
        ctx.lineTo(sx(9), sy(78));
        ctx.lineTo(sx(22), sy(80));
        ctx.lineTo(sx(24), sy(46));
      });
      drawShape(c('biceps'), () => {
        ctx.moveTo(sx(89), sy(44));
        ctx.lineTo(sx(91), sy(78));
        ctx.lineTo(sx(78), sy(80));
        ctx.lineTo(sx(76), sy(46));
      });

      // Пресс / кор
      drawShape(c('core'), () => {
        ctx.moveTo(sx(34), sy(62));
        ctx.lineTo(sx(66), sy(62));
        ctx.lineTo(sx(62), sy(96));
        ctx.lineTo(sx(38), sy(96));
      });
      if (set.has('core')) {
        ctx.strokeStyle = 'rgba(0,0,0,0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx(50), sy(64)); ctx.lineTo(sx(50), sy(94));
        ctx.moveTo(sx(40), sy(74)); ctx.lineTo(sx(60), sy(74));
        ctx.moveTo(sx(40), sy(84)); ctx.lineTo(sx(60), sy(84));
        ctx.stroke();
        ctx.strokeStyle = COLORS.borderStrong;
        ctx.lineWidth = 1.5;
      }

      // Бёдра / квадрицепсы
      drawShape(c('legs'), () => {
        ctx.moveTo(sx(38), sy(96));
        ctx.lineTo(sx(34), sy(148));
        ctx.lineTo(sx(46), sy(150));
        ctx.lineTo(sx(50), sy(96));
      });
      drawShape(c('legs'), () => {
        ctx.moveTo(sx(62), sy(96));
        ctx.lineTo(sx(66), sy(148));
        ctx.lineTo(sx(54), sy(150));
        ctx.lineTo(sx(50), sy(96));
      });
    } else {
      // ВИД СЗАДИ
      // СПИНА: 4 зоны V-формы до y=80
      drawShape(c('back'), () => {
        ctx.moveTo(sx(30), sy(30));
        ctx.lineTo(sx(70), sy(30));
        ctx.lineTo(sx(68), sy(44));
        ctx.lineTo(sx(32), sy(44));
      });
      drawShape(c('back'), () => {
        ctx.moveTo(sx(32), sy(44));
        ctx.lineTo(sx(68), sy(44));
        ctx.lineTo(sx(67), sy(60));
        ctx.lineTo(sx(33), sy(60));
      });
      drawShape(c('back'), () => {
        ctx.moveTo(sx(33), sy(60));
        ctx.lineTo(sx(67), sy(60));
        ctx.lineTo(sx(65), sy(80));
        ctx.lineTo(sx(35), sy(80));
      });
      // Ягодицы — занимают зону 80-96
      drawShape(c('legs'), () => {
        ctx.moveTo(sx(35), sy(80));
        ctx.lineTo(sx(65), sy(80));
        ctx.lineTo(sx(62), sy(96));
        ctx.lineTo(sx(38), sy(96));
      });

      // Линия позвоночника + граница низа спины
      ctx.strokeStyle = 'rgba(0,0,0,0.45)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(sx(50), sy(30));
      ctx.lineTo(sx(50), sy(80));
      ctx.stroke();
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(sx(38), sy(80));
      ctx.lineTo(sx(62), sy(80));
      ctx.stroke();
      // Лопатки если активна
      if (set.has('back')) {
        ctx.strokeStyle = 'rgba(0,0,0,0.35)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(sx(40), sy(50));
        ctx.quadraticCurveTo(sx(44), sy(56), sx(48), sy(56));
        ctx.moveTo(sx(60), sy(50));
        ctx.quadraticCurveTo(sx(56), sy(56), sx(52), sy(56));
        ctx.stroke();
      }
      ctx.strokeStyle = COLORS.borderStrong;
      ctx.lineWidth = 1.5;

      // Плечи — поверх спины
      drawEllipse(c('shoulders'), sx(20), sy(36), (sx(31) - sx(9)) / 2, (sy(45) - sy(27)) / 2);
      drawEllipse(c('shoulders'), sx(80), sy(36), (sx(91) - sx(69)) / 2, (sy(45) - sy(27)) / 2);

      // Трицепсы
      drawShape(c('triceps'), () => {
        ctx.moveTo(sx(11), sy(44));
        ctx.lineTo(sx(9), sy(78));
        ctx.lineTo(sx(22), sy(80));
        ctx.lineTo(sx(24), sy(46));
      });
      drawShape(c('triceps'), () => {
        ctx.moveTo(sx(89), sy(44));
        ctx.lineTo(sx(91), sy(78));
        ctx.lineTo(sx(78), sy(80));
        ctx.lineTo(sx(76), sy(46));
      });

      // Бёдра — те же координаты что спереди
      drawShape(c('legs'), () => {
        ctx.moveTo(sx(38), sy(96));
        ctx.lineTo(sx(34), sy(148));
        ctx.lineTo(sx(46), sy(150));
        ctx.lineTo(sx(50), sy(96));
      });
      drawShape(c('legs'), () => {
        ctx.moveTo(sx(62), sy(96));
        ctx.lineTo(sx(66), sy(148));
        ctx.lineTo(sx(54), sy(150));
        ctx.lineTo(sx(50), sy(96));
      });
    }

    // Предплечья (одинаково front/back)
    ctx.fillStyle = COLORS.bgElev2;
    roundRect(ctx, sx(9), sy(80), sx(20) - sx(9), sy(104) - sy(80), 4);
    ctx.fill();
    ctx.stroke();
    roundRect(ctx, sx(80), sy(80), sx(91) - sx(80), sy(104) - sy(80), 4);
    ctx.fill();
    ctx.stroke();

    // Голени (одинаково front/back)
    ctx.fillStyle = COLORS.bgElev2;
    roundRect(ctx, sx(35), sy(150), sx(46) - sx(35), sy(190) - sy(150), 4);
    ctx.fill();
    ctx.stroke();
    roundRect(ctx, sx(54), sy(150), sx(65) - sx(54), sy(190) - sy(150), 4);
    ctx.fill();
    ctx.stroke();
  };

  drawFigure(leftX, true);
  drawFigure(leftX + figW + gap, false);
}

function drawMuscleIcon(ctx, muscle, cx, cy, size, fill, bg) {
  ctx.fillStyle = fill;
  ctx.strokeStyle = bg;
  ctx.lineWidth = 2;
  const s = size;

  switch(muscle) {
    case 'chest':
      // Грудь — два прямоугольника со скругленными углами
      roundRect(ctx, cx - s * 0.7, cy - s * 0.4, s * 0.65, s * 0.7, 6);
      ctx.fill();
      roundRect(ctx, cx + s * 0.05, cy - s * 0.4, s * 0.65, s * 0.7, 6);
      ctx.fill();
      break;
    case 'back':
      // Спина — V-форма
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.7, cy - s * 0.5);
      ctx.lineTo(cx + s * 0.7, cy - s * 0.5);
      ctx.lineTo(cx + s * 0.5, cy + s * 0.6);
      ctx.lineTo(cx - s * 0.5, cy + s * 0.6);
      ctx.closePath();
      ctx.fill();
      break;
    case 'legs':
      // Ноги — две колонны
      roundRect(ctx, cx - s * 0.65, cy - s * 0.6, s * 0.45, s * 1.1, 6);
      ctx.fill();
      roundRect(ctx, cx + s * 0.2, cy - s * 0.6, s * 0.45, s * 1.1, 6);
      ctx.fill();
      break;
    case 'shoulders':
      // Плечи — два круга + перекладина
      ctx.beginPath();
      ctx.arc(cx - s * 0.45, cy - s * 0.1, s * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + s * 0.45, cy - s * 0.1, s * 0.35, 0, Math.PI * 2);
      ctx.fill();
      roundRect(ctx, cx - s * 0.2, cy + s * 0.1, s * 0.4, s * 0.45, 4);
      ctx.fill();
      break;
    case 'biceps':
      // Бицепс — овал
      ctx.beginPath();
      ctx.ellipse(cx, cy - s * 0.1, s * 0.4, s * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = fill;
      ctx.globalAlpha = 0.5;
      roundRect(ctx, cx - s * 0.25, cy + s * 0.3, s * 0.5, s * 0.45, 4);
      ctx.fill();
      ctx.globalAlpha = 1;
      break;
    case 'triceps':
      // Трицепс — большой овал
      ctx.beginPath();
      ctx.ellipse(cx, cy, s * 0.45, s * 0.65, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'core':
      // Пресс — прямоугольник с разделителями
      roundRect(ctx, cx - s * 0.4, cy - s * 0.55, s * 0.8, s * 1.1, 8);
      ctx.fill();
      // Разделители
      ctx.strokeStyle = bg;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy - s * 0.55);
      ctx.lineTo(cx, cy + s * 0.55);
      ctx.moveTo(cx - s * 0.4, cy - s * 0.15);
      ctx.lineTo(cx + s * 0.4, cy - s * 0.15);
      ctx.moveTo(cx - s * 0.4, cy + s * 0.15);
      ctx.lineTo(cx + s * 0.4, cy + s * 0.15);
      ctx.stroke();
      break;
    default:
      ctx.beginPath();
      ctx.arc(cx, cy, s * 0.5, 0, Math.PI * 2);
      ctx.fill();
  }
}

function deleteWorkout(date) {
  if (!confirm('Delete this workout?')) return;
  STATE.history = STATE.history.filter(w => w.date !== date);
  save();
  closeModal();
  renderApp();
  toast('Workout deleted');
}

function deleteWorkout(date) {
  if (!confirm('Delete this workout?')) return;
  STATE.history = STATE.history.filter(w => w.date !== date);
  save();
  closeModal();
  renderApp();
  toast('Workout deleted');
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
    ? new Date(STATE.lastBackup).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'never';

  const daysSince = STATE.lastBackup
    ? Math.round((Date.now() - STATE.lastBackup) / (1000 * 60 * 60 * 24))
    : null;

  const backupStatusColor = !STATE.lastBackup ? 'var(--warning)' :
    daysSince > 30 ? 'var(--warning)' : 'var(--success)';

  const usageText = estimate
    ? `${(estimate.usage / 1024).toFixed(1)} KB of ~${(estimate.quota / 1024 / 1024).toFixed(0)} MB`
    : 'unavailable';

  openModal(`
    <div class="eyebrow">Profile</div>
    <h2 class="modal-title">Settings</h2>

    <label>Goal</label>
    <select onchange="STATE.profile.goal=this.value;save()" style="margin-bottom:16px;">
      <option value="strength" ${STATE.profile.goal === 'strength' ? 'selected' : ''}>Strength</option>
      <option value="muscle" ${STATE.profile.goal === 'muscle' ? 'selected' : ''}>Hypertrophy</option>
      <option value="endurance" ${STATE.profile.goal === 'endurance' ? 'selected' : ''}>Endurance</option>
      <option value="general" ${STATE.profile.goal === 'general' ? 'selected' : ''}>General fitness</option>
    </select>

    <label>Equipment</label>
    <div style="margin-bottom:16px;">
      ${Object.entries(EQUIPMENT_NAMES).map(([id, name]) => `
        <label style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg-elev-2);border-radius:10px;margin-bottom:6px;cursor:pointer;">
          <input type="checkbox" ${STATE.profile.equipment.includes(id) ? 'checked' : ''}
                 onchange="toggleEquipment('${id}')" style="width:auto;"/>
          <span style="display:inline-flex;align-items:center;">${EQUIPMENT_ICONS[id] || ''}</span>
          <span style="text-transform:none;letter-spacing:0;font-size:14px;font-weight:500;color:var(--text);">${name}</span>
        </label>
      `).join('')}
    </div>

    <label>Experience</label>
    <select onchange="STATE.profile.experience=this.value;save()" style="margin-bottom:16px;">
      <option value="beginner" ${STATE.profile.experience === 'beginner' ? 'selected' : ''}>Beginner</option>
      <option value="intermediate" ${STATE.profile.experience === 'intermediate' ? 'selected' : ''}>Intermediate</option>
      <option value="advanced" ${STATE.profile.experience === 'advanced' ? 'selected' : ''}>Advanced</option>
    </select>

    <label>Bodyweight (for calorie estimate)</label>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
      <input type="number" inputmode="numeric" min="30" max="250"
             value="${STATE.profile.bodyweight || ''}"
             placeholder="not set"
             oninput="STATE.profile.bodyweight = this.value ? parseFloat(this.value) : null; save();"
             style="flex:1;text-align:left;font-size:16px;font-family:var(--font-body);font-weight:500;">
      <span style="font-family:var(--font-mono);color:var(--text-dim);font-size:14px;">kg</span>
    </div>

    <!-- ===== БЛОК ХРАНЕНИЯ ДАННЫХ ===== -->
    <div style="border-top:1px solid var(--border);padding-top:16px;margin-bottom:16px;">
      <div class="eyebrow" style="margin-bottom:12px;">💾 Data storage</div>

      <!-- Persistent storage статус -->
      <div style="background:var(--bg-elev-2);border-radius:12px;padding:14px;margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="font-size:13px;font-weight:600;">Auto-delete protection</div>
          <span style="font-family:var(--font-mono);font-size:11px;color:${isPersisted ? 'var(--success)' : 'var(--warning)'};">
            ${isPersisted ? '✓ ENABLED' : '⚠ OFF'}
          </span>
        </div>
        <p style="color:var(--text-dim);font-size:12px;line-height:1.4;margin-bottom:${isPersisted ? '0' : '10px'};">
          ${isPersisted
            ? 'Browser will not auto-delete your data. Can only be removed manually in site settings.'
            : 'Browser may delete data when storage is low. Enable protection to avoid this.'}
        </p>
        ${!isPersisted ? `
          <button class="btn btn-secondary btn-sm" onclick="enablePersistentStorage()" style="width:100%;">
            Enable protection
          </button>
        ` : ''}
      </div>

      <!-- Бэкапы -->
      <div style="background:var(--bg-elev-2);border-radius:12px;padding:14px;margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="font-size:13px;font-weight:600;">Last backup</div>
          <span style="font-family:var(--font-mono);font-size:11px;color:${backupStatusColor};">
            ${lastBackupText}${daysSince !== null && daysSince > 0 ? ` (${daysSince}d)` : ''}
          </span>
        </div>
        <p style="color:var(--text-dim);font-size:12px;line-height:1.4;margin-bottom:10px;">
          Data size: ${usageText}
        </p>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-secondary btn-sm" onclick="exportData()" style="flex:1;">
            ⬇ Backup
          </button>
          <button class="btn btn-secondary btn-sm" onclick="importData()" style="flex:1;">
            ⬆ Restore
          </button>
        </div>
      </div>
    </div>

    <button class="btn btn-ghost btn-block" onclick="resetAll()" style="color:var(--danger);margin-bottom:8px;">Reset everything</button>
    <button class="btn btn-primary btn-block" onclick="closeModal()">Done</button>

    <div style="text-align:center;margin-top:16px;font-family:var(--font-mono);font-size:10px;color:var(--text-muted);letter-spacing:0.1em;">
      FORGE · BUILD <span id="settings-version">loading...</span>
    </div>
  `);

  // Запрашиваем версию у Service Worker
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    const channel = new MessageChannel();
    channel.port1.onmessage = (event) => {
      const versionEl = document.getElementById('settings-version');
      if (versionEl && event.data && event.data.version) {
        versionEl.textContent = event.data.version;
      }
    };
    try {
      navigator.serviceWorker.controller.postMessage({ type: 'GET_VERSION' }, [channel.port2]);
    } catch(e) {
      const versionEl = document.getElementById('settings-version');
      if (versionEl) versionEl.textContent = 'unknown';
    }
  } else {
    const versionEl = document.getElementById('settings-version');
    if (versionEl) versionEl.textContent = 'no-sw';
  }
}

async function enablePersistentStorage() {
  const granted = await requestPersistentStorage();
  if (granted) {
    toast('✓ Protection enabled');
  } else {
    toast('Browser did not grant protection. Make backups regularly.');
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
    <h2 class="modal-title">Muscle recovery</h2>
    <p style="color:var(--text-dim);line-height:1.5;margin-bottom:16px;">
      Shows which muscle groups are ready for training and which need rest.
      Based on your workouts in the last 72 hours.
    </p>
    <p style="color:var(--text-dim);line-height:1.5;margin-bottom:16px;">
      Brighter red means more rest needed. Today's workout auto-targets the freshest groups.
    </p>
    <button class="btn btn-primary btn-block" onclick="closeModal()">Got it</button>
  `);
}

function exportData() {
  const data = JSON.stringify({
    profile: STATE.profile,
    history: STATE.history,
    routines: STATE.routines || [],
    morningStreak: STATE.morningStreak || 0,
    morningLastDate: STATE.morningLastDate || null,
    exportedAt: new Date().toISOString(),
    version: 3
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
  toast('✓ Backup saved');
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
          toast('File does not look like a FORGE backup');
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
        toast('Failed to read the file');
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
    ? new Date(data.exportedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'unknown';

  openModal(`
    <div class="eyebrow">Import data</div>
    <h2 class="modal-title">What to do?</h2>

    <div style="background:var(--bg-elev-2);border-radius:12px;padding:14px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;">
        <span style="color:var(--text-dim);">In file:</span>
        <span style="font-family:var(--font-mono);font-weight:700;">${importedWorkouts} workouts from ${importedDate}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:13px;">
        <span style="color:var(--text-dim);">Current:</span>
        <span style="font-family:var(--font-mono);font-weight:700;">${currentWorkouts} workouts</span>
      </div>
    </div>

    <button class="option-btn" onclick="applyImport(${JSON.stringify(data).replace(/"/g, '&quot;')}, 'merge')">
      <span class="option-icon">🔀</span>
      <span style="flex:1;">
        <strong>Merge</strong>
        <span class="option-desc">Keep both current and backup (by date)</span>
      </span>
    </button>

    <button class="option-btn" onclick="applyImport(${JSON.stringify(data).replace(/"/g, '&quot;')}, 'replace')">
      <span class="option-icon">⚠️</span>
      <span style="flex:1;">
        <strong style="color:var(--danger);">Replace</strong>
        <span class="option-desc">Erase current data and restore from backup</span>
      </span>
    </button>

    <button class="btn btn-ghost btn-block" style="margin-top:12px;" onclick="closeModal()">Cancel</button>
  `);
}

function applyImport(data, mode) {
  if (mode === 'replace') {
    if (STATE.history.length > 0 && !confirm('Erase all current data?')) {
      closeModal();
      return;
    }
    STATE.profile = data.profile || STATE.profile;
    STATE.history = data.history || [];
    // morning data — поддержка backup v2 (если есть)
    STATE.routines = data.routines || [];
    STATE.morningStreak = data.morningStreak || 0;
    STATE.morningLastDate = data.morningLastDate || null;
  } else if (mode === 'merge') {
    // Объединяем по дате — уникальность по timestamp
    const existing = new Set(STATE.history.map(w => w.date));
    const newWorkouts = (data.history || []).filter(w => !existing.has(w.date));
    STATE.history = [...STATE.history, ...newWorkouts].sort((a, b) => a.date - b.date);
    if (!STATE.profile && data.profile) {
      STATE.profile = data.profile;
    }
    // morning data merge — по timestamp
    if (data.routines && data.routines.length > 0) {
      const existingRoutines = new Set((STATE.routines || []).map(r => r.timestamp));
      const newRoutines = data.routines.filter(r => !existingRoutines.has(r.timestamp));
      STATE.routines = [...(STATE.routines || []), ...newRoutines].sort((a, b) => a.timestamp - b.timestamp);
    }
    // streak восстанавливаем максимальным
    if ((data.morningStreak || 0) > (STATE.morningStreak || 0)) {
      STATE.morningStreak = data.morningStreak;
      STATE.morningLastDate = data.morningLastDate;
    }
  }

  save();
  closeModal();
  STATE.view = 'home';
  renderApp();

  const count = (data.history || []).length;
  toast(mode === 'merge'
    ? `✓ Imported (merged)`
    : `✓ Imported: ${count} workouts`);
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
      <div class="eyebrow">Protect your progress</div>
    </div>
    <h2 class="modal-title" style="text-align:center;">Save a backup</h2>
    <p style="color:var(--text-dim);font-size:14px;line-height:1.5;text-align:center;margin-bottom:20px;">
      ${isFirst
        ? `You have ${STATE.history.length} ${STATE.history.length === 1 ? 'workout' : 'workouts'} saved. Save a backup so you don\'t lose progress when the browser cache is cleared.`
        : `${days} ${days === 1 ? 'day' : 'days'} since your last backup. Time for a fresh copy.`}
    </p>

    <button class="btn btn-primary btn-block btn-lg" onclick="exportData();closeModal();(${onContinue ? onContinue.toString() : 'function(){}'})()">
      Save backup
    </button>
    <button class="btn btn-ghost btn-block" style="margin-top:8px;" onclick="snoozeBackup();closeModal();(${onContinue ? onContinue.toString() : 'function(){}'})()">
      Remind me later
    </button>
  `);
}

function snoozeBackup() {
  // Сбрасываем счётчик чтобы не доставать сразу — напомним через ещё 5 трен
  STATE.workoutsSinceBackup = Math.max(0, STATE.workoutsSinceBackup - 5);
  save();
}

function resetAll() {
  if (!confirm('Delete ALL data? This cannot be undone.')) return;
  if (!confirm('Are you sure?')) return;
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
  // Только силовые — не предлагаем мобилити как замену в силовой тренировке
  const alternatives = EXERCISES.filter(ex =>
    ex.category !== 'mobility' &&
    ex.muscle === currentDef.muscle &&
    ex.id !== current.exerciseId &&
    !usedIds.includes(ex.id) &&
    exerciseAvailable(ex, equipment)
  );

  if (alternatives.length === 0) {
    toast('No alternatives for this muscle group');
    return;
  }

  openModal(`
    <div class="eyebrow">Replace exercise</div>
    <h2 class="modal-title">${currentDef.name} →</h2>
    <p style="color:var(--text-dim);font-size:13px;margin-bottom:16px;">
      Alternatives for ${MUSCLE_NAMES[currentDef.muscle]}
    </p>
    <div style="max-height:50vh;overflow-y:auto;">
      ${alternatives.map(alt => `
        <div class="exercise-item" onclick="confirmSwap(${idx}, '${alt.id}')">
          <div class="exercise-icon">${alt.name[0]}</div>
          <div class="exercise-info">
            <div class="exercise-name">${alt.name}</div>
            <div class="exercise-meta">
              ${alt.compound ? '<span>compound</span>' : '<span>isolation</span>'}
              ${alt.equipment.length === 0 ? '<span>• no equipment</span>' :
                '<span>• ' + alt.equipment.map(e => EQUIPMENT_NAMES[e]).join(', ') + '</span>'}
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted);">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </div>
      `).join('')}
    </div>
    <button class="btn btn-ghost btn-block" style="margin-top:12px;" onclick="closeModal()">Cancel</button>
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
  toast('Exercise replaced');
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
      <div class="eyebrow" style="color:var(--accent);">New record!</div>
      <h2 class="modal-title" style="margin-top:8px;">
        ${prs.length === 1 ? 'Personal record' : prs.length + ' personal records'}
      </h2>
    </div>
    <div style="margin:16px 0;">
      ${prs.map(pr => `
        <div style="background:linear-gradient(135deg, var(--accent-glow), transparent);border:1px solid var(--accent);border-radius:14px;padding:16px;margin-bottom:10px;">
          <div style="font-weight:700;font-size:16px;margin-bottom:6px;">${pr.name}</div>
          ${pr.type === 'weight' ? `
            <div style="display:flex;align-items:center;gap:10px;font-family:var(--font-mono);">
              <span style="color:var(--text-muted);text-decoration:line-through;">${pr.oldValue || '—'}kg</span>
              <span style="color:var(--text-dim);">→</span>
              <span style="color:var(--accent);font-weight:700;font-size:20px;">${pr.newValue}kg</span>
              <span style="color:var(--text-dim);font-size:13px;">× ${pr.reps}</span>
            </div>
          ` : `
            <div style="display:flex;align-items:center;gap:10px;font-family:var(--font-mono);">
              <span style="color:var(--accent);font-weight:700;font-size:20px;">${pr.weight}kg × ${pr.newValue}</span>
              <span style="color:var(--text-dim);font-size:13px;">(was × ${pr.oldValue})</span>
            </div>
          `}
        </div>
      `).join('')}
    </div>
    <button class="btn btn-primary btn-block btn-lg" onclick="closeModal();(${onClose ? onClose.toString() : 'function(){}'})()">
      Awesome!
    </button>
  `);
}

// ============== WORKOUT NOTES ==============
function showWorkoutNotes(workout, onSave) {
  workout.notes = workout.notes || { mood: 0, text: '' };

  openModal(`
    <div class="eyebrow">Workout complete</div>
    <h2 class="modal-title">How did it go?</h2>

    <label>How you felt</label>
    <div style="display:flex;gap:8px;margin-bottom:20px;">
      ${[1,2,3,4,5].map(n => `
        <button class="mood-btn" data-mood="${n}"
                onclick="setMood(${n})"
                style="flex:1;padding:14px 0;background:var(--bg-elev-2);border:2px solid ${workout.notes.mood === n ? 'var(--accent)' : 'var(--border)'};border-radius:12px;font-size:24px;cursor:pointer;transition:all 0.15s;">
          ${['😩','😕','😐','🙂','💪'][n-1]}
        </button>
      `).join('')}
    </div>

    <label>Notes (optional)</label>
    <textarea id="notes-text" rows="3" placeholder="How did you feel, what did you notice..."
              style="resize:vertical;min-height:80px;font-family:var(--font-body);"
              oninput="if(STATE.currentWorkout)STATE.currentWorkout.notes.text=this.value">${workout.notes.text || ''}</textarea>

    <div style="margin-top:20px;display:flex;gap:8px;">
      <button class="btn btn-ghost" style="flex:1;" onclick="closeModal();(${onSave.toString()})()">
        Skip
      </button>
      <button class="btn btn-primary" style="flex:2;" onclick="saveNotesAndContinue(${onSave.toString().replace(/\n/g, ' ')})">
        Save
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
  // Скрываем нав на экранах: workout (силовая), routine-player (зарядка)
  showNav(STATE.view !== 'workout' && STATE.view !== 'routine-player');

  switch (STATE.view) {
    case 'home': renderHome(); break;
    case 'workout': renderWorkout(); break;
    case 'exercises': renderExerciseLibrary(); break;
    case 'morning': renderMorningHome(); break;
    case 'routine-preview': renderRoutinePreview(); break;
    case 'routine-player': renderRoutinePlayer(); break;
    case 'stats': renderStats(); break;
    default: renderHome();
  }

  // Обновляем активную вкладку: показываем Morning активным и для подэкранов routine-*
  const activeTab = (STATE.view === 'routine-preview' || STATE.view === 'routine-player')
    ? 'morning' : STATE.view;
  $$('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === activeTab);
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