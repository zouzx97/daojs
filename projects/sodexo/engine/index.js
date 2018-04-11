import Engine, { ProcedureRegistry } from '@daojs/engine';
import procedures from './procedures';

ProcedureRegistry.register(procedures);
Engine.start();
