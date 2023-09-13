// import express from 'express';
// import { MRGlossaryGenerator } from './MRGlossaryGenerator';
// import { YamlWrangler } from './YamlWrangler';

// class MRGApi {
//   private generator: MRGlossaryGenerator;
//   private yamlWrangler: YamlWrangler;
//   private router: express.Router;

//   constructor(generator: MRGlossaryGenerator, yamlWrangler: YamlWrangler) {
//     this.generator = generator;
//     this.yamlWrangler = yamlWrangler;
//     this.router = express.Router();

//     this.router.get('/ctwg/mrg', this.mrgForm);
//     this.router.post('/ctwg/mrg', this.createMrg);
//   }

//   mrgForm(req: express.Request, res: express.Response) {
//     res.render('mrg-form');
//   }

//   createMrg(req: express.Request, res: express.Response) {
//     const params = {
//       scopedir: req.body.scopedir,
//       safFilename: req.body.safFilename,
//       versionTag: req.body.versionTag,
//     };

//     try {
//       const mrg = this.generator.generate(params.scopedir, params.safFilename, params.versionTag);
//       const mrgString = this.yamlWrangler.asYamlString(mrg);
//       res.render('mrg-result', { mrg: mrgString });
//     } catch (e) {
//       if (e instanceof MRGGenerationException) {
//         res.status(500).send(`Unable to generate MRG. Error was ${e.message}`);
//       } else {
//         res.status(500).send(`Unexpected error generating MRG. Error was ${e.message}`);
//       }
//     }
//   }
// }

// export default MRGApi;
