import { ActivityTypeEnum } from '../enums/activity-type.enum';

// ── Fase 1: Implementados ──────────────────────────────────────────────────────

/**
 * DRAG_AND_DROP_IMAGE (type = 1)
 * Grid de imágenes + palabras/etiquetas arrastrables.
 * Cada ActivityOption tiene: text (etiqueta), image (URL), groupKey (clave de emparejamiento).
 * Validación: chip.groupKey === dropZone.groupKey
 */
export interface DragDropImageConfig {
  type: ActivityTypeEnum.DRAG_AND_DROP_IMAGE;
  /** Número de columnas del grid de imágenes (ej: 2 para 2×2) */
  columns: number;
  /** Mostrar label vacío debajo de cada imagen antes de soltar */
  showLabelsBelow: boolean;
}

/**
 * DRAG_AND_DROP_TEXT (type = 2)
 * Muestra una palabra/chip en el medio y dos posibles destinos de traducción (arriba y abajo).
 * El usuario debe deslizar la palabra del medio hacia el destino correcto (arriba o abajo).
 *
 * Layout de pantalla:
 *   ┌──────────────────────┐  ← target superior: drop_zone (ej: "ノリタ", groupKey: "g1")
 *   │       ノリタ          │
 *   └──────────────────────┘
 *              ▲
 *   ┌──────────────────────┐  ← chip en el medio: chip (ej: "Lleno", groupKey: "g1")
 *   │       Lleno          │
 *   └──────────────────────┘
 *              ▼
 *   ┌──────────────────────┐  ← target inferior: drop_zone (ej: "タリリ", groupKey: "g2")
 *   │       タリリ          │
 *   └──────────────────────┘
 *
 * Cada ActivityOption tiene:
 *   - role: "drop_zone" → los dos destinos (el de menor order arriba, el de mayor order abajo)
 *   - role: "chip"      → la(s) palabra(s) en el medio que se deben arrastrar
 *   - groupKey          → conecta el chip con el drop_zone correcto
 *
 * Validación: chip.groupKey === drop_zone.groupKey
 */
export interface DragDropTextConfig {
  type: ActivityTypeEnum.DRAG_AND_DROP_TEXT;
  /** Mostrar kana en los destinos */
  showKana: boolean;
  /** Mostrar kanji en los destinos */
  showKanji: boolean;
  /** Mostrar romaji en los destinos */
  showRomaji: boolean;
  /** Mostrar botón de audio en los destinos */
  showAudio: boolean;
}

/**
 * WORD_SELECTION (type = 3)
 * Un término/categoría + grid de chips de palabras para seleccionar.
 * Cada ActivityOption tiene: text, kana, isCorrect (true si pertenece a la categoría).
 * Validación: comparar opciones seleccionadas vs isCorrect
 */
export interface WordSelectionConfig {
  type: ActivityTypeEnum.WORD_SELECTION;
  /** Término o categoría mostrado arriba (ej: "Animales") */
  categoryTerm: string;
  /** Número de columnas del grid de chips (ej: 3) */
  columns: number;
  /** Mínimo de correctas para aprobar (0 = todas deben estar correctas) */
  minCorrectToPass: number;
}

// ── Fase 2: Implementados ──────────────────────────────────────────────────────

/**
 * MULTIPLE_CHOICE (type = 4)
 * Lista de preguntas/oraciones, cada una con varias opciones de respuesta.
 *
 * Estructura de ActivityOption:
 *   - text      → texto de la opción (ej: respuesta en japonés)
 *   - kana      → lectura kana de la opción (opcional)
 *   - romaji    → lectura romaji (opcional)
 *   - isCorrect → true si es la respuesta correcta de su pregunta
 *   - groupKey  → identifica a qué pregunta pertenece esta opción
 *                 (ej: "q1" para todas las opciones de la pregunta 1)
 *
 * Ejemplo de options para 2 preguntas con 4 opciones c/u:
 *   [
 *     { groupKey: "q1", text: "ノリタ", isCorrect: false },
 *     { groupKey: "q1", text: "ノリタ", isCorrect: true  },  ← correcta
 *     { groupKey: "q1", text: "ノリタ", isCorrect: false },
 *     { groupKey: "q1", text: "ノリタ", isCorrect: false },
 *     { groupKey: "q2", text: "ノリタ", isCorrect: true  },  ← correcta
 *     ...
 *   ]
 *
 * Validación: para cada groupKey, la opción seleccionada debe tener isCorrect = true
 */
