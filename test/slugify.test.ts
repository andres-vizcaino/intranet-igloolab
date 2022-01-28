import { slugify } from '../config/utils/slugify'

describe('test slugify', () => {
  test('test1', () => {
    expect(
      slugify(
        ' Jack & Jill like numbers 1,2,3 and 4 and silly characters ?%.$!/'
      )
    ).toEqual('jack-y-jill-like-numbers-123-and-4-and-silly-characters-')
  })
  test('test2', () => {
    expect(slugify("Un \xe9l\xe9phant \xe0 l'or\xe9e du bois")).toEqual(
      'un-lphant-lore-du-bois'
    )
  })
})
