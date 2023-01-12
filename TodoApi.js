class TodoApi {
    static URL = 'https://62054479161670001741b708.mockapi.io/api/todo/';

    static getList() {
        return fetch(this.URL).then((res) => {
            if (res.ok) { // 200 ... 299
                return res.json();
            }

            throw new Error('Can not get todo from server.');
        });
    }

    static getOne(id) {
        return fetch(this.URL + id).then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(`Can not get todo with id: '${id}'.`);
        });
    }

    static create(todo) {
        return fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json',
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(`Can not create todo.`);
        });
    }

    static update(id, todo) {
        return fetch(this.URL + id, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(`Can note update todo from server.`);
        });
    }

    static delete(id) {
        return fetch(this.URL + id, {
            method: 'DELETE',
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(`Can not delete todo from server.`);
        });
    }
}

export default TodoApi;