project/
|-- microservices/
|   |-- service1/
|   |   |-- models/
|   |   |-- views/
|   |   |-- controllers/
|   |   |-- services/          (Pro synchronizaci mezi službami)
|   |   |-- routes/            (Pro routování HTTP požadavků)
|   |   |-- tests/             (Jednotkové a integrační testy)
|   |
|   |-- service2/
|   |   |-- models/
|   |   |-- views/
|   |   |-- controllers/
|   |   |-- services/
|   |   |-- routes/
|   |   |-- tests/
|
|-- shared/
|   |-- models/                 (Společné modely, pokud existují)
|   |-- utils/                  (Společné utility a nástroje)
|
|-- frontend/
|   |-- static/                 (Statické soubory pro frontend)
|   |-- templates/              (HTML šablony pro vykreslování stránek)
|   |-- controllers/            (Kontroléry pro frontend, pokud jsou potřebné)
|   |-- tests/                  (Testy pro frontend)
|
|-- config/                     (Konfigurace projektu)
|-- scripts/                    (Skripty pro nasazení, migrace dat, atd.)
|-- docs/                       (Dokumentace projektu)
|-- tests/                      (Obecné testy, testy pro middleware, atd.)
|-- .gitignore                  (Soubor pro ignorování souborů v Gitu)
|-- package.json                (Konfigurace Node.js projektu)
|-- app.js                      (Vstupní bod pro spuštění aplikace)
