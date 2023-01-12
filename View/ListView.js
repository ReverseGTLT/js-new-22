import FormView from "./FormView.js";

class ListView {
    static DONE_CLASS = 'done';
    static TODO_ITEM_SELECTOR = '.todoItem';
    static TODO_ITEM_CHECKBOX = '.check';

    constructor(options) {
        this.options = options;
        this.$rootEl = this.initView();
        this.formView = new FormView();
    }

    initView() {
        return $(`<ul></ul>`)
            .on('click', '.editBtn', this.onEditBtnClick.bind(this))
            .on('click', '.removeBtn', this.onRemoveBtnClick.bind(this))
            .on('click', ListView.TODO_ITEM_CHECKBOX, this.onTodoItemClick.bind(this));
    }

    onTodoItemClick(e) {
        const id = this.getTodoElId(e.target);
        this.options.onStatusToggle(id);
    }

    onEditBtnClick(e) {
        const id = this.getTodoElId(e.target);
        this.options.onEdit(id);
    }

    onRemoveBtnClick(e) {
        this.formView.clearForm();
        const id = this.getTodoElId(e.target);
        this.options.onDelete(id);
        const newForm = e.target.parentElement.parentElement.nextElementSibling; //Какую альтернативу можно применить?
        newForm.reset();
    }

    appendTo($container) {
        $container.append( this.$rootEl);
    }

    renderList(list) {
        const html = list.map(this.generateTodoHTML).join('');

        this.$rootEl.html(html);
    }

    generateTodoHTML(todo) {
        const done = todo.status ? ListView.DONE_CLASS : '';

        return `
      <li data-id="${todo.id}" data-status="${todo.status}" class="todoItem ${done}">
        
        <button class="editBtn">Edit</button>
        <button class="removeBtn">Delete</button>
        <input type="checkbox" class="check ${done}" name="highload1" id="highload1">
        <label for="highload1" data-onlabel="on" data-offlabel="off" class="lb1"></label>
        ${todo.title}
      </li>
    `
    }

    getTodoElId(el) {
        return el.closest(ListView.TODO_ITEM_SELECTOR).dataset.id;
    }
}

export default ListView;