export interface MultipleChoiceConfig {
  type: ActivityTypeEnum.MULTIPLE_CHOICE;
  /**
   * Lista de preguntas/oraciones en el idioma fuente.
   * El índice coincide con el groupKey "q0", "q1", "q2"...
   * O bien usa el campo groupKey directamente.
   */
  questions: {
    /** ID único de la pregunta (coincide con groupKey de las opciones) */
    id: string;
    /** Texto de la pregunta/oración (idioma fuente, ej: español) */
    text: string;
    /** Traducción esperada (mostrada como referencia, ej: en japonés) */
    translation?: string;
    /** URL del audio de la pregunta (opcional) */
    audio?: string;
  }[];
  /** Mezclar el orden de las opciones al mostrar */
  shuffleOptions: boolean;
  /** Número de opciones por pregunta */
  optionsPerQuestion: number;
}

/**
 * FILL_IN_THE_BLANK (type = 6)
 * Lista de oraciones con uno o más blancos a completar.
 * El usuario arrastra o selecciona chips para llenar los huecos.
 *
 * Estructura de ActivityOption:
 *   - text      → texto del chip (respuesta posible)
 *   - kana      → lectura kana
 *   - romaji    → lectura romaji
 *   - isCorrect → true si este chip es respuesta correcta de su blanco
 *   - groupKey  → identifica a qué blanco pertenece (ej: "s1b1" = oración 1, blanco 1)
 *
 * Validación: chip seleccionado para groupKey debe tener isCorrect = true
 */
export interface FillInTheBlankConfig {
  type: ActivityTypeEnum.FILL_IN_THE_BLANK;
  /**
   * Lista de oraciones con template donde "___" marca el blanco.
   * Ejemplo: "Ella ama la música y siempre está ___ nuevas canciones"
   */
  sentences: {
    /** ID único de la oración */
    id: string;
    /** Texto completo con "___" indicando el/los blancos */
    template: string;
    /** Traducción de referencia de la oración completa */
    translation?: string;
    /** URL del audio de la oración (opcional) */
    audio?: string;
  }[];
  /** Mostrar el banco de chips disponibles */
  showWordBank: boolean;
  /** Permitir alternar entre Kanji y Romaji */
  showKanjiToggle: boolean;
}

/**
 * WORD_ORDER (type = 7)
 * El usuario ordena chips para formar una oración correcta.
 * Tiene zona de drop (arriba) y banco de chips (abajo, en orden aleatorio).
 *
 * Estructura de ActivityOption:
 *   - text            → texto del chip (palabra en idioma destino)
 *   - kana            → lectura kana
 *   - romaji          → lectura romaji
 *   - correctPosition → posición correcta del chip en la oración (1-based)
 *                       (campo extra en ActivityOption)
 *
 * Validación: la secuencia de chips colocados coincide con correctPosition ordenado
 */
export interface WordOrderConfig {
  type: ActivityTypeEnum.WORD_ORDER;
  /**
   * Oración fuente a traducir (idioma del usuario, ej: español).
   * Se muestra en la parte superior como referencia.
   */
  sourceText: string;
  /** Idioma fuente ("es" | "en" | etc.) */
  sourceLang: string;
  /** Oración completa correcta en idioma destino (para validación interna) */
  correctSentence: string;
  /** Idioma destino ("ja" | "zh" | etc.) */
  targetLang: string;
  /** Permitir alternar entre Kanji/Kana y Romaji */
  showKanjiToggle: boolean;
  /** Mezclar los chips al mostrarlos */
  shuffleChips: boolean;
}

