const EventEmmiter = require('events');

class DB extends EventEmmiter{
    constructor() {
        super();
        this.data = [];
        this.nextId = 1;
        this.commitcount = 0;
    }

    select() {
        return this.data;
    }

    insert(row) {
        row.id = this.nextId++;
        this.data.push(row);
        return row;
    }

    update(row) {
        if (!row.id) {
            throw new Error('ID is required for update');
        }

        const index = this.data.findIndex(item => item.id === row.id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...row };
            return this.data[index];
        } else {
            throw new Error('Row not found');
        }
    }

    delete(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            const deletedRow = this.data.splice(index, 1);
            return deletedRow[0];
        } else {
            throw new Error('Row not found');
        }
    }

    commit(){
        this.commitcount++;
        this.emit("commit");
        console.log("commit generated");
    }
}

module.exports = DB;
