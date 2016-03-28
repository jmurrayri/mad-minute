exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests/**/*.js'],
    capabilities: {
        browserName: 'chrome'
    },
    useAllAngular2AppRoots: true
};
