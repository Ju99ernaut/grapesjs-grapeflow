export default (editor, config) => {
    const FlowStorage = {};

    const stm = editor.StorageManager;
    const rs = editor.StorageManager.get('remote');

    stm.add('flow-storage', {
        /**
         * Triggered before the request is started
         * @private
         */
        onStart() {
            const em = this.get('em');
            const before = this.get('beforeSend');
            before && before();
        },

        /**
         * Triggered on request error
         * @param  {Object} err Error
         * @param  {Function} [clbErr] Error callback
         * @private
         */
        onError(err, clbErr) {
            if (clbErr) {
                clbErr(err);
            } else {
                const em = this.get('em');
                console.error(err);
                em && em.trigger('storage:error', err);
            }
        },

        /**
         * Triggered on request response
         * @param  {string} text Response text
         * @private
         */
        onResponse(text, clb) {
            const em = this.get('em');
            const complete = this.get('onComplete');
            const typeJson = this.get('contentTypeJson');
            const parsable = text && typeof text === 'string';
            const res = typeJson && parsable ? JSON.parse(text) : text;
            complete && complete(res);
            clb && clb(res);
            em && em.trigger('storage:response', res);
        },

        //todo make store and load function for each endpoint
        /**
         * Store the data
         * @param {Object} data Data object to store
         * @param {Function} clb Callback function to call when load is ended
         * @param {Function} clbErr Callback function to call in case of errors
         */
        store(data, clb, clbErr) {
            for (let key in data) {
                FlowStorage[key] = data[key];
            }

            rs.request(config.urlStorePages, {
                body: FlowStorage
            }, clb, clbErr);
        },

        /**
         * Store page properties
         * @param {Object} data Data object to store
         * @param {Function} clb Callback function to call when load is ended
         * @param {Function} clbErr Callback function to call in case of errors
         */
        storeProperties(data, clb, clbErr) {
            rs.request(config.urlStorePages, {
                body: data
            }, clb, clbErr);
        },

        /**
         * Create the data
         * @param {Object} data Data object to store
         * @param {Function} clb Callback function to call when load is ended
         * @param {Function} clbErr Callback function to call in case of errors
         */
        create(data, clb, clbErr) {
            for (let key in data) {
                FlowStorage[key] = data[key];
            }

            rs.request(config.urlStorePages, {
                body: FlowStorage
            }, clb, clbErr);
        },

        /**
         * Delete the data
         * @param {Function} clb Callback function to call when load is ended
         * @param {Function} clbErr Callback function to call in case of errors
         */
        delete(clb, clbErr) {
            rs.request(config.urlLoadPages, {
                method: 'delete'
            }, clb, clbErr);
        },

        /**
         * Load the data
         * @param {Function} clb Callback function to call when load is ended
         * @param {Function} clbErr Callback function to call in case of errors
         */
        load(clb, clbErr) {
            rs.request(config.urlLoadPages, {
                method: 'get'
            }, clb, clbErr);
        },

        /**
         * Store the Project details
         * @param {Object} data Data object to store
         * @param {Function} clb Callback function to call when load is ended
         * @param {Function} clbErr Callback function to call in case of errors
         */
        storeProject(data, clb, clbErr) {
            rs.request(config.urlStoreProjects, {
                body: data
            }, clb, clbErr);
        },

        /**
         * Load the Project contents i.e pages inside
         * @param {Function} clb Callback function to call when load is ended
         * @param {Function} clbErr Callback function to call in case of errors
         */
        loadProject(clb, clbErr) {
            rs.request(config.urlLoadProjects, {
                method: 'get'
            }, clb, clbErr);
        },

        /**
         * Load the Project i.e list projects or detail a project
         * @param {Function} clb Callback function to call when load is ended
         * @param {Function} clbErr Callback function to call in case of errors
         */
        viewProject(clb, clbErr) {
            rs.request(config.urlStoreProjects, {
                method: 'get'
            }, clb, clbErr);
        },

        /**
         * Load the data
         * @param {Array} keys Array containing values to load, eg,['gjs-components', 'gjs-style', ...]
         * @param {Function} clb Callback function to call when load is ended
         * @param {Function} clbErr Callback function to call in case of errors
         */
        load2(keys, clb, clbErr) {
            const result = {};

            keys.forEach(key => {
                const value = FlowStorage[key];
                if (value) {
                    result[key] = value;
                }
            });

            //Might be called inside some async method
            clb(result);
        },

        /**
         * Store the data
         * @param {Object} data Data object to store
         * @param {Function} clb Callback function to call when load is ended
         * @param {Function} clbErr Callback function to call in case of errors
         */
        store2(data, clb, clbErr) {
            for (let key in data) {
                FlowStorage[key] = data[key];
            }
            //Might be called inside some async method
            clb(result);
        }
    })
}