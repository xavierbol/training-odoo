odoo.define('awesome_tshirt.MyCounterTests', function (require) {
"use strict";

    const MyCounter = require('awesome_tshirt.MyCounter');

    QUnit.module('awesome_tshirt', {}, function () {
        QUnit.module('MyCounter');

        QUnit.test('basic test', async function (assert) {
            assert.expect(3);

            const myCounter = new MyCounter();
            await myCounter.appendTo($('#qunit-fixture'));

            assert.strictEqual(myCounter.count, 0);

            myCounter.$('.o_increment').click();
            myCounter.$('.o_increment').click();

            assert.strictEqual(myCounter.count, 2);

            myCounter.$('.o_decrement').click();

            assert.strictEqual(myCounter.count, 1);

            myCounter.destroy()
        });      
    });

});

