import gql from 'graphql-tag';
import * as types from './types'

import { makeSchema } from 'nexus/dist/makeSchema';
import { join } from 'path';


export const schema = makeSchema({
  types,
  outputs:{
    typegen: join(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
    schema: join(process.cwd(), 'graphql', 'schema.graphql')
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts')
  },
})