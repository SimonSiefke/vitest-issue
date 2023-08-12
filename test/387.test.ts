import { assert, expect, test } from 'vitest'

test('abc', () => {
  const end = Date.now()+3000
  while(Date.now()<end){}
})
