AUI.add('aui-form-builder-base', function(A) {
var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isString = L.isString,
	isObject = L.isObject,

	AArray = A.Array,

	getAvailableFieldById = A.AvailableField.getAvailableFieldById,

	isAvailableField = function(v) {
		return (v instanceof A.AvailableField);
	},

	isFormBuilderField = function(v) {
		return (v instanceof A.FormBuilderField);
	},

	ADD = 'add',
	ALLOW_REMOVE_REQUIRED_FIELDS = 'allowRemoveRequiredFields',
	ATTRIBUTE_NAME = 'attributeName',
	AVAILABLE_FIELD = 'availableField',
	AVAILABLE_FIELDS = 'availableFields',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CLICK = 'click',
	DATA = 'data',
	DBLCLICK = 'dblclick',
	DD = 'dd',
	DIAGRAM = 'diagram',
	DRAGGABLE = 'draggable',
	DRAGGING = 'dragging',
	DROP = 'drop',
	EDITING = 'editing',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FIELDS_NESTED_LIST_CONFIG = 'fieldsNestedListConfig',
	FORM = 'form',
	FORM_BUILDER = 'formBuilder',
	HIDDEN_ATTRIBUTES = 'hiddenAttributes',
	ID = 'id',
	LABEL = 'label',
	LOCALIZATION_MAP = 'localizationMap',
	NAME = 'name',
	NODE = 'node',
	OPTIONS = 'options',
	PARENT = 'parent',
	PARENT_NODE = 'parentNode',
	PLACEHOLDER = 'placeholder',
	PREDEFINED_VALUE = 'predefinedValue',
	READ_ONLY_ATTRIBUTES = 'readOnlyAttributes',
	REMOVE = 'remove',
	RENDERED = 'rendered',
	REQUIRED = 'required',
	SELECTED = 'selected',
	SHOW_LABEL = 'showLabel',
	TIP = 'tip',
	TYPE = 'type',
	UNIQUE = 'unique',
	VALUE = 'value',
	WIDTH = 'width',
	ZONE = 'zone',

	_DOT = '.',
	_EMPTY_STR = '',
	_UNDERLINE = '_',

	getCN = A.getClassName,

	AVAILABLE_FIELDS_ID_PREFIX = AVAILABLE_FIELDS + _UNDERLINE + FIELD + _UNDERLINE,
	FIELDS_ID_PREFIX = FIELDS + _UNDERLINE + FIELD + _UNDERLINE,

	CSS_DD_DRAGGING = getCN(DD, DRAGGING),
	CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE = getCN(DIAGRAM, BUILDER, FIELD, DRAGGABLE),
	CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM, BUILDER, FIELD),
	CSS_FORM_BUILDER_FIELD_EDITING = getCN(FORM, BUILDER, FIELD, EDITING),
	CSS_FORM_BUILDER_PLACEHOLDER = getCN(FORM, BUILDER, PLACEHOLDER),

	INVALID_CLONE_ATTRS = [ID, NAME],

	TPL_PLACEHOLDER = '<div class="' + CSS_FORM_BUILDER_PLACEHOLDER + '"></div>';

var FormBuilderAvailableField = A.Component.create({
	NAME: AVAILABLE_FIELD,

	ATTRS: {
		hiddenAttributes: {
			value: [],
			validator: isArray
		},

		name: {
			value: _EMPTY_STR
		},

		options: {
			validator: isObject
		},

		predefinedValue: {
			value: _EMPTY_STR
		},

		readOnlyAttributes: {
			value: [],
			validator: isArray
		},

		required: {
			validator: isBoolean,
			value: false
		},

		showLabel: {
			validator: isBoolean,
			value: true
		},

		tip: {
			validator: isString,
			value: _EMPTY_STR
		},

		unique: {
			value: false,
			validator: isBoolean
		},

		width: {
		}
	},

	EXTENDS: A.AvailableField
});

A.FormBuilderAvailableField = FormBuilderAvailableField;

var FormBuilder = A.Component.create({

	NAME: FORM_BUILDER,

	ATTRS: {
		allowRemoveRequiredFields: {
			validator: isBoolean,
			value: false
		},

		autoSelectFields: {
			value: false
		},

		enableEditing: {
			value: true
		},

		fieldsNestedListConfig: {
			setter: '_setFieldsNestedListConfig',
			validator: isObject,
			value: null
		},

		strings: {
			value: {
				addNode: 'Add field',
				cancel: 'Cancel',
				propertyName: 'Property Name',
				save: 'Save',
				settings: 'Settings',
				value: 'Value'
			}
		}

	},

	UI_ATTRS: [ALLOW_REMOVE_REQUIRED_FIELDS],

	EXTENDS: A.DiagramBuilderBase,

	FIELDS_TAB: 0,
	SETTINGS_TAB: 1,

	prototype: {

		uniqueFields: new A.DataSet(),

		initializer: function() {
			var instance = this;

			instance.on({
				cancel: instance._onCancel,
				'drag:end': instance._onDragEnd,
				'drag:start': instance._onDragStart,
				'drag:mouseDown': instance._onDragMouseDown,
				save: instance._onSave
			});

			instance.uniqueFields.after(ADD, A.bind(instance._afterUniqueFieldsAdd, instance));
			instance.uniqueFields.after(REMOVE, A.bind(instance._afterUniqueFieldsRemove, instance));

			instance.dropContainer.delegate(CLICK, A.bind(instance._onClickField, instance), _DOT+CSS_FORM_BUILDER_FIELD);
			instance.dropContainer.delegate(DBLCLICK, A.bind(instance._onDblClickField, instance), _DOT+CSS_FORM_BUILDER_FIELD);
		},

		syncUI: function() {
			var instance = this;

			instance._setupAvailableFieldsNestedList();
			instance._setupFieldsNestedList();
		},

		closeEditProperties: function() {
			var instance = this;
			var field = instance.editingField;

			instance.tabView.selectTab(A.FormBuilder.FIELDS_TAB);

			if (field && field.get(RENDERED)) {
				field.get(BOUNDING_BOX).removeClass(CSS_FORM_BUILDER_FIELD_EDITING);
			}

			instance.editingField = null;
		},

		createField: function(val) {
			var instance = this;

			if (!isFormBuilderField(val)) {
				val = new (instance.getFieldClass(val.type || FIELD))(val);
			}

			val.set(BUILDER, instance);
			val.set(PARENT, instance);

			return val;
		},

		duplicateField: function(field) {
			var instance = this;
			var index = instance._getFieldNodeIndex(field.get(BOUNDING_BOX));
			var newField = instance._cloneField(field, true);

			instance.insertField(newField, ++index, field.get(PARENT));
		},

		editField: function(field) {
			var instance = this;

			if (isFormBuilderField(field)) {
				instance.closeEditProperties();

				instance.tabView.selectTab(A.FormBuilder.SETTINGS_TAB);

				instance.propertyList.set(DATA, instance.getFieldProperties(field));

				field.get(BOUNDING_BOX).addClass(CSS_FORM_BUILDER_FIELD_EDITING);

				instance.editingField = instance.selectedField = field;
			}
		},

		getFieldClass: function(type) {
			var instance = this;
			var clazz = A.FormBuilder.types[type];

			if (clazz) {
				return clazz;
			}
			else {
				A.log('The field type: [' + type + '] couldn\'t be found.');

				return null;
			}
		},

		getFieldProperties: function(field) {
			var instance = this;

			return field.getProperties();
		},

		insertField: function(field, index, parent) {
			var instance = this;

			parent = parent || instance;

			// remove from previous parent
			field.get(PARENT).removeField(field);

			parent.addField(field, index);
		},

		plotField: function(field, container) {
			var instance = this;
			var boundingBox = field.get(BOUNDING_BOX);

			if (!field.get(RENDERED)) {
				field.render(container);
			}
			else {
				container.append(boundingBox);
			}

			instance._syncUniqueField(field);

			instance.fieldsNestedList.add(boundingBox);
		},

		plotFields: function(fields, container) {
			var instance = this;

			container = container || instance.dropContainer;
			fields = fields || instance.get(FIELDS);

			container.setContent(EMPTY_STR);

			A.each(fields, function(field) {
				instance.plotField(field, container);
			});
		},

		select: function(field) {
			var instance = this;

			instance.unselectFields();

			instance.selectedField = field.set(SELECTED, true).focus();
		},

		unselectFields: function() {
			var instance = this;
			var selectedField = instance.selectedField;

			if (selectedField) {
				selectedField.set(SELECTED, false);
			}

			instance.selectedField = null;
		},

		_afterUniqueFieldsAdd: function(event) {
			var instance = this;
			var availableField = getAvailableFieldById(event.attrName);

			if (isAvailableField(availableField)) {
				var node = availableField.get(NODE);

				availableField.set(DRAGGABLE, false);
				node.unselectable();
			}
		},

		_afterUniqueFieldsRemove: function(event) {
			var instance = this;
			var availableField = getAvailableFieldById(event.attrName);

			if (isAvailableField(availableField)) {
				var node = availableField.get(NODE);

				availableField.set(DRAGGABLE, true);
				node.selectable();
			}
		},

		_cloneField: function(field, deep) {
			var instance = this;
			var config  = {};

			AArray.each(instance.getFieldProperties(field), function(property) {
				var name = property.attributeName;

				if (AArray.indexOf(INVALID_CLONE_ATTRS, name) === -1) {
					config[name] = property.value;
				}
			});

			if (deep) {
				config[FIELDS] = [];

				A.each(field.get(FIELDS), function(child, index) {
					if (!child.get(UNIQUE)) {
						config[FIELDS][index] = instance._cloneField(child, deep);
					}
				});
			}

			return instance.createField(config);
		},

		_dropField: function(dragNode) {
			var instance = this;
			var availableField = dragNode.getData(AVAILABLE_FIELD);
			var field = A.Widget.getByNode(dragNode);
			var parentNode = dragNode.get(PARENT_NODE);

			if (isAvailableField(availableField)) {
				var config = {
					hiddenAttributes: availableField.get(HIDDEN_ATTRIBUTES),
					label: availableField.get(LABEL),
					localizationMap: availableField.get(LOCALIZATION_MAP),
					options: availableField.get(OPTIONS),
					predefinedValue: availableField.get(PREDEFINED_VALUE),
					readOnlyAttributes: availableField.get(READ_ONLY_ATTRIBUTES),
					required: availableField.get(REQUIRED),
					showLabel: availableField.get(SHOW_LABEL),
					tip: availableField.get(TIP),
					type: availableField.get(TYPE),
					unique: availableField.get(UNIQUE),
					width: availableField.get(WIDTH)
				};

				if (config.unique) {
					config.id = instance._getFieldId(availableField);
					config.name = availableField.get(NAME);
				}

				field = instance.createField(config);
			}

			if (isFormBuilderField(field)){
				var dropField = A.Widget.getByNode(parentNode);

				if (!isFormBuilderField(dropField)) {
					dropField = instance;
				}

				var index = instance._getFieldNodeIndex(dragNode);

				instance.insertField(field, index, dropField);

				instance.select(field);
			}
		},

		_getFieldId: function(field) {
			var instance = this;
			var id = field.get(ID);

			var prefix;

			if (isAvailableField(field)) {
				prefix = AVAILABLE_FIELDS_ID_PREFIX;
			}
			else {
				prefix = FIELDS_ID_PREFIX;
			}

			return id.replace(prefix, _EMPTY_STR);
		},

		_getFieldNodeIndex: function(fieldNode) {
			var instance = this;

			return fieldNode.get(PARENT_NODE).all(
				// prevent the placeholder interference on the index
				// calculation
				'> *:not(' + _DOT+CSS_FORM_BUILDER_PLACEHOLDER + ')'
			).indexOf(fieldNode);
		},

		_onClickField: function(event) {
			var instance = this;
			var field = A.Widget.getByNode(event.currentTarget);

			instance.select(field);

			event.stopPropagation();
		},

		_onDblClickField: function(event) {
			var instance = this;

			// Only enable editing if the double clicked node is inside the node
			// contentBox.
			if (!event.target.ancestor(_DOT+CSS_FORM_BUILDER_FIELD, true)) {
				return;
			}

			var field = A.Widget.getByNode(event.currentTarget);

			if (field) {
				instance.editField(field);
			}

			event.stopPropagation();
		},

		_onDragEnd: function(event) {
			var instance = this;
			var drag = event.target;
			var dragNode = drag.get(NODE);

			instance._dropField(dragNode);

			// skip already instanciated fields
			if (!isFormBuilderField(A.Widget.getByNode(dragNode))) {
				dragNode.remove();

				drag.set(NODE, instance._originalDragNode);
			}
		},

		_onDragMouseDown: function(event) {
			var instance = this;
			var dragNode = event.target.get(NODE);
			var availableField = A.AvailableField.getAvailableFieldByNode(dragNode);

			if (isAvailableField(availableField) && !availableField.get(DRAGGABLE)) {
				event.halt();
			}
		},

		_onDragStart: function(event) {
			var instance = this;
			var drag = event.target;
			var dragNode = drag.get(NODE);

			// skip already instanciated fields
			if (isFormBuilderField(A.Widget.getByNode(dragNode))) {
				return;
			}

			// in the dragEnd we`re going to restore the drag node
			// to the original node
			instance._originalDragNode = dragNode;

			var clonedDragNode = dragNode.clone();
			dragNode.placeBefore(clonedDragNode);

			drag.set(NODE, clonedDragNode);

			var availableFieldData = dragNode.getData(AVAILABLE_FIELD);
			clonedDragNode.setData(AVAILABLE_FIELD, availableFieldData);

			clonedDragNode.attr(ID, EMPTY_STR);
			clonedDragNode.hide();

			dragNode.removeClass(CSS_DD_DRAGGING);
			dragNode.show();

			instance.fieldsNestedList.add(clonedDragNode);
		},

		_onSave: function(event) {
			var instance = this;
			var editingField = instance.editingField;

			if (editingField) {
				var modelList = instance.propertyList.get(DATA);

				modelList.each(function(model) {
					editingField.set(model.get(ATTRIBUTE_NAME), model.get(VALUE));
				});

				instance._syncUniqueField(editingField);
			}
		},

		_setAvailableFields: function(val) {
			var instance = this;
			var fields = [];

			AArray.each(val, function(field, index) {
				fields.push(
					isAvailableField(field) ? field : new A.FormBuilderAvailableField(field)
				);
			});

			return fields;
		},

		_setFieldsNestedListConfig: function(val) {
			var instance = this;
			var dropContainer = instance.dropContainer;

			return A.merge(
				{
					bubbleTargets: instance,
					dd: {
						groups: [AVAILABLE_FIELDS],
						plugins: [
							{
								cfg: {
									horizontal: false,
									scrollDelay: 150
								},
								fn: A.Plugin.DDWinScroll
							}
						]
					},
					dropCondition: function(event) {
						var dropNode = event.drop.get(NODE);
						var field = A.Widget.getByNode(dropNode);

						if (isFormBuilderField(field)) {
							return true;
						}

						return false;
					},
					placeholder: A.Node.create(TPL_PLACEHOLDER),
					dropOn: _DOT + CSS_FORM_BUILDER_DROP_ZONE,
					sortCondition: function(event) {
						var dropNode = event.drop.get(NODE);

						return (dropNode !== instance.dropContainer &&
								dropContainer.contains(dropNode));
					}
				},
				val || {}
			);
		},

		_setupAvailableFieldsNestedList: function() {
			var instance = this;

			if (!instance.availableFieldsNestedList) {
				var availableFieldsNodes = instance.fieldsContainer.all(
					_DOT+CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE
				);

				instance.availableFieldsNestedList = new A.NestedList(
					A.merge(
						instance.get(FIELDS_NESTED_LIST_CONFIG),
						{
							nodes: availableFieldsNodes
						}
					)
				);
			}
		},

		_setupFieldsNestedList: function() {
			var instance = this;

			if (!instance.fieldsNestedList) {
				instance.fieldsNestedList = new A.NestedList(
					instance.get(FIELDS_NESTED_LIST_CONFIG)
				);
			}
		},

		_syncUniqueField: function(field) {
			var instance = this;
			var uniqueFields = instance.uniqueFields;

			// Get the corresponding availableField to the given field
			var fieldId = instance._getFieldId(field);
			var availableField = getAvailableFieldById(fieldId);

			if (isAvailableField(availableField)) {
				if (availableField.get(UNIQUE) || field.get(UNIQUE)) {
					uniqueFields.add(fieldId, field);
				}
			}
		},

		_uiSetAllowRemoveRequiredFields: function(val) {
			var instance = this;

			instance.get(FIELDS).each(function(field) {
				field._uiSetRequired(field.get(REQUIRED));
			});
		}
	}

});

A.FormBuilder = FormBuilder;

A.FormBuilder.types = {};

}, '1.7.0pr2' ,{skinnable:true, requires:['aui-base','aui-button-item','aui-data-set','aui-diagram-builder-base','aui-nested-list','aui-tabs']});
