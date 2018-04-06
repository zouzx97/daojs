import registerProcedure from '../../src/server';

registerProcedure({ echo: text => text });
