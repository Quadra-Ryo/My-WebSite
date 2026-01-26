// Portfolio Data
const portfolioData = {
    it: {
        title: 'Junior Robotic Software R&D Engineer',
        caption: 'Sviluppatore software backend di 20 anni con <span class="highlight">3 anni di esperienza lavorativa</span> e 6 anni di studio in programmazione. Localizzato in <span class="highlight">Italia (Toscana, AR)</span>. Specializzato principalmente in <span class="highlight">Python</span>, <span class="highlight">C</span>, <span class="highlight">Java</span> e <span class="highlight">Sphinx</span>, con forte adattabilità acquisita attraverso esperienze in <span class="highlight">robotica</span> ed <span class="highlight">embedded systems</span>.',
        tabs: {
            career: 'CARRIERA',
            projects: 'PROGETTI',
            education: 'FORMAZIONE',
            about: 'CHI SONO',
            live: 'FUORI DAl PC'
        },
        translations: {
            availability: 'Disponibilità',
            robotsWorkedWith: 'Robot con i quali ho lavorato',
            sourceCode: 'Codice Sorgente',
            liveDemo: 'Demo Live'
        },
        career: [
            {
                role: 'Robotic R&D Software Engineer',
                company: 'ARS Automation',
                companyUrl: 'https://www.linkedin.com/company/ars-automation-srl/posts/?feedView=all',
                period: '08/2023 - Presente',
                description: 'Ricerca e sviluppo software nel campo della <span class="highlight">Robotica industriale</span> utilizzando diversi linguaggi di programmazione (vedi sotto) e stesura di documentazione con tool Office e mediante l\'uso di <span class="highlight">Sphinx</span>. Sviluppo di applicazioni gestionali in <span class="highlight">Android Studio</span> e sviluppo di testing di prodotti proprietari.',
                robots: [
                    { brand: 'FANUC', tech: 'Fanuc Karel' },
                    { brand: 'Yaskawa', tech: 'C' },
                    { brand: 'Kassow', tech: 'C++, Docker' },
                    { brand: 'UR', tech: 'Python (XMLRPC Protocol)' },
                    { brand: 'URCap', tech: 'Python (XMLRPC Protocol) + Java' },
                    { brand: 'ABB WebApp', tech: 'JavaScript + HTML, CSS' },
                    { brand: 'Schneider', tech: 'CODESYS' },
                    { brand: 'JAKA', tech: 'Python + Linguaggio proprietario' },
                    { brand: 'Omron TM', tech: 'Linguaggio proprietario' },
                    { brand: 'Denso', tech: 'Linguaggio proprietario' },
                    { brand: 'Shibaura', tech: 'Linguaggio proprietario' },
                    { brand: 'Estun', tech: 'Linguaggio proprietario' }
                ]
            },
            {
                role: 'Embedded Software Developer',
                company: 'New Generation Sensors',
                companyUrl: 'https://www.linkedin.com/company/new-generation-sensors-srl/posts/?feedView=all',
                period: '06/2022 - 06/2023',
                description: 'Sviluppo software per microcontrollori (NRF520K) in <span class="highlight">C</span>. Sviluppo REST API con <span class="highlight">Python (FastAPI)</span> e <span class="highlight">Docker</span>. Partecipazione a studio e progettazione di <span class="highlight">Blockchain</span> proprietaria. Partecipazione al progetto europeo <span class="highlight">Horizon 2020</span>.'
            }
        ],
        projects: [
            {
                name: 'My Blog',
                tech: 'Sphinx, Python, Markdown, GitHub Pages',
                description: 'Il mio blog personale dove condivido appunti, guide e riflessioni su programmazione, tecnologia e sviluppo software. Costruito con Sphinx e pubblicato su GitHub Pages.',
                links: {
                    github: 'https://github.com/Quadra-Ryo/Computer_science_notes',
                    live: 'blog/V. 1.0/Italiano/index.html'
                }
            },
            {
                name: 'Easy Versioning for Sphinx',
                tech: 'Python, Sphinx Extension',
                description: 'Tool personale di versionamento della documentazione per Sphinx. Permette di gestire automaticamente diverse versioni della documentazione tecnica, utilizzato anche nel mio blog.',
                links: {
                    github: 'https://github.com/Quadra-Ryo/Easy-versioning-sphinx',
                    live: 'https://pypi.org/project/Easy-versioning/'
                }
            },
            {
                name: 'JustETF Scraper API',
                tech: 'Python, Web Scraping, REST API',
                description: 'API per lo scraping automatico di dati ETF da JustETF. Progetto sviluppato per semplificare l\'analisi e il confronto di ETF nel contesto della finanza personale e dell\'ottimizzazione del portafoglio investimenti.',
                links: {
                    github: 'https://github.com/Quadra-Ryo/JustETF-Scraper-API'
                }
            }
        ],
        education: [
            {
                degree: 'Laurea Triennale in Informatica',
                institution: 'Università di Pisa',
                period: '2025 - Presente',
                description: 'Corso di laurea in Informatica focalizzato su algoritmi, strutture dati e sviluppo software.'
            },
            {
                degree: 'Diploma IT e Telecomunicazioni',
                institution: 'ITIS Galileo Galilei - Arezzo',
                period: '2018 - 2023',
                description: 'Specializzazione in informatica e telecomunicazioni con focus su programmazione e sistemi embedded.'
            },
            {
                degree: 'Corso Programmazione Robot FANUC RO03DL',
                institution: 'Fanuc Academy Italia',
                period: '10/2023',
                description: 'Certificazione sulla programmazione di robot industriali FANUC con linguaggio Karel.'
            }
        ],
        about: {
            title: 'Chi Sono',
            description: 'Oltre alla programmazione, coltivo una passione per l\'arte nelle sue diverse forme espressive, soprattutto filmografia, pittura, statue e carte collezionabili. Mi interesso attivamente di finanza personale e del movimento FIRE (Financial Independence, Retire Early), sviluppando progetti e tool per ottimizzare la gestione degli investimenti personali. Nel tempo libero mi dedico ai videogiochi e alle moto, e mi tengo costantemente aggiornato sui mercati finanziari attraverso podcast e libri sulla finanza personale.',
            availability: 'Sono molto disponibile a lavorare sia da remoto che a trasferirmi. Mi piacerebbe molto fare un\'esperienza lavorativa all\'estero per crescere professionalmente e arricchire il mio background culturale.',
            interests: [
                {
                    icon: '🎨',
                    title: 'Arte',
                    description: 'Appassionato di varie forme d\'arte soprattutto filmografia, pittura, statue e carte collezionabili'
                },
                {
                    icon: '💰',
                    title: 'Finanza Personale',
                    description: 'Studio del movimento FIRE e sviluppo di tool per la gestione degli investimenti'
                },
                {
                    icon: '🎮',
                    title: 'Videogiochi',
                    description: 'Gaming e interesse per game design e meccaniche di gioco'
                },
                {
                    icon: '🏍️',
                    title: 'Moto',
                    description: 'Passione per le due ruote e dello studio dietro alla tecnica di guida'
                },
                {
                    icon: '🌐',
                    title: 'Lingue',
                    description: 'Madrelingua italiano, avanzato in inglese, basi di tedesco'
                },
                {
                    icon: '📚',
                    title: 'Apprendimento Continuo',
                    description: 'Lettura di libri tecnici e podcast su finanza e programmazione'
                },
                {
                    icon: '🎴',
                    title: 'Collezionabili',
                    description: 'Colleziono carte Pokémon dall\'infanzia. Oggi aiuto a gestire due attività di collezionabili occupandomi di infrastruttura informatica e social media.'
                }
            ]
        },
        live: {
            title: 'Quadra-Live',
            description: 'Alcune cose che potresti trovare interessanti su di me non riguardanti il settore dell\'informatica',
            cards: [
                {
                    icon: '🎵',
                    title: 'Le mie canzoni preferite',
                    type: 'spotify',
                    description: 'Questa playlist contiene le mie canzoni preferite di sempre, spazia molto per generi e lingue ma sono tutte bellissime!'
                },
                {
                    icon: '🚀',
                    title: 'Progetto Attuale',
                    type: 'current-project'
                }
            ],
            currentProject: {
                title: 'Memorabillis',
                description: 'Sto progettando e realizzando Memorabillis: display trasparenti in resina epossidica per l\'esposizione di fotogrammi cinematografici originali. Il design integra protezione fisica della pellicola, trasparenza ottica per la visualizzazione diretta e compatibilità con la proiezione luminosa. Il progetto combina selezione dei materiali, progettazione strutturale e tecniche di lavorazione della resina per sviluppare un sistema di display che preservi l\'integrità del supporto filmico trasformandolo in oggetto decorativo funzionale. La data di rilascio della beta del prodotto è prevista per gennaio 2026!',
                image: 'src/memorabillis.png',
                tags: ['3D Printing', 'Product design', 'Materials engineering'],
                link: 'https://quadra-ryo.github.io/Computer_science_notes/',
                status: 'In sviluppo attivo'
            }
        }
    },
    en: {
        title: 'Junior Robotic Software R&D Engineer',
        caption: '20-year-old backend software developer with <span class="highlight">3 years of work experience</span> and 6 years of programming study. Located in <span class="highlight">Italy (Tuscany, AR)</span>. Specialized mainly in <span class="highlight">Python</span>, <span class="highlight">C</span>, <span class="highlight">Java</span>, and <span class="highlight">Sphinx</span>, with strong adaptability gained through experiences in <span class="highlight">robotics</span> and <span class="highlight">embedded systems</span>.',
        tabs: {
            career: 'CAREER',
            projects: 'PROJECTS',
            education: 'EDUCATION',
            about: 'ABOUT ME',
            live: 'OUTSIDE THE PC'
        },
        translations: {
            availability: 'Availability',
            robotsWorkedWith: 'Robots I worked with',
            sourceCode: 'Source Code',
            liveDemo: 'Live Demo'
        },
        career: [
            {
                role: 'Robotic R&D Software Engineer',
                company: 'ARS Automation',
                companyUrl: 'https://www.linkedin.com/company/ars-automation-srl/posts/?feedView=all',
                period: '08/2023 - Present',
                description: 'Research and software development in industrial <span class="highlight">robotics field</span> using a lot of different programming languages (see below) and documentation writing using Office tools and <span class="highlight">Sphinx</span>. Development of management applications in <span class="highlight">Android Studio</span> and proprietary product testing development.',
                robots: [
                    { brand: 'FANUC', tech: 'Fanuc Karel' },
                    { brand: 'Yaskawa', tech: 'C' },
                    { brand: 'Kassow', tech: 'C++, Docker' },
                    { brand: 'UR', tech: 'Python (XMLRPC Protocol)' },
                    { brand: 'URCap', tech: 'Python (XMLRPC Protocol) + Java' },
                    { brand: 'ABB WebApp', tech: 'JavaScript + HTML, CSS' },
                    { brand: 'Schneider', tech: 'CODESYS' },
                    { brand: 'JAKA', tech: 'Python + Proprietary Language' },
                    { brand: 'Omron TM', tech: 'Proprietary Language' },
                    { brand: 'Denso', tech: 'Proprietary Language' },
                    { brand: 'Shibaura', tech: 'Proprietary Language' },
                    { brand: 'Estun', tech: 'Proprietary Language' }
                ]
            },
            {
                role: 'Embedded Software Developer',
                company: 'New Generation Sensors',
                companyUrl: 'https://www.linkedin.com/company/new-generation-sensors-srl/posts/?feedView=all',
                period: '06/2022 - 06/2023',
                description: 'Microcontroller software development (NRF520K) in <span class="highlight">C</span>. REST API development with <span class="highlight">Python (FastAPI)</span> and <span class="highlight">Docker</span>. Participation in proprietary <span class="highlight">Blockchain</span> study and design. Participation in European <span class="highlight">Horizon 2020</span> project.'
            }
        ],
        projects: [
            {
                name: 'My Blog',
                tech: 'Sphinx, Python, Markdown, GitHub Pages',
                description: 'My personal blog where I share notes, guides and thoughts on programming, technology and software development. Built with Sphinx and published on GitHub Pages.',
                links: {
                    github: 'https://github.com/Quadra-Ryo/Computer_science_notes',
                    live: 'blog/V. 1.0/English/index.html'
                }
            },
            {
                name: 'Easy Versioning for Sphinx',
                tech: 'Python, Sphinx Extension',
                description: 'Personal documentation versioning tool for Sphinx. Enables automatic management of different technical documentation versions, also used in my blog.',
                links: {
                    github: 'https://github.com/Quadra-Ryo/Easy-versioning-sphinx',
                    live: 'https://pypi.org/project/Easy-versioning/'
                }
            },
            {
                name: 'JustETF Scraper API',
                tech: 'Python, Web Scraping, REST API',
                description: 'API for automatic ETF data scraping from JustETF. Project developed to simplify ETF analysis and comparison in the context of personal finance and investment portfolio optimization.',
                links: {
                    github: 'https://github.com/Quadra-Ryo/JustETF-Scraper-API'
                }
            }
        ],
        education: [
            {
                degree: 'Bachelor\'s Degree in Computer Science',
                institution: 'Università di Pisa',
                period: '2025 - Present',
                description: 'Computer Science degree focused on algorithms, data structures and software development.'
            },
            {
                degree: 'IT and Telecommunications Diploma',
                institution: 'ITIS Galileo Galilei - Arezzo',
                period: '2018 - 2023',
                description: 'Specialization in computer science and telecommunications with focus on programming and embedded systems.'
            },
            {
                degree: 'FANUC Robot Programming Course RO03DL',
                institution: 'Fanuc Academy Italia',
                period: '10/2023',
                description: 'Certification in FANUC industrial robot programming with Karel language.'
            }
        ],
        about: {
            title: 'About Me',
            description: 'Beyond programming, I cultivate a passion for art in its various expressive forms, especially filmography, painting, statues, and collectible cards. I actively engage with personal finance and the FIRE (Financial Independence, Retire Early) movement, developing projects and tools to optimize personal investment management. In my free time, I enjoy videogames and motorcycles, and I constantly stay updated on financial markets through podcasts and books on personal finance.',
            availability: 'I am very open to working both remotely and relocating. I would really like to have a work experience abroad to grow professionally and enrich my cultural background.',
            interests: [
                {
                    icon: '🎨',
                    title: 'Art',
                    description: 'Passionate about various forms of art especially filmography, painting, statues, and collectible cards'
                },
                {
                    icon: '💰',
                    title: 'Personal Finance',
                    description: 'FIRE movement enthusiast and investment management tool developer'
                },
                {
                    icon: '🎮',
                    title: 'Videogames',
                    description: 'Gaming and interest in game design and mechanics'
                },
                {
                    icon: '🏍️',
                    title: 'Motorcycles',
                    description: 'Passion for two wheels and studying riding techniques'
                },
                {
                    icon: '🌐',
                    title: 'Languages',
                    description: 'Native Italian, advanced English, basic German'
                },
                {
                    icon: '📚',
                    title: 'Continuous Learning',
                    description: 'Technical books and podcasts on finance and programming'
                },
                {
                    icon: '🎴',
                    title: 'Collectibles',
                    description: 'I\'ve been collecting Pokémon cards since childhood. Today I help manage two collectibles businesses, handling IT infrastructure and social media.'
                }
            ]
        },
        live: {
            title: 'Outside the pc',
            description: 'Some things you might find interesting about me that aren\'t related to the IT field.',
            cards: [
                {
                    icon: '🎵',
                    title: 'My favourite songs',
                    type: 'spotify',
                    description: 'This playlist contains my all-time favorite songs, it spans a lot in terms of genres and languages but they are all beautiful!'
                },
                {
                    icon: '🚀',
                    title: 'Current Project',
                    type: 'current-project'
                }
            ],
            currentProject: {
                title: 'Memorabillis',
                description: 'I am designing and fabricating Memorabillis: transparent epoxy resin displays for showcasing original film frames. The design integrates physical protection of the film stock, optical transparency for direct viewing, and compatibility with backlit projection. The project combines material selection, structural design, and resin fabrication techniques to develop a display system that preserves film integrity while transforming it into a functional decorative object. "The beta release date for the product is scheduled for January 2026!',
                image: 'src/memorabillis.png',
                tags: ['3D Printing', 'Product design', 'Materials engineering'],
                link: 'https://quadra-ryo.github.io/Computer_science_notes/',
                status: 'Actively developing'
            }
        }
    }
};
