import { MigrationInterface, QueryRunner } from 'typeorm';
const lessonsContent = [
  {
    id: 1,
    lessonNumber: '1.',
    lessonName: 'Un nuevo horizonte',
    lessonContent: 'Introducción al japonés',
    listDialog: [
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_3',
        focused: true,
        content: {
          paragraph: '¡Hola, mucho gusto!',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Soy Aiko, y es un verdadero placer acompañarte en este emocionante viaje para el aprendizaje del japonés.',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_5',
        focused: false,
        content: {
          paragraph:
            'Como alguien que ha crecido y viajado en Japón, estoy ansiosa de compartir contigo todo sobre nuestra rica y única cultura.',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_6',
        focused: false,
        content: {
          paragraph: 'Así que, ¿qué dices? ¿Te animas a emprender este viaje conmigo?',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 2,
        audio: 'leccion_1_parte_7',
        focused: false,
        content: {
          paragraph:
            'Te prometo que este viaje será tan emocionante como esa primera vez que pruebas una variedad de sushi completamente nueva.',
          image: 'leccion_1_image_1',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_8',
        focused: false,
        content: {
          paragraph: 'Y para tu sorpresa, ¡Te encanta!',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 3,
        audio: 'leccion_1_parte_9',
        focused: false,
        content: {
          paragraph:
            '¿Sabías que hay más de 125 millones de personas que hablan japonés en todo el mundo? Situándolo entre los 13 idiomas más hablados globalmente',
          lottie: 'multilingual_world',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_10',
        focused: false,
        content: {
          paragraph:
            'Este hecho no solo refleja nuestra rica historia y herencia, sino también la influencia de Japón en áreas como la tecnología, el arte y la cultura.',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_11',
        focused: false,
        content: {
          paragraph: 'Siendo nuestro idioma parte esencial de esta herencia fascinante.',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_12',
        focused: false,
        content: {
          paragraph: 'Hablando de idiomas, sabes que es lo más intrigante del japonés. ¡Su origen!',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_13',
        focused: false,
        content: {
          paragraph:
            'Y aunque se le relaciona con el grupo de lenguas altaicas, compartiendo ciertos lazos con idiomas como el "Coreano" y el "Mongol", el Japonés presenta características únicas que lo distinguen claramente de cualquier otra lengua.',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 2,
        audio: 'leccion_1_parte_14',
        focused: false,
        content: {
          paragraph:
            'A lo largo de los siglos, el Japonés ha absorbido influencias de numerosos idiomas extranjeros, incluyendo el "Chino", "Portugués", "Ruso" e "Inglés", enriqueciéndose y evolucionando constantemente.',
          image: 'leccion_1_image_2',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_15',
        focused: false,
        content: {
          paragraph:
            'Pero, quizás lo más fascinante de todo lo que mencione anteriormente sea nuestro sistema de escritura, que combina tres tipos diferentes de caracteres: "Hiragana", "Katakana" y "Kanji".',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_16',
        focused: false,
        content: {
          paragraph:
            'Siendo el Hiragana y Katakana silabarios que representan los sonidos básicos del idioma, mientras que el Kanji son caracteres complejos que tienen múltiples significados y lecturas.',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 4,
        audio: 'leccion_1_parte_17',
        focused: false,
        content: {
          paragraph:
            'Estos tres sistemas de escritura trabajan juntos para crear un paisaje visual único y lleno de matices.',
          gif: 'leccion_1_gif_1',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_18',
        focused: true,
        content: {
          paragraph: 'Dicho todo esto, seré sincera contigo.',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_19',
        focused: false,
        content: {
          paragraph:
            'Aprender japonés, no solo es adquirir habilidades lingüísticas, como reglas gramaticales y vocabulario. Es sumergirse en un mundo de historias, mitos y leyendas que han inspirado a generaciones.',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 2,
        audio: 'leccion_1_parte_20',
        focused: false,
        content: {
          paragraph:
            'Desde las tradicionales ceremonias del té, hasta el manga y anime moderno, hay un sinfín de elementos que despertarán tu curiosidad.',
          image: 'leccion_1_image_3',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_21',
        focused: false,
        content: {
          paragraph:
            'Créeme que será una experiencia increíble y gratificante. Cada palabra y expresión que aprendas será un paso más hacia la comprensión de un mundo lleno de belleza y sabiduría.',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_22',
        focused: false,
        content: {
          paragraph: '¡Así que, bienvenido al fascinante viaje de aprender japonés!',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_23',
        focused: false,
        content: {
          paragraph:
            'Prepárate para reír, llorar, sorprenderte, disfrutar y quizás hasta frustrarte un poco (es parte del viaje) pero, sobre todo, prepárate para aprender muchísimo.',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_parte_24',
        focused: false,
        content: {
          paragraph: 'Antes de irme, hay una última cosa que me gustaría decirte...',
        },
      },
      {
        lottieAnimation: 'aiko_moving',
        storyStructure: 1,
        typeStructure: 3,
        audio: 'leccion_1_parte_25',
        focused: true,
        content: {
          paragraph: 'Bienvenido a Norita',
          lottie: 'splash_white',
        },
      },
    ],
    notes: null,
    glossary: null,
    bibliography: null,
  },
  {
    id: 2,
    lessonNumber: '1.1',
    lessonName: 'Una lengua con tres sabores',
    lessonContent: 'Tipos de escritura',
    listDialog: [
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Dime ¿Te ha pasado que pruebas un plato donde se mezclan sabores "dulces", "salados" y "picantes"?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 4,
        audio: 'leccion_1_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Donde cada bocado es una explosión de sensaciones...',
          gif: 'leccion_1_1_gif_1',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 4,
        audio: 'leccion_1_1_parte_5',
        focused: false,
        content: {
          paragraph: 'Una mezcla de combinaciones infinitas...',
          gif: 'leccion_1_1_gif_2',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 4,
        audio: 'leccion_1_1_parte_6',
        focused: false,
        content: {
          paragraph: 'Sabores que nadie más ha probado ¡Algo nuevo por descubrir!',
          gif: 'leccion_1_1_gif_3',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_7',
        focused: false,
        content: {
          paragraph: 'Ajam... Perdón, me deje llevar.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_8',
        focused: false,
        content: {
          paragraph: '"ども!" Soy yo, Aiko. Tu compañera en esta aventura.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_9',
        focused: false,
        content: {
          paragraph:
            '¿Sabías que el japonés, al igual que ese plato de sabores variados, tiene tres ingredientes principales: "平仮名", "片仮名" y "漢字"?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_10',
        focused: false,
        content: {
          paragraph:
            'Y aunque en un inicio todo pueda sentirse como un torbellino de sabores, con cada bocado –o, en este caso, con cada palabra aprendida– irás descubriendo cómo los distintos componentes aportan su toque único, creando una combinación verbal tan rica como deliciosa.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 2,
        audio: 'leccion_1_1_parte_11',
        focused: true,
        content: {
          paragraph:
            'Ahora bien, como sucede con cualquier receta, para disfrutarla plenamente necesitamos conocer sus ingredientes. ¿Qué hace especial a cada uno? ¿Cuáles son sus secretos? Y, sobre todo, ¿cómo llegaron a formar parte de este platillo lingüístico?',
          image: 'leccion_1_1_image_1',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_12',
        focused: false,
        content: {
          paragraph:
            'Hmmm... quizás responder estas preguntas no parezca tan interesante al principio. Pero, si lo piensas, a veces mirar al pasado nos ayuda a comprender mejor el presente.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_13',
        focused: false,
        content: {
          paragraph:
            '¿Tiene sentido? Puede que sí, o puede que no. Depende de cómo lo mires, pero creo que vale la pena intentarlo. ¿Por qué no seguimos y lo averiguamos juntos?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_14',
        focused: false,
        content: {
          paragraph:
            'La historia del idioma japonés es relativamente más corta que la de otras lenguas. Su historia se remonta a finales del siglo IV, cuando, con el establecimiento de rutas comerciales con China — ya fuera a través de Corea o de manera directa—, comenzaron a adoptarse elementos de su sistema de escritura.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_15',
        focused: false,
        content: {
          paragraph:
            'Este intercambio marcó el comienzo de un proceso de evolución lingüística tan fascinante como complejo.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 2,
        audio: 'leccion_1_1_parte_16',
        focused: true,
        content: {
          paragraph:
            'No obstante, como ocurre con todo cambio, las primeras etapas no estuvieron exentas de desafíos: integrar estos caracteres en la escritura japonesa presentó dificultades significativas. Entre los principales problemas se encontraban:',
          image: 'leccion_1_1_image_2',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 6,
        audio: 'leccion_1_1_parte_17',
        focused: false,
        content: {
          subtopicPoint:
            'Determinar la pronunciación de un carácter chino en japonés con solo verlo.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 6,
        audio: 'leccion_1_1_parte_18',
        focused: false,
        content: {
          subtopicPoint:
            'Representar partículas y flexiones gramaticales de verbos y adjetivos, ya que el chino no utiliza estas estructuras.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_19',
        focused: false,
        content: {
          paragraph:
            'Para abordar estas dificultades, se intentó emplear un método llamado "Okototen", diseñado para adaptar los textos chinos al japonés.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_20',
        focused: false,
        content: {
          paragraph:
            "Este sistema usaba símbolos diacríticos colocados en torno a los caracteres importados dentro de un 'recuadro invisible' para representar elementos gramaticales del japonés que no tenían equivalente en el idioma.",
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_21',
        focused: false,
        content: {
          paragraph: '¿Qué tal un ejemplo?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 2,
        audio: 'leccion_1_1_parte_22',
        focused: true,
        content: {
          paragraph: 'Imaginemos una oración sencilla que contenga las palabras "人" y "寺".',
          image: 'leccion_1_1_image_4',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_23',
        focused: false,
        content: {
          paragraph:
            'Hmmm… ¿Qué opinas de "La persona va al templo"? Sí, ¡esa es perfecta! En japonés moderno, esta oración se escribiría como "人は寺に行く".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_24',
        focused: false,
        content: {
          paragraph:
            'Sin embargo, con el método Okototen no se añadían directamente partículas como "は" o "に" ni la conjugación del verbo "行く".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_25',
        focused: false,
        content: {
          paragraph:
            'En su lugar, se empleaban los símbolos diacríticos colocados alrededor de los caracteres para reflejar las funciones gramaticales del japonés, respetando la estructura del texto original en chino.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_26',
        focused: false,
        content: {
          paragraph:
            'El resultado para "人" se veía algo así. Y bueno, ya te puedes imaginar el otro caso. (Ojo, esto es solo una aproximación visual de cómo podría haber sido):',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 2,
        audio: 'leccion_1_1_parte_27',
        focused: true,
        content: {
          paragraph:
            'Arriba del carácter: podría indicar el sujeto o partícula del tema. A la derecha: se anotaba la conjugación o el verbo auxiliar. Abajo: se escribían partículas de dirección, como に. A la izquierda: podían colocarse notas adicionales sobre la gramática.',
          image: 'leccion_1_1_image_3',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_28',
        focused: false,
        content: {
          paragraph:
            'Aunque ingenioso, este sistema resultaba demasiado complejo y difícil de usar, lo que llevó a su rápido abandono. Además, no resolvía uno de los principales problemas: la falta de una guía clara para la pronunciación de estos caracteres.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_30',
        focused: false,
        content: {
          paragraph: '¿Recuerdas que te mencioné lo fascinante que es la historia del japonés?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_31',
        focused: false,
        content: {
          paragraph: 'Bueno. Aquí las cosas empiezan a calentarse.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_32',
        focused: false,
        content: {
          paragraph:
            'La primera innovación significativa del idioma japonés fue el "万葉仮名", el cual era un sistema de escritura creado para superar los desafíos que ya te he contado.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 4,
        audio: 'leccion_1_1_parte_33',
        focused: false,
        content: {
          paragraph: 'Un nombre bastante ¡Elegante…! ¿No crees?',
          gif: 'leccion_1_1_gif_4',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_34',
        focused: false,
        content: {
          paragraph:
            'Este sistema se centró en los sonidos, más no en el significado. Puesto que utilizaba caracteres chinos para representar sonidos japoneses, y lo curioso es que no había reglas fijas.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_35',
        focused: false,
        content: {
          paragraph:
            'Un mismo sonido podía representarse con cualquier "漢字". Imagínate, ¡qué libertad!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_36',
        focused: false,
        content: {
          paragraph:
            'A principios del siglo X, el "万葉仮名" evolucionó. Los caracteres empezaron a escribirse en cursiva, lo que eventualmente llevó al nacimiento del "平仮名" y el "片仮名".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_37',
        focused: false,
        content: {
          paragraph: 'Pero espera...',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_38',
        focused: false,
        content: {
          paragraph:
            'Aquí surge una pregunta: si ya se tenía estos dos nuevos sistemas, ¿por qué seguir usando el "漢字"?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 4,
        audio: 'leccion_1_1_parte_39',
        focused: false,
        content: {
          paragraph: 'Esa, amigo mío, es una excelente pregunta.',
          gif: 'leccion_1_1_gif_5',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_40',
        focused: false,
        content: {
          paragraph:
            'El "漢字" tenía un aire de prestigio, permitía expresar ideas de manera concisa y estaba asociado a la nobleza. Por estas razones, se continuó utilizando junto con el chino como el idioma oficial.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 4,
        audio: 'leccion_1_1_parte_41',
        focused: false,
        content: {
          paragraph:
            'Ya podrás imaginarte esa época como una gran fiesta de sistemas de escritura, cada uno aportando algo especial.',
          gif: 'leccion_1_1_gif_6',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_42',
        focused: false,
        content: {
          paragraph: 'O tal vez no...',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_43',
        focused: false,
        content: {
          paragraph:
            'Luego, en 1543, los primeros barcos portugueses llegaron a Japón, introduciendo un nuevo invitado a esta fiesta: El "ローマ字".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_44',
        focused: false,
        content: {
          paragraph:
            'Este conjunto de estilos de escritura cambió radicalmente en 1868 durante la Restauración Meiji. La escritura japonesa era una barrera invisible que separaba a la nobleza de los demás, y se dieron cuenta de que necesitaban un sistema común que unificara a todos.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_45',
        focused: false,
        content: {
          paragraph:
            'En ese punto, incluso los japoneses encontraban su propio sistema de escritura casi incomprensible.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_46',
        focused: false,
        content: {
          paragraph:
            'Durante esta era de cambio, surgieron diferentes corrientes promoviendo métodos de escritura variados.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_47',
        focused: false,
        content: {
          paragraph:
            'Algunos querían eliminar el "漢字" a favor del "平仮名" y el "片仮名", otros preferían el "ローマ字", y hubo quienes sugirieron adoptar el inglés o el francés como idioma oficial.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 4,
        audio: 'leccion_1_1_parte_48',
        focused: false,
        content: {
          paragraph:
            'No, me preguntes quien propuso eso, pero ciertamente no sabía ni que hacía ahí.',
          gif: 'leccion_1_1_gif_7',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_49',
        focused: false,
        content: {
          paragraph:
            'Finalmente, hacia 1900, la prensa, los escritores, la educación y el gobierno desempeñaron un papel crucial en establecer el sistema de escritura que conocemos hoy.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_50',
        focused: false,
        content: {
          paragraph:
            'Se definió un sistema de "仮名" definitivo, donde cada carácter "仮名" corresponde a una única sílaba. Algunos caracteres del silabario "平仮名", conocidos como "変体仮名", fueron eliminados y ahora se usan principalmente para dar un estilo arcaico (antiguo) a la escritura.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_51',
        focused: false,
        content: {
          paragraph:
            'Y así es como esta maravillosa mezcla de sistemas de escritura ha dado forma a la complejidad y belleza del japonés moderno.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 4,
        audio: 'leccion_1_1_parte_53',
        focused: false,
        content: {
          paragraph: 'Ahora, te preguntarás, ¿cómo encaja todo esto en la actualidad?',
          gif: 'leccion_1_1_gif_8',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_54',
        focused: false,
        content: {
          paragraph:
            'En un principio hablábamos de un platillo que combina "dulce", "salado" y "picante" a la vez; bueno, imagina que cada sistema de escritura es un ingrediente diferente en un rollo de sushi.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_55',
        focused: false,
        content: {
          paragraph:
            'El "平仮名" es como el arroz, la base de nuestro delicioso sushi de escritura. Representa los sonidos básicos del idioma y se utiliza para escribir palabras nativas, partículas gramaticales y verbos.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_56',
        focused: false,
        content: {
          paragraph: 'Es esencial y sencillo, pero sin él, no podríamos formar nuestro sushi.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 2,
        audio: 'leccion_1_1_parte_57',
        focused: true,
        content: {
          paragraph: 'Sería solo pescado con unos acompañantes.',
          image: 'leccion_1_1_image_5',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_58',
        focused: false,
        content: {
          paragraph:
            'El "片仮名", por otro lado, es como el sabroso pescado que le da personalidad a nuestro sushi. Aunque comparte los mismos sonidos que el "平仮名", se usa principalmente para palabras extranjeras y onomatopeyas.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_59',
        focused: false,
        content: {
          paragraph: 'Aporta ese toque exótico y novedoso a nuestro platillo.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_60',
        focused: false,
        content: {
          paragraph:
            'Y finalmente, tenemos el "漢字". Estos son como los aderezos y condimentos que complementan nuestro sushi. Pueden parecer un poco intimidantes al principio, pero ¡no dejes que eso te detenga!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_61',
        focused: false,
        content: {
          paragraph:
            'El "漢字" aporta ese toque distintivo y sofisticado al japonés, te sorprenderás al descubrir que juntos crean una experiencia de sabor única e ¡Inolvidable!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 2,
        audio: 'leccion_1_1_parte_62',
        focused: true,
        content: {
          paragraph:
            'Entonces... ¿Estás listo para embarcarse en este increíble viaje para aprender japonés?',
          image: 'leccion_1_1_image_6',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_63',
        focused: false,
        content: {
          paragraph:
            'No les voy a mentir, no será pan comido, y es posible que algunos mue... tiren la toalla en el camino.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_64',
        focused: false,
        content: {
          paragraph:
            'Pero tu prometo que haré que cada lección sea lo más emocionante y divertidamente posible. Así que...',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_65',
        focused: false,
        content: {
          paragraph: 'Toma aire, relájate, afila tu cerebro y disfruta del proceso.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_1_1_parte_66',
        focused: true,
        content: {
          paragraph: '¡Que seguimos sumergiéndonos juntos en el maravilloso mundo del japonés!',
        },
      },
    ],
    notes: null,
    glossary: [
      {
        id: 1,
        kanji: '平仮名',
        kana: 'ひらがな',
        romaji: 'hiragana',
        description:
          'Silabario principalmente utilizado para escritura y lectura de palabras japonesas.',
        audio: 'leccion_1_1_glosario_1',
      },
      {
        id: 2,
        kanji: '片仮名',
        kana: 'かたかな',
        romaji: 'katakana',
        description:
          'Silabario utilizado para la escritura y lectura de palabras de origen extranjero o resaltar palabras japonesas en el texto. También se usa para la escritura de nombres.',
        audio: 'leccion_1_1_glosario_2',
      },
      {
        id: 3,
        kanji: '漢字',
        kana: 'かんじ',
        romaji: 'kanji',
        description:
          'El primer carácter hace referencia a China y el segundo a letra por lo que "kanji" significa: Letra de origen Chino.',
        audio: 'leccion_1_1_glosario_3',
      },
      {
        id: 4,
        kanji: '万葉仮名',
        kana: 'まんようがな',
        romaji: "man'yôgana",
        description:
          'El nombre "manyōgana" deriva del Manyōshū, una antología de poesía japonesa del período Nara.',
        audio: 'leccion_1_1_glosario_4',
      },
      {
        id: 5,
        kanji: '変体仮名',
        kana: 'へんたいがな',
        romaji: 'hentaigana',
        description:
          'Variantes de los caracteres hiragana. Originalmente, el hiragana tenía varias formas para un solo sonido, pero desde 1900, las formas no utilizadas en la educación escolar se llaman "hentaigana".',
        audio: 'leccion_1_1_glosario_5',
      },
      {
        id: 6,
        kanji: 'どうも',
        kana: 'どうも',
        romaji: 'dōmo',
        description:
          'Expresión versátil que puede significar "gracias", "hola" o "disculpa" según el contexto. Se usa con frecuencia como forma breve de «gracias» o como parte de expresiones más largas y formales, por ejemplo, 「どうもありがとうございます」(dōmo arigatō gozaimasu, «muchas gracias»). En la conversación diaria, también puede emplearse como un saludo rápido o señal de cortesía.',
        audio: 'leccion_1_1_glosario_5',
      },
    ],
    bibliography: [
      {
        id: 1,
        content: 'Kindaichi, H. (1900) The Japanese Language. Tuttle.',
        audio: 'leccion_1_1_bibliografia_1',
      },
      {
        id: 2,
        content:
          'Loveday, L. (1996) Language contact in Japan: a sociolinguistic history. Oxford Studies in Language Contact.',
        audio: 'leccion_1_1_bibliografia_2',
      },
      {
        id: 3,
        content:
          'Twine, N. (1991) Language and Modern State: the Reform of Written Japanese. Routledge Japanese Studies.',
        audio: 'leccion_1_1_bibliografia_3',
      },
      {
        id: 4,
        content: 'Bauzá, María.  (2017) La escritura japonesa: un recorrido histórico.',
        audio: 'leccion_1_1_bibliografia_4',
      },
    ],
  },
  {
    id: 3,
    lessonNumber: '2.',
    lessonName: 'La delicada base de nuestro sushi lingüístico',
    lessonContent: 'Hiragana',
    listDialog: [
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_parte_3',
        focused: false,
        content: {
          paragraph: '¡Hola, campeón! ¿Listo para profundizar aún más en este viaje lingüístico?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_parte_4',
        focused: false,
        content: {
          paragraph:
            'En lecciones pasadas te hablé sobre los tres sistemas de escritura en japonés, ¿no? Pues bien, hoy le toca brillar al "平仮名".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_parte_5',
        focused: false,
        content: {
          paragraph:
            'Este silabario es el abecedario de los pequeñines japoneses en la etapa preescolar, mucho antes de saltar al "片仮名" o al "漢字". Y para nosotros, los aprendices, se convierte en nuestra base y punto de partida.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_parte_6',
        focused: false,
        content: {
          paragraph:
            'Puede que al principio dominarlo se sienta como un reto gigantesco; créeme, no tienes de qué preocuparte.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 2,
        audio: 'leccion_2_parte_7',
        focused: true,
        content: {
          paragraph:
            'Es como preparar tu propio sushi: estás frente al desafío de cocinar el arroz, proceso que requiere toda tu atención y paciencia. Un momento de distracción podría convertirlo en un pegote quemado que ni el gato querría probar, lo cual podría desanimarte.',
          image: 'leccion_2_image_1',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_parte_8',
        focused: false,
        content: {
          paragraph:
            'Pero si le dedicas el tiempo necesario y evitas apresurarte, lograrás la base perfecta para tu obra maestra culinaria. Entonces, sentirás la emoción de seguir adelante.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_parte_9',
        focused: false,
        content: {
          paragraph:
            '¡Así que, no permitas que se queme tu arroz y sumerjámonos en la delicada base de nuestro sushi lingüístico!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_11',
        focused: false,
        content: {
          paragraph:
            'El "平仮名" tiene sus orígenes en el "万葉仮名", un sistema que, básicamente, tomaba caracteres chinos para expresar sonidos japoneses de forma fonética.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_12',
        focused: false,
        content: {
          paragraph:
            'Con el tiempo, estos caracteres se fueron simplificando y terminaron convirtiéndose en una forma de escritura única, perfecta para que los hablantes nativos del japonés pudieran leer y escribir con mayor facilidad.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_13',
        focused: false,
        content: {
          paragraph:
            'Ahora bien, no creas que esto sucedió de la noche a la mañana ni que fue un simple capricho del destino. En realidad, fue el resultado de un largo proceso de adaptación que respondió a una demanda específica dentro de la sociedad japonesa de aquel entonces.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_14',
        focused: false,
        content: {
          paragraph:
            'Durante la era Heian, un período que abarcó desde el año 794 hasta el 1185, este método de escritura comenzó a florecer entre un círculo muy especial: las mujeres de la familia imperial y la alta nobleza.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_15',
        focused: false,
        content: {
          paragraph:
            'En una época donde las barreras culturales les impedían acceder a una educación superior, se convirtió en su voz y en su manera de dejar huella.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 2,
        audio: 'leccion_2_parte_16',
        focused: true,
        content: {
          paragraph:
            'Fue así como estas mujeres, centrales en la vida cultural y social del palacio, encontraron en él un medio para expresar sus pensamientos y emociones, ya fuera en forma de poemas delicados, diarios o cartas íntimas.',
          image: 'leccion_2_image_2',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_17',
        focused: false,
        content: {
          paragraph:
            '¡Pero su influencia no se detuvo ahí! Este cambio marcó el surgimiento del sistema que hoy conocemos en la actualidad, abriendo puertas a estas mujeres cultas y de gran influencia para utilizarlo no solo en sus escritos personales, sino también como herramienta para impartir conocimiento sobre las artes de la escritura japonesa.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_18',
        focused: false,
        content: {
          paragraph:
            'Durante estos años, la literatura japonesa experimentó un notable avance, convirtiéndose en un pilar esencial de su histórica riqueza cultural.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_19',
        focused: false,
        content: {
          paragraph:
            'Y es que, gracias a ellas, algunas de las primeras páginas de libros en el país fueron escritas, mostrando al mundo su extraordinaria creatividad y determinación.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_20',
        focused: false,
        content: {
          paragraph:
            'Imagina la fuerza y la pasión necesarias para, en medio de restricciones, encontrar una manera de expresarse y, a su vez, contribuir a la formación de una identidad cultural tan poderosa.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_21',
        focused: false,
        content: {
          paragraph:
            'Es así, como el "平仮名" surge como un sistema silábico ante la necesidad de expresión rápida y eficiente, algo parecido a nuestra letra cursiva, que adoptamos para escribir con mayor velocidad.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_22',
        focused: false,
        content: {
          paragraph:
            'Hoy en día, está compuesto por símbolos que representan sílabas construidas a partir de sonidos vocálicos y consonánticos',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_23',
        focused: false,
        content: {
          paragraph: 'Existiendo cinco dedicados a las vocales puras (a, i, u, e, o)',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 2,
        audio: 'leccion_2_parte_24',
        focused: false,
        content: {
          paragraph:
            'Mientras que los restantes representan sílabas que combinan una consonante con una vocal.',
          image: 'leccion_2_image_3',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_25',
        focused: false,
        content: {
          paragraph:
            'Generalmente de los grupos "k", "s", "t", "n", "h", "m", "y", "r", "w", incluido el carácter especial "ん", que no va acompañado de ningún sonido de vocal y curiosamente nunca aparece solo.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_26',
        focused: false,
        content: {
          paragraph:
            'A diferencia del "漢字", el "平仮名" no tiene un significado específico; en cambio, representa sonidos que corresponden a los del idioma.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_27',
        focused: false,
        content: {
          paragraph:
            'Funciona de manera similar a nuestras letras. Donde en la mayoría de los casos, cada sílaba es pronunciada con una duración igual.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_28',
        focused: false,
        content: {
          paragraph:
            'De ese modo, logra darse ese toque distintivo a cada palabra al momento de hablar y que permiten crear un ritmo suave e incluso melódico.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_29',
        focused: false,
        content: {
          paragraph:
            'Cabe subrayar que, debido al reducido número de combinaciones posibles entre vocales y consonantes en la lengua nipona, muchas palabras tienen significados homófonos, lo que puede generar confusión.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_30',
        focused: false,
        content: {
          paragraph:
            'Por esta razón, aunque todo el idioma japonés puede escribirse por fonética mediante este silabario, la escritura japonesa mantiene el "漢字" como núcleo. Y utiliza los kana, especialmente el hiragana, para complementar los conceptos representados por ellos, agregando información adicional que enriquece tanto la expresión oral como la escrita.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_parte_31',
        focused: false,
        content: {
          paragraph: 'Entre sus usos están:',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 6,
        audio: 'leccion_2_parte_32',
        focused: false,
        content: {
          subtopicPoint:
            'Escribir una palabra cuando se desconoce el "漢字" correspondiente o cuando este resulta demasiado complicado.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 6,
        audio: 'leccion_2_parte_33',
        focused: false,
        content: {
          subtopicPoint:
            'Acompañar y complementar el "漢字", permitiendo identificar si una palabra es un verbo, adjetivo o sustantivo, y definir el tiempo de los verbos.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 6,
        audio: 'leccion_2_parte_34',
        focused: false,
        content: {
          subtopicPoint:
            'Partículas gramaticales, las cuales indican como suenan, como se forman y como pueden combinarse las palabras para formar enunciados que tengan sentido.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 6,
        audio: 'leccion_2_parte_35',
        focused: false,
        content: {
          subtopicPoint: 'Prefijos y sufijos.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 6,
        audio: 'leccion_2_parte_36',
        focused: false,
        content: {
          subtopicPoint: 'Ayuda a pronunciar correctamente los "漢字".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 2,
        audio: 'leccion_2_parte_38',
        focused: false,
        content: {
          paragraph: 'Si todo esto te resulta confuso, ¡no te preocupes!',
          image: 'leccion_2_image_4',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_parte_39',
        focused: false,
        content: {
          paragraph:
            'Veras que con el tiempo y dedicación cocinar arroz se convertirá en una segunda naturaleza para ti.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_parte_40',
        focused: false,
        content: {
          paragraph:
            'Y aquí viene un consejo útil: explora la sección correspondiente en el apartado de "Vocabulario de la aplicación".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_parte_41',
        focused: false,
        content: {
          paragraph:
            'Allí encontrarás recursos que te ayudarán a comprender y memorizar mejor estos caracteres.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_parte_42',
        focused: false,
        content: {
          paragraph:
            'Además, no dudes en revisar otras secciones que para eso fueron diseñadas (y además costo desarrollarla).',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_parte_43',
        focused: false,
        content: {
          paragraph: 'Estruja la aplicación lo más que puedas y ¡No pares de aprender!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_parte_44',
        focused: false,
        content: {
          paragraph: '"じゃね"',
        },
      },
    ],
    notes: [
      {
        id: 1,
        content:
          'La habilidad de escribir hiragana en Japón sigue siendo fundamental, incluso en esta era en la que pasamos tanto tiempo tecleando en nuestras pantallas. Escribir a mano también refuerza la lectura, así que no hay razón para dudar. Los niños japoneses aprenden mediante ejercicios de repetición, y aunque muchos aprendices usan aplicaciones u otras herramientas digitales para aprender los kanas, no hay mejor manera de que esta lección se quede grabada en tu memoria si te sientas y los escribes a mano.',
        audio: 'leccion_2_notas_1',
      },
      {
        id: 2,
        content:
          'Vale la pena mencionar que la apariencia adecuada de los trazos depende a veces del orden correcto; escribirlos de manera incorrecta puede causar problemas de reconocimiento cuando lo hacemos con el dedo o con un stylus en un teléfono o una tableta.',
        audio: 'leccion_2_notas_2',
      },
      {
        id: 3,
        content:
          'Los "先生" de las escuelas primaria suelen ser estrictos con los niños para que hagan trazos perfectos y los escriban en el orden correcto. Nuestra recomendación respecto al orden de los trazos (también para el katakana y el "漢字") es que es preferible intentar aprenderlo correctamente desde el inicio.',
        audio: 'leccion_2_notas_3',
      },
      {
        id: 4,
        content:
          'Algunos elementos tienen una apariencia diferente en su forma impresa a cuando se escriben a mano. Aunque los trazos de "き" y "さ" aparecen unidos en su forma impresa, suele haber un espacio entre la línea casi vertical y las horizontales inferiores cuando se escriben a mano.',
        audio: 'leccion_2_notas_4',
      },
    ],
    glossary: [
      {
        id: 1,
        kanji: '先生',
        kana: 'せんせい',
        romaji: 'Sensei',
        description:
          'Término japonés que significa "maestro" o "profesor". Se usa para referirse a personas con conocimientos o habilidades destacadas en un campo, como docentes, médicos o artistas, siempre con respeto y admiración.',
        audio: 'leccion_2_bibliografia_1',
      },
      {
        id: 2,
        kanji: 'じゃね',
        kana: 'じゃね',
        romaji: 'Ja ne',
        description:
          'Expresión coloquial en japonés para decir «¡Hasta luego!» o «¡Nos vemos!». Se utiliza entre amigos o personas cercanas. A veces se escribe como じゃあね, y puede verse junto con expresiones similares como またね (mata ne) para despedirse de forma más amigable.',
        audio: 'leccion_2_bibliografia_2',
      },
    ],
    bibliography: null,
  },
  {
    id: 4,
    lessonNumber: '2.1',
    lessonName: 'Un sabor que resalta',
    lessonContent: 'Hiragana Dakuon y Handakuon',
    listDialog: [
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            '"やっほー !" Aquí Aiko de nuevo, tu guía en esta emocionante aventura para dominar japonés.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 2,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'En nuestra última lección, nos sumergimos en la base de nuestro sushi lingüístico: el "平仮名", o como me gusta llamarlo, "El Arroz". Esos 46 caracteres básicos que forman la base de todo.',
          image: 'leccion_2_1_image_1',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_5',
        focused: false,
        content: {
          paragraph:
            'Pero ¿Alguna vez te has preguntado cómo podríamos hacer que nuestro "arroz" destaque aún más? Bueno, ha llegado el momento de añadir vinagre de arroz.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_6',
        focused: false,
        content: {
          paragraph: 'Espera ¿Qué?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_7',
        focused: false,
        content: {
          paragraph:
            'Sí, lo sé, lo sé. Puede sonar extraño añadir vinagre al arroz, al arroz. Pero créeme es un componente crucial que le da su sabor característico, textura pegajosa y ese toque ligeramente ácido.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_8',
        focused: false,
        content: {
          paragraph:
            'De la misma manera, en japonés, tenemos un ingrediente especial que hace que nuestras palabras destaquen y tengan más sabor. Así que, ¿Estás listo para descubrirlo?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_10',
        focused: false,
        content: {
          paragraph:
            'El "濁音" y el "半濁音". Son estas marcas especiales que enriquecen la paleta de sonidos, agregando profundidad y matices a nuestras palabras japonesas.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_11',
        focused: false,
        content: {
          paragraph:
            'Al agregar esta marca "゛" a ciertos caracteres, transformamos su pronunciación en un sonido suave.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_12',
        focused: false,
        content: {
          paragraph:
            'Estas dos líneas inclinadas en la esquina superior derecha se llaman "だくてん" o "てんてん", y se aplican a las consonantes "k", "s", "t" y "h".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_13',
        focused: false,
        content: {
          paragraph: 'Esto resulta en los siguientes cambios de sonido:',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 2,
        audio: 'leccion_2_1_parte_14',
        focused: true,
        content: {
          paragraph:
            'El grupo de la "K" pasa a sonar como "G" y obtenemos los sonidos "ga", "gi", "gu", "ge", "go".',
          image: 'leccion_2_1_image_2',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 2,
        audio: 'leccion_2_1_parte_15',
        focused: true,
        content: {
          paragraph:
            'Al transformar el sonido de "S" a "Z", se producen los sonidos "za", "ji", "zu", "ze", "zo".',
          image: 'leccion_2_1_image_3',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 2,
        audio: 'leccion_2_1_parte_16',
        focused: true,
        content: {
          paragraph:
            'Al cambiar la consonante "T" a un sonido parecido a "D", se generan los sonidos "da", "di", "du", "de", "do".',
          image: 'leccion_2_1_image_4',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 2,
        audio: 'leccion_2_1_parte_17',
        focused: true,
        content: {
          paragraph:
            'Y finalmente, la consonante "H" cambia a un sonido similar al de "B", dando como resultado "ba", "bi", "bu", "be", "bo".',
          image: 'leccion_2_1_image_5',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_18',
        focused: false,
        content: {
          paragraph:
            'Algo muy importante a mencionar es que la pronunciación de "じ" y "ず" es prácticamente igual a la de los kanas "ぢ" y "づ", pero se usan en diferentes contextos gramaticales.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_19',
        focused: false,
        content: {
          paragraph: 'Por otra parte, tenemos un elemento llamado "半濁音". ¿Y qué es eso?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_20',
        focused: false,
        content: {
          paragraph:
            'Bueno, es un pequeño círculo, conocido como "はんだくてん" o simplemente "まる", que tiene la función de suavizar la pronunciación de ciertos caracteres.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_21',
        focused: false,
        content: {
          paragraph:
            'Algo importante es que este componente solo se aplica a las consonantes que empiezan con "h".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 2,
        audio: 'leccion_2_1_parte_22',
        focused: true,
        content: {
          paragraph:
            'Este sonido es similar a la "p" en español, produciendo las siguientes pronunciaciones: "pa", "pi", "pu", "pe", "po".',
          image: 'leccion_2_1_image_6',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_24',
        focused: false,
        content: {
          paragraph:
            'Como puedes ver, el "濁音" y el "半濁音" son como ese vinagre de arroz en nuestro sushi lingüístico. Le dan un sabor único que hace que el japonés sea aún más delicioso.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_25',
        focused: false,
        content: {
          paragraph:
            'Al dominar estos sonidos, no solo estarás aprendiendo nuevos caracteres, sino que estarás añadiendo profundidad y matices a tu japonés. Es como si estuvieras añadiendo capas de sabor a nuestro arroz.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_26',
        focused: false,
        content: {
          paragraph:
            'Así que, no olvides practicar la pronunciación y repasar lo que hemos aprendido en las lecciones pasadas.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_27',
        focused: false,
        content: {
          paragraph:
            'Cada paso que das te acerca más a una comprensión más profunda y rica del idioma.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_28',
        focused: false,
        content: {
          paragraph:
            '¡Sigue adelante! Y recuerda, el aprendizaje del japonés es como un festín lleno de sabores variados. Así que, ¡disfrútalo!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_29',
        focused: false,
        content: {
          paragraph: '¡Nos vemos en la próxima lección!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_30',
        focused: false,
        content: {
          paragraph: 'またね',
        },
      },
    ],
    notes: null,
    glossary: [
      {
        id: 1,
        kanji: 'やっほー',
        kana: 'やっほー',
        romaji: 'ya-ho',
        description:
          'Saludo informal utilizado para llamar la atención o saludar a alguien de manera amigable y alegre, especialmente entre amigos cercanos o personas jóvenes. Es equivalente a decir "¡Hola!" o "¡Hey!" en un tono casual y efusivo. Se emplea comúnmente en situaciones relajadas y en relaciones de confianza. Puede ser usado tanto al inicio de una conversación como para captar la atención de alguien en un ambiente distendido.',
        audio: 'leccion_2_1_bibliografia_1',
      },
      {
        id: 2,
        kanji: 'またね',
        kana: 'またね',
        romaji: 'mata ne',
        description:
          'Expresión informal que significa "¡Hasta luego!" o "¡Nos vemos!". Se utiliza al despedirse de alguien de manera casual, con la expectativa de volver a encontrarse en el futuro cercano. Es una forma cariñosa y relajada de despedirse, común entre amigos, familiares o personas cercanas.',
        audio: 'leccion_2_1_bibliografia_2',
      },
    ],
    bibliography: null,
  },
  {
    id: 5,
    lessonNumber: '2.2',
    lessonName: 'El toque especial del arroz',
    lessonContent: 'Hiragana yōon',
    listDialog: [
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: '¡Hola, hola! "また会えたね" ¿Listo para seguir adentrándonos en este mundo?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'La última vez, añadimos un elemento para que nuestra base de sushi resaltara aún más. Aunque... en la metáfora solo le agregamos vinagre de arroz a nuestro arroz, pero… tú me entiendes.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Hoy subiremos la apuesta, añadiendo ese "toque especial" que hará brillar nuestro plato o, mejor dicho, nuestro hiragana: el yōon. Imagínalo como ese ingrediente secreto que transforma un arroz ordinario en un manjar memorable.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Un poco de azúcar para equilibrar la acidez del vinagre, aportando ese sutil toque dulce. Y, por supuesto, no podemos olvidar la sal, que realza los sabores y equilibra la esencia del arroz.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Recuerda, a veces solo hace falta un pequeño toque para marcar una gran diferencia.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Y ojo!, hablo de una pizca, hay gente que le suelta una cuchara completa a las cosas.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Así que, prepárate para el siguiente paso en esta aventura culinaria-lingüística. ¡Es hora de sazonar nuestras palabras. "さあ、始めましょう！"',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            '¿Y si te dijera que el español y el japonés, a pesar de sus evidentes diferencias, comparten un lazo inesperado?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Sí, estoy hablando de algo que quizás ya conoces: los "Diptongos".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'En español, un diptongo surge cuando dos vocales se unen tan íntimamente que forman una sola sílaba.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Tomemos, como ejemplo, la palabra "Hiena", donde la combinación "ie" produce un sonido similar al de "Ye", totalmente distinto al de pronunciar cada vocal aisladamente.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Ahora, ¿cómo se relaciona esto con el japonés, te preguntarás?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Pues bien, allí nos encontramos con el "yōon", una versión japonesa de esta idea que transforma las sílabas de manera única.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Esto ocurre cuando un kana terminado en "i" se combina con una versión diminuta de "ゃ", "ゅ" o "ょ", creando un efecto similar a un diptongo en español.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Es como juntar el sonido de la "i" con el de la "y", transformando la base original en algo completamente nuevo. Por ejemplo, al combinar "き" con "ゃ", obtenemos "きゃ".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Otro ejemplo divertido y conocido es "に" combinado con "ゃ", que da como resultado "にゃ...", ¡el sonido característico de los gatos en japonés!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Si bien los diptongos en español y el yōon en japonés emergen de contextos lingüísticos distintos, ambos fenómenos alteran la combinación de sonidos para forjar algo fresco y distintivo.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Este "sazonador" se aplica a sonidos como "ki", "shi", "chi", "ni", "mi", "ri", "hi", y a sus variantes modificadas por el Dakuon y Handakuon, ampliando el espectro sonoro del japonés.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Veamos una tabla con estas combinaciones para apreciar la riqueza de posibilidades que este nos ofrece:',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Algo muy importante a mencionar es que la pronunciación en las consonantes (z y d), son iguales pero su uso más común es con la "じゃ". Mientras, que la versión con "ぢゃ" se utiliza en contextos gramaticales específicos y es menos frecuente.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Nuevamente, si tienes dudas de su pronunciación o quieres saber, alguno que otro tip. Te invito a que te des una vuelta en su respectiva sección de vocabulario. Donde podrás encontrar más información.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Aunque algunos diptongos se usan con poca frecuencia, es útil familiarizarse con su pronunciación para reconocerlos cuando aparezcan, en una palabra.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'De esa manera, la próxima vez que alguien te pregunte cómo se pronuncia "X" diptongo, estes preparado para responder.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Recuerda que juntos, construimos una base sólida en la pronunciación japonesa, lo que te permitirá desenvolverte con confianza en situaciones reales.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            '¡Sigue disfrutando de este delicioso viaje por el mundo del hiragana y añade ese toque especial a tu aprendizaje con el yōon!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Baibai!',
        },
      },
    ],
    notes: null,
    glossary: null,
    bibliography: null,
  },
  {
    id: 6,
    lessonNumber: '3.',
    lessonName: 'El exótico pescado de nuestro sushi',
    lessonContent: 'Katakana',
    listDialog: [
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: '¡Prepárate que un nuevo rumbo está por comenzar!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: '¡En el mundo del Katakana, no hay nada que temer, solo disfrutar!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: '¡Un nuevo camino hoy vamos a trazar!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: '¡Hacia nuevas cimas la meta es llegar!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Y así como lo oyes. Hoy toca hablar de otro sistema de escritura, porque sí, resulta que en japonés no basta con aprender un solo conjunto de símbolos… hay más. Pero tranquilo, no es tan complicado como parece. De hecho, piensa en esto:',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Si creías que perfeccionar el arroz era el mayor desafío, espera a conocer el siguiente ingrediente que define al sushi: el pescado. Suena lógico, ¿no? Cada uno tiene su razón de ser, su papel en la receta. Pues lo mismo ocurre con la escritura japonesa.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'A primera vista, tener dos formas de escritura con funciones similares podría parecer innecesario e incluso desalentador. Pero el Katakana tiene sus propias particularidades que lo hacen no solo útil, sino esencial para hablar y dominar el japonés.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Iniciemos por el origen de la palabra, la cual está compuesta por "片" que significa "una parte (de algo)" y "仮名", que significa "letra(s) prestada(s)".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: '¡A que no te la sabias!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Este detalle cobra sentido al considerar que los caracteres provienen de fragmentos de kanjis, simplificados para facilitar una escritura más rápida basada en su valor fonético.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Como puedes notar, a diferencia de las suaves curvas del Hiragana, aquí predominan las líneas rectas y los ángulos marcados. Ambos silabarios tienen su origen en los kanjis, pero cada uno evolucionó con un propósito distinto.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            "El Katakana, al igual que el Hiragana, tiene sus raíces en el man'yôgana durante los siglos VIII y IX. Como recordemos, era una forma más sencilla de los Kanji.",
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Originalmente, fue utilizado por grupos de religiosos en Nara para simplificar la pronunciación nativa y la gramática de los textos budistas.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Posteriormente, alrededor del año 901, su uso se extendió a documentos oficiales. Estoy hablando de cosas como quejas, comunicados o decretos importantes del gobierno.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Basta con detenernos un instante para ver que este silabario está formado por 46 sonidos "puros".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Algo interesante porque es como si cada carácter del Hiragana tuviera un gemelo. Aunque los símbolos sean diferentes, ambos comparten exactamente los mismos sonidos.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Imagínalo como la diferencia entre mayúsculas y minúsculas en nuestro alfabeto. Los símbolos cambian, pero su pronunciación sigue siendo la misma. Curioso, ¿no crees?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Solo que algunas veces esta diferencia puede ser un tanto difícil de ver.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Observa como algunos kanas son tan parecidos que podrían confundirse fácilmente.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Claro, con un poco de práctica, empezarás a notar las diferencias con mayor facilidad. Y créeme, es algo que se vuelve casi automático después de un tiempo',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Ahora bien, quizás te preguntes: "¿No sería más fácil usar un solo sistema y olvidarnos de tanto enredo?".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Tiene sentido, pero recuerda, las cosas no evolucionan por comodidad, sino por necesidad. Durante mucho tiempo, los silabarios coexistieron con el Kanji, y en aquel entonces, lo que hoy conocemos como Katakana era reservado para textos oficiales y religiosos.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Con el tiempo, su uso cambió, y en la actualidad, se ha especializado casi exclusivamente en la adaptación de palabras extranjeras y préstamos lingüísticos.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Además de tener otros roles como:',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Imitar sonidos (onomatopeya).',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Resaltar palabras o frases dentro de un texto.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Nombrar establecimientos o productos, dándoles un aire de modernidad y tecnología.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Términos científicos y nombres de animales y plantas.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Es fascinante cómo el japonés moderno se ha enriquecido con palabras de otros idiomas, aproximadamente un 30%.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Ya, si nos queremos ver precisos. De ese 30 el 80% de estas palabras son préstamos del inglés, mientras que el resto proviene de idiomas como el alemán, francés, portugués y español.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Pero ¡atención! Esto no significa que todo lo escrito en este silabario venga del extranjero.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Como bien se dice, una cosa es la teoría y otra la práctica. Y aquí es donde su uso puede sorprenderte.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Te voy a contar un dato interesante, sacado del rincón más escondido de mi cabeza.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'En muchas partes de Japón encontrarás carteles que anuncian: "カラオケ".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: '¿Y qué quiere decir eso...?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Bueno, es obvio que ahí dice: Karaoke',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Lo interesante aquí es el origen mixto de la palabra que combina "空" con la abreviación inglesa para orquesta (oke).',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Entonces... si es una palabra japonesa ¿por qué se escribe en así?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'La razón es mucho más simple de lo que podrías imaginar y es que también encontrarás palabras japonesas escritas en katakana, usándose de manera similar a cómo empleamos las mayúsculas en el alfabeto latino, "para dar énfasis".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Es bueno entender que la regla de palabras japonesas en hiragana y palabras extranjeras en katakana es más "una guía general" que "una regla inquebrantable".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Así que, aunque aprenderlo al principio pueda parecer echarle más leña al fuego, se revela como una herramienta esencial para acceder a una vasta cantidad de contenidos en japonés y profundizar en su cultura.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Recuerda que, con perseverancia y dedicación, podrás dominar este exótico ingrediente de nuestro sushi lingüístico.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'Y… si te preguntas por qué la analogía con el pescado, la respuesta es simple: su versatilidad y variedad. La cual puede verse reflejada en los múltiples usos que tiene dentro de la cocina japonesa y al momento claro de preparar un sushi.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: '¿Qué, esperabas una explicación más profunda? :P',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph:
            'No dejes de practicar y nunca te des por vencido. Estoy aquí para apoyarte en cada paso de tu aprendizaje. Dominar cada sistema de escritura te brindará una base sólida en tu camino hacia el dominio del japonés.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 3,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_4',
        focused: false,
        content: {
          paragraph: 'Ya ne!',
        },
      },
    ],
    notes: null,
    glossary: null,
    bibliography: null,
  },
  {
    id: 7,
    lessonNumber: '3.1',
    lessonName: 'Realzando el pescado en nuestro sushi',
    lessonContent: 'Katakana Dakuon y Handakuon',
    listDialog: [
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            '¡Holis! Aquí nuevamente Aiko, más que lista y preparada con ganas de compartir otra dosis del fascinante mundo del Katakana.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Ya hemos seleccionamos con cuidado el pescado para nuestro sushi. Desde un sencillo atún hasta un exquisito salmón, cada uno puede aportar su propio toque especial.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Pues como te mencioné, el Katakana tiene esa magia: su versatilidad y su capacidad de adaptarse a tantas situaciones lo hacen único. Ahora toca elevarlo a nuevas alturas.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            '¿Cómo es eso posible? Pues ni más, ni menos. Que realzando el sabor inherente de nuestro pescado elegido.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Y no hablo de añadir más ingredientes, sino de aprovechar al máximo el sabor que ya posee, dándole ese toque gourmet que lo distingue.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Ya hemos seleccionamos con cuidado el pescado para nuestro sushi. Desde un sencillo atún hasta un exquisito salmón, cada uno puede aportar su propio toque especial.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Para lograr esto, es necesario enfocarnos en los términos "濁音" y "半濁音", los cuales ya hemos visto anteriormente.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Estos conceptos son como las técnicas de corte y preparación que emplean los chefs para resaltar el sabor del pescado: ajustes delicados y precisos que transforman un buen pescado en algo verdaderamente increíble.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Al igual que en el Hiragana, el "濁音" en el Katakana se forma al añadir un tenten "てんてん" a ciertas consonantes, como "k", "s", "t" y "h".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: 'Esto transforma su pronunciación original, dándole un sonido más suave.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: 'Aquí tienes una tabla para visualizar esos cambios.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Así mismo, como te mencione anteriormente la pronunciación de "ジ" y "ズ" de la consonante "s" es prácticamente igual a la de "ヂ" y "ヅ" de la consonante "d", aunque se usan en diferentes contextos gramaticales.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Y no podemos olvidar el Handakuon en el Katakana. El cual consiste en agregar un pequeño "◌" en la parte superior derecha de las consonantes de la serie "h".',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Creando así una versión más suave y delicada, similar a lo que hicimos en Hiragana.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Y es asi, como con este aprovechamiento de sabor en nuestro pescado. Estamos cada vez más cerca de dominar el arte del sushi lingüístico.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'No olvides que cada pequeño detalle, cada nueva marca que aprendemos, es un paso más hacia la maestría de este idioma tan rico y expresivo.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Así que ¡No te detengas aquí! Sigue explorando, practicando y, sobre todo, disfrutando de la emoción de realzar el sabor en cada aspecto de tu aprendizaje.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Estoy emocionada por ver cómo aplicarás estos nuevos conocimientos y por compartir aún más contigo en nuestras próximas elecciones.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: '¡Nos estamos viendo!',
        },
      },
    ],
    notes: null,
    glossary: null,
    bibliography: null,
  },
  {
    id: 8,
    lessonNumber: '3.2',
    lessonName: 'Combinaciones sabrosas',
    lessonContent: 'Katakana yōon',
    listDialog: [
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: '"久しぶり!" ¡Listos para continuar donde lo dejamos!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'La vez pasada, nos convertimos en todos unos chefs al realzar el pescado en nuestro sushi con el Katakana Dakuon y Handakuon.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Aunque, entre tú y yo, básicamente lo que hicimos fue cortar bien el pescado.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: 'La verdad las cosas como son...',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Hoy vamos a intentar darle una vuelta de tuerca a cómo preparar un sushi tradicional. Aventuraremos a combinar distintos tipos de pescado en nuestro sushi, creando deliciosas mezclas de sabores con el Katakana yōon.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: 'Y puede que te preguntes, ¿acaso eso no es algo parecido al Hiragana Yoon?',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: 'La realidad es que, sí y no.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Verás, el Katakana yōon nos permite añadir nuevos matices a ciertas sílabas, aparte de las que ya conocemos del Hiragana',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Creando combinaciones sonoras que expanden nuestras posibilidades expresivas. Ofreciéndonos nuevas maneras de expresar una amplia gama de palabras y emociones.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 2,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: 'Antes de profundizar más, repasemos algo que ya conocemos.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Las sílabas específicas a las que podemos aplicarles el Yoon, tales como: "ki", "shi", "chi", "ni", "mi", "ri", "hi" y por supuesto, incluyendo aquellas combinadas con Dakuon y Handakuon.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Recuerda, estas sílabas necesitan juntarse con las versiones mini de "ャ", "ュ" o "ョ". Pequeño detalle que es crucial; pues sin estas versiones reducidas, los diptongos que queremos crear simplemente no existirían.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph: 'Aquí te dejo una tabla con estas combinaciones en katakana:',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Ahora, poniéndonos un poco detallistas, podemos ver que el Yoon, tanto en Hiragana como en Katakana, nos da juego para mezclar sonidos en japonés.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Sin embargo, cuando se trata de sonidos extranjeros, a veces el Yoon por sí solo no es suficiente.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Recordemos que uno de los grandes roles del Katakana hoy en día es representar palabras de otros idiomas, intentando capturar sus sonidos lo mejor posible, lo que significa que, en términos de combinaciones, el Katakana lleva la delantera.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Estas combinaciones se utilizan principalmente para representar sonidos extranjeros, ajustándose a la fonología japonesa. Aunque... no siempre es la traducción perfecta, pero bueno... se hace lo que se puede.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Aquí es donde entra en juego nuestra combinación de pescados dentro de nuestro sushi o 特殊音 dentro del universo Katakana.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'El Tokushu-on nos permite combinar vocales en Katakana, en tamaño reducido, con otros kanas (incluidos los Dakuon y Handakuon) y hasta con otras vocales.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Permitiéndonos una flexibilidad increíble para acercarnos a esos sonidos extranjeros. Si bien no forman parte del uso cotidiano, conocerlos te abre un mundo de posibilidades en caso de encontrarse con una palabra que los contenga.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Para darte una idea, aquí tienes algunos ejemplos de cómo se forman estos sonidos especiales:',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Y con esto, damos un paso más en nuestra aventura por el delicioso mundo del katakana.',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            '¡Sigue disfrutando de este viaje exquisito por el katakana y experimenta con las sabrosas combinaciones que el yōon te ofrece!',
        },
      },
      {
        lottieAnimation: 'ai',
        storyStructure: 1,
        typeStructure: 1,
        audio: 'leccion_2_1_parte_3',
        focused: false,
        content: {
          paragraph:
            'Nos vemos en nuestra próxima lección y hasta entonces, ¡Mantén viva tu pasión por el japonés y sigue cocinando nuevas palabras y frases!',
        },
      },
    ],
    notes: null,
    glossary: null,
    bibliography: null,
  },
];
export class AddContentLessons1760378882175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const content of lessonsContent) {
      const lesson = await queryRunner.query('SELECT uuid FROM lessons WHERE "number" = $1', [
        content.lessonNumber,
      ]);
      const lessonId = lesson[0].uuid;

      await queryRunner.query(
        'INSERT INTO "content" ( "content", "name", lesson_uuid) VALUES($1, $2, $3)',
        [content.lessonContent, content.lessonName, lessonId],
      );
      const contentLesson = await queryRunner.query('SELECT uuid FROM content WHERE "name" = $1', [
        content.lessonName,
      ]);
      const contentId = contentLesson[0].uuid;

      if (content.listDialog && content.listDialog.length > 0) {
        for (const dialog of content.listDialog) {
          await queryRunner.query(
            'INSERT INTO "dialog" ( "lottie_animation", "story_structure", "type_structure", "audio", "focused", "content", lesson_content_uuid) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [
              dialog.lottieAnimation,
              dialog.storyStructure,
              dialog.typeStructure,
              dialog.audio,
              dialog.focused,
              JSON.stringify(dialog.content),
              contentId,
            ],
          );
        }
        if (content.notes && content.notes.length > 0) {
          for (const note of content.notes) {
            await queryRunner.query(
              'INSERT INTO "notes" ( "content", "audio", "lesson_content_uuid") VALUES($1, $2, $3)',
              [note.content, note.audio, contentId],
            );
          }
        }
        if (content.glossary && content.glossary.length > 0) {
          for (const glossary of content.glossary) {
            await queryRunner.query(
              'INSERT INTO "glossary" ( "kanji", "kana", "romaji", "description", "audio", "lesson_content_uuid") VALUES($1, $2, $3, $4, $5, $6)',
              [
                glossary.kanji,
                glossary.kana,
                glossary.romaji,
                glossary.description,
                glossary.audio,
                contentId,
              ],
            );
          }
        }
        if (content.bibliography && content.bibliography.length > 0) {
          for (const bibliography of content.bibliography) {
            await queryRunner.query(
              'INSERT INTO "bibliography" ( "content", "audio", "lesson_content_uuid") VALUES($1, $2, $3)',
              [bibliography.content, bibliography.audio, contentId],
            );
          }
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM public."bibliography"');
    await queryRunner.query('DELETE FROM public."glossary"');
    await queryRunner.query('DELETE FROM public."notes"');
    await queryRunner.query('DELETE FROM public."dialog"');
    await queryRunner.query('DELETE FROM public."content"');
  }
}
