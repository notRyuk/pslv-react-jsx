const path = require("path");

const resolvePath = (modulePath) => {
    if (modulePath.startsWith("@jest/")) {
        return path.resolve(__dirname, "node_modules", modulePath);
    }

    if (modulePath.startsWith("@")) {
        return path.resolve(__dirname, "src", modulePath.slice(1));
    }

    return modulePath;
};

module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    // resolver: resolvePath,
    setupFiles: ["tsconfig-paths/register", "<rootDir>/setup.jest.ts"],
};
