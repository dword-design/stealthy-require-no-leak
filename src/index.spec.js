import tester from '@dword-design/tester'
import testerPluginTmpDir from '@dword-design/tester-plugin-tmp-dir'
import { outputFile } from 'fs-extra'
import P from 'path'

import self from '.'

export default tester(
  {
    valid: async () => {
      await outputFile('foo.js', 'module.exports = 1')
      let foo = self(require.cache, () => require(P.resolve('foo.js')))
      expect(foo).toEqual(1)
      await outputFile('foo.js', 'module.exports = 2')
      foo = self(require.cache, () => require(P.resolve('foo.js')))
      expect(foo).toEqual(2)
    },
  },
  [testerPluginTmpDir()]
)
