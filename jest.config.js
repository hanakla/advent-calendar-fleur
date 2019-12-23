module.exports = {
  preset: 'ts-jest',
  testRegex: 'src/.*\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  modulePaths: ['<rootDir>/src/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      typeCheck: false
    }
  }
}
