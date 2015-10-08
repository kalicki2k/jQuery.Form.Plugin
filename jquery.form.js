/**
 * @author      Sebastian Kalicki <s.kalicki@bitexpert.de>
 * @description jQuery Form
 * @version     $Revision:$
 * @package     jQuery/form
 * @date        $Date:$
 */

(function (windows, $, undefined) {
    'use strict';

    $.fn.form = function () {
        var me = this,
            form = {
                clear: function () {
                    $(me).find('input, textarea')
                        .not('input:checkbox, input:radio, input:submit')
                        .each(function (index, input) {
                            $(input).val(null);
                        });

                    $(me).find('input:checkbox, input:radio')
                        .each(function (index, input) {
                            $(input).prop('checked', $(input).is('[checked]'));
                        });

                    $(me).find('select')
                        .each(function (index, select) {
                            $('option', select).each(function (index, option) {
                                $(option).prop('selected', $(option).is('[selected]'));
                            });
                        });

                    return this;
                },
                clearElement: function (selector) {
                    var element = $(selector, me);

                    switch (element[0].nodeName.toLowerCase()) {
                        case 'input':
                        case 'textarea':
                            element.val(null);
                            break;
                        case 'select':
                            $('option', element).each(function (index, option) {
                                $(option).prop('selected', $(option).is('[selected]'));
                            });
                            break;
                    }

                    return this;
                },
                fill: function (data) {
                    $.each(data, function (name, value) {
                        var element = $('[name="' + name + '"]', me);

                        switch (element[0].nodeName.toLowerCase()) {
                            case 'input':
                            case 'textarea':
                                form.fillInput(element, value);
                                break;
                            case 'select':
                                form.fillSelect(element, value);
                                break;
                        }
                    });

                    return this;
                },
                fillInput: function (selector, value) {
                    var element = $(selector, me);

                    switch (typeof (value)) {
                        case 'boolean':
                            element.prop('checked', value);
                            break;
                        default:
                            element.val(value);
                    }

                    return this;
                },
                fillSelect: function (selector, data, keys) {

                    switch (typeof (data)) {
                        case 'object':
                            _createOptions(selector, data, keys);
                            break;
                        default:
                            form.fillInput(selector, data);
                            break;
                    }


                    return this;
                },
                read: function (callback) {

                    var selectedData = {};

                    $(me).find('input, textarea')
                        .not('input:checkbox, input:radio, input:submit')
                        .each(function (index, input) {
                            if (input.value.length) {
                                selectedData[input.name] = input.value;
                            }
                        });

                    $(me).find('input:checkbox:checked, input:radio:checked')
                        .each(function (index, input) {
                            selectedData[input.name] = input.value;
                        });

                    $(me).find('select')
                        .each(function (index, select) {
                            $('option:selected', select)
                                .each(function (index, option) {
                                    if ('' !== option.value) {
                                        selectedData[select.name] = option.value;
                                    }
                                });
                        });

                    if (callback && typeof (callback) === 'function') {
                        var response = (!$.isEmptyObject(selectedData)) ? selectedData : false;
                        callback(response);
                    }

                    return this;
                }
            };

        function _createOptions(selector, data, keys) {
            var element = $(selector, me);

            if ('undefined' === typeof (keys)) {
                keys = [].concat('value', 'title');
            }

            $.each(data, function (index, value) {
                var option = $('<option>', {
                    value: value[keys[0]],
                    html: value[keys[1]]
                });
                if ('selected' === value.selected || true === value.selected) {
                    option.attr('selected', 'selected');
                }
                option.appendTo(element, me);
            });
        }

        return form;
    };

})(this, jQuery);