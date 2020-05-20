const apiURL = 'http://localhost:5000/tasks/';
const querystring = require('querystring');

export default {
    /**
     * Updates a task
     * @param task_id string unique id of the task
     * @param newData object of new data for the task
     * @returns {Promise<any>}
     */
    async updateTask(task_id, newData) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        };
        const response = await fetch(apiURL + task_id, requestOptions);
        const data = await response.json();

        return data;
    },
    /**
     * Gets all tasks
     * @param params string or number for query
     * @returns {Promise<any>}
     */
    async getAllTasks(params) {
        let queryString = querystring.stringify(params);
        const response = await fetch(apiURL + '?' + queryString);
        const data = await response.json();

        return data;
    },

    /**
     * Deletes a task
     * @param task_id string unique id of the task
     * @returns {Promise<any>}
     */
    async deleteTask(task_id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(apiURL + task_id, requestOptions);
        const data = await response.json();
        return data;
    },
};
