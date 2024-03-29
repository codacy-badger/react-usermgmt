module.exports = {
	collectCoverageFrom: [
		'<rootDir>/src/**/*.{js,jsx}',
		'!**/index.js',
		'!<rootDir>/src/index.jsx',
		'!<rootDir>/src/polyfills.js',
		'!<rootDir>/src/assets/**',
		'!<rootDir>/src/routes/**',
		'!<rootDir>/src/scss/**',
		'!<rootDir>/src/theme/**',
		'!<rootDir>/src/common/prop-types/**'
	],
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90
		}
	},
	moduleNameMapper: {
		'\\.s?css$': 'identity-obj-proxy',
		'^@src[/](.+)': '<rootDir>/src/$1',
		'^@shared[/](.+)': '<rootDir>/src/components/shared/$1',
		'^node-modules[/](.+)': '<rootDir>/node_modules/$1'
	},
	setupFiles: [
		'<rootDir>/config/jest/test-setup.js',
		'jest-localstorage-mock',
		'jest-prop-type-error'
	],
	testEnvironment: 'jest-environment-jsdom-global',
	testMatch: ['<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)'],
	testURL: 'http://localhost',
	transform: {
		'^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.s?css$': '<rootDir>/config/jest/style-transform.js',
		'^.+\\.(png|jpg|jpeg|git|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/config/jest/file-transform.js'
	},
	moduleDirectories: ['node_modules']
};
