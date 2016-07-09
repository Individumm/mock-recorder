var objectUnderTest = {
    a: function (complicatedLib) {
        "use strict";
        return complicatedLib.a * 10;
    },
    b: function (complicatedLib) {
        "use strict";
        return complicatedLib.b(10, 10);
    }
}


describe("simple object using 'complicated' lib", function () {
    var mockRecorder = require('../index.js');
    var complicatedLib = mockRecorder.wrapper('record', 'my-complicated-lib-which-is-not-part-of-this-test', function () {
        return require('../complicatedLib.js');
    });


    it("should return 30 on a()", function () {
        expect(objectUnderTest.a(complicatedLib)).toBe(30);
    });

    it("should return 100 on b()", function () {
        expect(objectUnderTest.b(complicatedLib)).toBe(100);
    });

    afterEach(mockRecorder.saveWrapper)

});
