import * as assert from 'assert';

import { PathGenerator } from '../path_generator';

suite("PathGenerator generate Test Suite", () => {
    const workspacePath = '/workspace';
    const includePath = 'include';
    const srcPath = 'src';
    const testPath = 'test';
    const includeInSrc = 'src/include';

    test("destination is src dir", () => {
        const dstPath = '/workspace/src';

        const generator = new PathGenerator(workspacePath, includePath, srcPath, testPath);
        const paths = generator.generate(dstPath);
        
        assert.equal(paths.headerPath, '/workspace/include');
        assert.equal(paths.srcPath, '/workspace/src');
        assert.equal(paths.testPath, '/workspace/test');
    });

    test("destination is src dir with tail", () => {
        const dstPath = '/workspace/src/base';

        const generator = new PathGenerator(workspacePath, includePath, srcPath, testPath);
        const paths = generator.generate(dstPath);
        
        assert.equal(paths.headerPath, '/workspace/include/base');
        assert.equal(paths.srcPath, '/workspace/src/base');
        assert.equal(paths.testPath, '/workspace/test/base');
    });

    test("destination is src dir when include dir is equal to src dir", () => {
        const dstPath = '/workspace/src/base';

        const generator = new PathGenerator(workspacePath, srcPath, srcPath, testPath);
        const paths = generator.generate(dstPath);
        
        assert.equal(paths.headerPath, '/workspace/src/base');
        assert.equal(paths.srcPath, '/workspace/src/base');
        assert.equal(paths.testPath, '/workspace/test/base');
    });

    test("destination is include dir", () => {
        const dstPath = '/workspace/include';

        const generator = new PathGenerator(workspacePath, includePath, srcPath, testPath);
        const paths = generator.generate(dstPath);
        
        assert.equal(paths.headerPath, '/workspace/include');
        assert.equal(paths.srcPath, '/workspace/src');
        assert.equal(paths.testPath, '/workspace/test');
    });

    test("destination is include dir with tail", () => {
        const dstPath = '/workspace/include/base';

        const generator = new PathGenerator(workspacePath, includePath, srcPath, testPath);
        const paths = generator.generate(dstPath);
        
        assert.equal(paths.headerPath, '/workspace/include/base');
        assert.equal(paths.srcPath, '/workspace/src/base');
        assert.equal(paths.testPath, '/workspace/test/base');
    });

    test("destination is test dir", () => {
        const dstPath = '/workspace/test';

        const generator = new PathGenerator(workspacePath, includePath, srcPath, testPath);
        const paths = generator.generate(dstPath);
        
        assert.equal(paths.headerPath, dstPath);
        assert.equal(paths.srcPath, dstPath);
        assert.equal(paths.testPath, dstPath);
    });

    test("destination is workspace dir", () => {
        const dstPath = '/workspace';

        const generator = new PathGenerator(workspacePath, includePath, srcPath, testPath);
        const paths = generator.generate(dstPath);
        
        assert.equal(paths.headerPath, dstPath);
        assert.equal(paths.srcPath, dstPath);
        assert.equal(paths.testPath, dstPath);
    });

    test("destination is include dir when include dir is inside src dir", () => {
        const dstPath = '/workspace/src/include';

        const generator = new PathGenerator(workspacePath, includeInSrc, srcPath, testPath);
        const paths = generator.generate(dstPath);
        
        assert.equal(paths.headerPath, '/workspace/src/include');
        assert.equal(paths.srcPath, '/workspace/src');
        assert.equal(paths.testPath, '/workspace/test');
    });

    test("destination is src dir when include dir is inside src dir", () => {
        const dstPath = '/workspace/src';

        const generator = new PathGenerator(workspacePath, includeInSrc, srcPath, testPath);
        const paths = generator.generate(dstPath);
        
        assert.equal(paths.headerPath, '/workspace/src/include');
        assert.equal(paths.srcPath, '/workspace/src');
        assert.equal(paths.testPath, '/workspace/test');
    });

    test("destination is absolute src dir with tail", () => {
        const absIncludePath = '/workspace/include';
        const absSrcPath = '/workspace/src';
        const absTestPath = '/workspace/test';
        const dstPath = '/workspace/src/base';

        const generator = new PathGenerator(workspacePath, absIncludePath, 
                                            absSrcPath, absTestPath);
        const paths = generator.generate(dstPath);
        
        assert.equal(paths.headerPath, '/workspace/include/base');
        assert.equal(paths.srcPath, '/workspace/src/base');
        assert.equal(paths.testPath, '/workspace/test/base');
    });
});
