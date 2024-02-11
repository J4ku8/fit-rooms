## Synchronization service

This service is for synchronization of KOS service with Microsoft's Graph API.

Before first run, you need to have running MongoDB. This DB should be build from docker image. 

For local development run: `yarn install & yarn start`

Project structure: <br>
`/config` – Config folder stands for keeping all .env constants <br> 
`/controller` – In controller folder is handled direct comunication with external services: KOSapi, Graph API <br>
`/db` – In db folder are stored MongoDB models, in model subfolder. In index.ts in db connector. <br>
`/middleware` – Middleware folder is keeping all significant features, like oauth, crons, synchronization process, etc. <br>
`/utils` – Utils folder is there for all simple operations, which are used in bigger scope.  <br>