/**
 * LISTEN_AND_SELECT (type = 9)
 * El usuario escucha un audio y ve la transcripción revelar progresivamente.
 * Puede haber palabras/frases para identificar o simplemente escuchar.
 *
 * Estructura de ActivityOption (opcional, para selección de palabras):
 *   - text      → palabra o frase a identificar
 *   - kana      → lectura kana
 *   - isCorrect → true si es una palabra que aparece en el audio
 *   - groupKey  → categoría o momento del audio al que pertenece
 *
 * Nota: si no hay options, es solo "escuchar y ver la transcripción".
 */
export interface ListenAndSelectConfig {
  type: ActivityTypeEnum.LISTEN_AND_SELECT;
  /** URL del archivo de audio principal */
  audioUrl: string;
  /** Reproducir automáticamente al iniciar la actividad */
  autoPlay: boolean;
  /** Número máximo de veces que el usuario puede repetir el audio (0 = ilimitado) */
  maxReplays: number;
  /** Mostrar la transcripción completa al terminar el audio */
  showTranscript: boolean;
  /** Texto completo del audio (transcripción) */
  transcript: string;
  /** Traducción de la transcripción (opcional) */
  transcriptTranslation?: string;
  /**
   * Palabras clave del audio con su explicación, mostradas en la sección
   * "Explicación" al validar (ej: [{word: "ノリタ", meaning: "Cuando era joven"}])
   */
  explanations?: { word: string; meaning: string; audio?: string }[];
}

/**
 * FREE_WRITING (type = 10)
 * El usuario escucha un audio y escribe la transcripción manualmente.
 * Al validar se muestra si es correcto y se revela la explicación.
 *
 * No usa ActivityOption (la respuesta es texto libre comparado contra correctAnswers).
 *
 * Validación: normalize(input) ∈ correctAnswers.map(normalize)
 */
export interface FreeWritingConfig {
  type: ActivityTypeEnum.FREE_WRITING;
  /** URL del audio que el usuario debe transcribir */
  audioUrl: string;
  /** Reproducir automáticamente al iniciar */
  autoPlay: boolean;
  /** Número máximo de repeticiones del audio (0 = ilimitado) */
  maxReplays: number;
  /** Respuestas aceptadas como correctas (normalizadas sin tildes/mayúsculas) */
  correctAnswers: string[];
  /** Tipo de input esperado */
  inputType: 'text' | 'kana' | 'romaji';
  /** Longitud máxima del campo de texto */
  maxLength: number;
  /** Texto de placeholder en el campo de respuesta */
  placeholder?: string;
  /** Distinguir mayúsculas/minúsculas */
  caseSensitive: boolean;
  /**
   * Explicación detallada revelada al validar.
   * Cada ítem: {label: "1.", text: "ノリタノリタ (sonido) - Cuando era joven"}
   */
  explanations?: { label: string; text: string }[];
}

// ── Futuro ─────────────────────────────────────────────────────────────────────

export interface TrueFalseConfig {
  type: ActivityTypeEnum.TRUE_FALSE;
  statement: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface MatchColumnsConfig {
  type: ActivityTypeEnum.MATCH_COLUMNS;
  leftColumnTitle: string;
  rightColumnTitle: string;
  shuffleRight: boolean;
}

// ── Tipo unión ─────────────────────────────────────────────────────────────────

export type ActivityConfig =
  | DragDropImageConfig
  | DragDropTextConfig
  | WordSelectionConfig
  | MultipleChoiceConfig
  | TrueFalseConfig
  | FillInTheBlankConfig
  | WordOrderConfig
  | MatchColumnsConfig
  | ListenAndSelectConfig
  | FreeWritingConfig;
