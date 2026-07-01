export enum ActivityTypeEnum {
  DRAG_AND_DROP_IMAGE = 1, // Arrastrar palabras a imágenes         ← fase 1
  DRAG_AND_DROP_TEXT = 2, // Arrastrar traducción a texto kana     ← fase 1
  WORD_SELECTION = 3, // Seleccionar palabras de una categoría ← fase 1
  MULTIPLE_CHOICE = 4, // Selección múltiple por pregunta       ← fase 2
  TRUE_FALSE = 5, // Verdadero/Falso                       (futuro)
  FILL_IN_THE_BLANK = 6, // Completar oraciones con blancos       ← fase 2
  WORD_ORDER = 7, // Ordenar palabras arrastrando chips     ← fase 2
  MATCH_COLUMNS = 8, // Emparejar columnas                    (futuro)
  LISTEN_AND_SELECT = 9, // Escuchar audio y revelar transcripción← fase 2
  FREE_WRITING = 10, // Escuchar y transcribir (texto libre)  ← fase 2
}
