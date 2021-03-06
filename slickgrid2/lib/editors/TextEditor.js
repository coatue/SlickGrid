import * as tslib_1 from "tslib";
import { KEYCODES } from '../keycodes';
import { Editor } from './index';
var TextEditor = (function (_super) {
    tslib_1.__extends(TextEditor, _super);
    function TextEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextEditor.prototype.init = function () {
        this.$input = $('<input type="text" class="editor-text" />')
            .appendTo(this.args.container)
            .on('keydown', function (e) {
            if (e.keyCode === KEYCODES.LEFT || e.keyCode === KEYCODES.RIGHT) {
                e.stopImmediatePropagation();
            }
        })
            .focus()
            .select();
    };
    TextEditor.prototype.destroy = function () {
        this.$input.remove();
    };
    TextEditor.prototype.focus = function () {
        this.$input.focus();
    };
    TextEditor.prototype.getValue = function () {
        return this.$input.val();
    };
    TextEditor.prototype.setValue = function (val) {
        this.$input.val(val);
    };
    TextEditor.prototype.loadValue = function (item) {
        this.initialValue = item[this.args.column.field] || '';
        this.$input.val(this.initialValue);
        this.$input[0].defaultValue = this.initialValue;
        this.$input.select();
    };
    // TODOCK: what's the difference between serializeValue & applyValue?
    TextEditor.prototype.serializeValue = function () {
        return this.$input.val();
    };
    TextEditor.prototype.applyValue = function (item, state) {
        item[this.args.column.field] = state;
    };
    TextEditor.prototype.isValueChanged = function () {
        var value = this.$input.val();
        return (!(value === '' && this.initialValue == null)) && (value !== this.initialValue);
    };
    TextEditor.prototype.validate = function () {
        if (this.args.column.validator) {
            var validationResults = this.args.column.validator(this.$input.val());
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    };
    return TextEditor;
}(Editor));
export { TextEditor };
