function CodeGenerator() {
    let generatedCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return generatedCode;
}

export default CodeGenerator;