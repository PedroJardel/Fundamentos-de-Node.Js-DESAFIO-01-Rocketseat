import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    getTasks(table) {
        let data = this.#database[table] ?? []
        return data
    }

    createTask(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist();

        return data
    }

    deleteTask(table, id) {
        const rowIndex = this.#database[table]
            .findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    updateTask(table, id, data) {
        const rowIndex = this.#database[table]
            .findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = {
                id,
                ...data
            }
            this.#persist()
        }
    }

    setCompletedTask(table, id) {
        const rowIndex = this.#database[table]
            .findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = {
                id,
                completed: true,
                ...data
            }
        }
    }
}