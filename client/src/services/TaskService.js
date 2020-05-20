const apiURL = 'http://localhost:5000/tasks/';

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

    async getTasks() {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    },
};
