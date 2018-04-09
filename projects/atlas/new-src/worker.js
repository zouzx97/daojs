import { createEngine } from '@daojs/engine';
import story from './story.yaml';

createEngine()
  .registerProcedures({})
  .loadStory(story)
  .start();
